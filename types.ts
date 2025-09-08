export enum PromptCategory {
  GENERAL = "General",
  MARKETING = "Marketing",
  DEVELOPER = "Developer",
  CONTENT_CREATION = "Content Creation",
  ART = "Art & Imagery",
  EDUCATION = "Education",
}

export enum PromptTone {
  PROFESSIONAL = "Professional",
  CASUAL = "Casual",
  CREATIVE = "Creative",
  FORMAL = "Formal",
  FRIENDLY = "Friendly",
  AUTHORITATIVE = "Authoritative",
  PLAYFUL = "Playful",
  SERIOUS = "Serious",
}

export enum PromptLength {
  SHORT = "Short",
  MEDIUM = "Medium",
  LONG = "Long",
  DETAILED = "Detailed",
}

export interface GeneratorFormState {
  topic: string;
  category: PromptCategory;
  tone: PromptTone;
  length: PromptLength;
  description: string;
  keywords: string;
}

export interface PromptSuggestion {
  title: string;
  prompt: string;
  approach: string;
}