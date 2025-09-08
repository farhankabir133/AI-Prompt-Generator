import { GoogleGenAI, Type } from "@google/genai";
import type { GeneratorFormState, PromptSuggestion } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const promptSchema = {
    type: Type.OBJECT,
    properties: {
        title: {
            type: Type.STRING,
            description: "A short, catchy, descriptive title for the prompt (e.g., 'E-commerce Product Launch').",
        },
        prompt: {
            type: Type.STRING,
            description: "The full, detailed, and ready-to-use prompt text.",
        },
        approach: {
            type: Type.STRING,
            description: "A brief (1-sentence) explanation of the creative or strategic approach behind this specific prompt variation.",
        }
    },
    required: ["title", "prompt", "approach"],
};

const generatorSchema = {
  type: Type.OBJECT,
  properties: {
    prompts: {
      type: Type.ARRAY,
      description: "An array of 6 diverse and high-quality prompt suggestions.",
      items: promptSchema,
    },
  },
  required: ["prompts"],
};


export const generatePrompts = async (
    formState: GeneratorFormState
): Promise<PromptSuggestion[]> => {
    const { topic, category, tone, length, description, keywords } = formState;

    const userPrompt = `
    You are an expert AI prompt engineer. Your task is to generate 6 diverse and creative prompts based on the user's specifications.

    **User Specifications:**
    - **Core Topic:** "${topic}"
    - **Category:** ${category}
    - **Tone:** ${tone}
    - **Desired Length:** ${length}
    - **Optional Description:** ${description || 'Not provided.'}
    - **Optional Keywords:** ${keywords || 'Not provided.'}

    **Instructions:**
    1.  Create 6 distinct prompts related to the core topic.
    2.  Each prompt must have a short title, the full prompt text, and a brief 'approach' explaining the angle.
    3.  Vary the angle, format, and complexity. Include requests for different formats like bullet points, tables, scripts, or code where appropriate.
    4.  Ensure the tone and category are accurately reflected.
    5.  The length of the *expected output* from the generated prompt should align with the user's 'Desired Length'.
    6.  Return the output in the specified JSON format. Do not include any other text or markdown formatting.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userPrompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: generatorSchema,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);

        if (parsedJson && Array.isArray(parsedJson.prompts)) {
            return parsedJson.prompts;
        } else {
            console.error("Unexpected JSON structure:", parsedJson);
            throw new Error("Failed to generate valid prompts. The AI returned an unexpected format.");
        }
    } catch (error) {
        console.error("Error generating prompts:", error);
        throw new Error("An error occurred while communicating with the AI. Please check your API key and try again.");
    }
};