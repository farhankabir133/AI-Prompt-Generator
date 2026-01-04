<div align="center">
<img width="1200" height="475" alt="AI Prompt Generator Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# 🚀 AI Prompt Generator

**An intelligent tool to turn your ideas into powerful, varied, and effective AI prompts**

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-API-4285F4?style=flat&logo=google&logoColor=white)](https://ai.google.dev/)

[View Demo](https://ai.studio/apps/drive/1AMMR8z9yBJnSWxQ17SyOTjOPbokWJwd3) • [Report Bug](../../issues) • [Request Feature](../../issues)

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#-usage)
- [API Integration](#-api-integration)
- [Development](#-development)
- [Building for Production](#-building-for-production)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 About the Project

**AI Prompt Generator** is a sophisticated web application that leverages the power of Google's Gemini AI to help users create high-quality, diverse prompts for various use cases. Whether you're a marketer, developer, content creator, educator, or artist, this tool transforms your basic ideas into polished, effective AI prompts tailored to your specific needs.

The application provides an intuitive interface where users can specify their requirements including topic, category, tone, length, and additional context. The AI then generates 6 unique and creative prompt variations, each with a distinct approach and strategy.

---

## ✨ Features

- **🎨 Intelligent Prompt Generation**: Generate 6 diverse and creative prompts based on your specifications
- **📂 Multiple Categories**: Support for General, Marketing, Developer, Content Creation, Art & Imagery, and Education
- **🎭 Tone Customization**: Choose from 8 different tones (Professional, Casual, Creative, Formal, Friendly, Authoritative, Playful, Serious)
- **📏 Length Control**: Generate prompts optimized for Short, Medium, Long, or Detailed outputs
- **🔑 Keyword Integration**: Add specific keywords to guide prompt generation
- **💡 Smart Variations**: Each prompt includes a title, full prompt text, and approach explanation
- **⚡ Real-time Generation**: Fast prompt generation powered by Google Gemini 2.5 Flash
- **🎪 Beautiful UI**: Modern, responsive design with smooth animations using Framer Motion
- **📊 Usage Tracking**: Built-in prompt counter to track usage
- **🔐 Authentication Ready**: User authentication system integration
- **📱 Responsive Design**: Fully responsive layout that works on all devices
- **🌙 Dark Mode**: Beautiful dark theme optimized for reduced eye strain

---

## 🛠️ Technologies Used

### **Frontend Framework & Core**
- **[React 19.1.1](https://reactjs.org/)** - Modern UI library with latest features
- **[TypeScript 5.8.2](https://www.typescriptlang.org/)** - Type-safe JavaScript development
- **[Vite 6.2.0](https://vitejs.dev/)** - Next-generation frontend build tool

### **AI & API**
- **[@google/genai 1.17.0](https://ai.google.dev/)** - Google Gemini AI SDK for prompt generation
- **Gemini 2.5 Flash Model** - High-performance AI model for content generation

### **UI & Styling**
- **[Tailwind CSS 3.x](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion 11.3.19](https://www.framer.com/motion/)** - Animation library for smooth interactions
- **[Lucide React 0.417.0](https://lucide.dev/)** - Beautiful & consistent icon set

### **Development Tools**
- **[@types/node 22.14.0](https://www.npmjs.com/package/@types/node)** - TypeScript definitions for Node.js
- **ES Modules** - Modern JavaScript module system
- **Path Aliases** - Clean imports with @ prefix

### **Additional Features**
- Custom React Hooks for state management
- Context API for global state
- Structured JSON schema validation
- Environment variable configuration

---

## 📁 Project Structure

```
AI-Prompt-Generator/
├── components/              # React components
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.tsx      # Custom button component
│   │   └── Card.tsx        # Card wrapper component
│   ├── AnimatedBackground.tsx    # Background animation
│   ├── AuthCTA.tsx               # Authentication call-to-action
│   ├── GeneratorForm.tsx         # Main form component
│   ├── Icons.tsx                 # Custom icon components
│   ├── PromptCard.tsx            # Individual prompt display
│   ├── PromptCounter.tsx         # Usage counter display
│   └── PromptOutput.tsx          # Generated prompts display
├── hooks/                   # Custom React hooks
│   ├── usePromptCounter.tsx      # Prompt usage tracking
│   └── useUser.tsx              # User authentication state
├── services/                # External service integrations
│   └── geminiService.ts         # Google Gemini AI integration
├── App.tsx                  # Main application component
├── constants.ts             # Application constants
├── index.html               # HTML entry point
├── index.tsx                # React entry point
├── metadata.json            # Application metadata
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── types.ts                 # TypeScript type definitions
├── vite.config.ts           # Vite build configuration
└── README.md                # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js) or **yarn**
- **Google Gemini API Key** - Get yours from [Google AI Studio](https://ai.google.dev/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/farhankabir133/AI-Prompt-Generator.git
   cd AI-Prompt-Generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Configuration

1. **Create environment file**
   
   Create a `.env.local` file in the root directory:
   ```bash
   touch .env.local
   ```

2. **Add your Gemini API key**
   
   Open `.env.local` and add:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

   > ⚠️ **Important**: Never commit your `.env.local` file to version control. It's already included in `.gitignore`.

3. **Get your API key**
   
   - Visit [Google AI Studio](https://ai.google.dev/)
   - Sign in with your Google account
   - Navigate to "Get API Key"
   - Create a new API key or use an existing one
   - Copy and paste it into your `.env.local` file

---

## 💻 Usage

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   
   Navigate to `http://localhost:5173` (default Vite port)

3. **Generate prompts**
   
   - Enter your core topic/idea
   - Select a category (General, Marketing, Developer, etc.)
   - Choose the desired tone
   - Select output length
   - Optionally add a description and keywords
   - Click "Generate Prompts" button
   - View 6 unique AI-generated prompt variations

4. **Use generated prompts**
   
   Each generated prompt includes:
   - **Title**: A descriptive name for the prompt
   - **Prompt Text**: The complete, ready-to-use prompt
   - **Approach**: Explanation of the strategy behind the prompt

---

## 🔌 API Integration

### Google Gemini AI

The application uses Google's Gemini 2.5 Flash model for prompt generation:

```typescript
// Service configuration
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Generation with structured output
const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: userPrompt,
    config: {
        responseMimeType: 'application/json',
        responseSchema: generatorSchema,
    },
});
```

**Features used:**
- Structured JSON output with schema validation
- Type-safe response parsing
- Error handling and retry logic
- Optimized prompt engineering for best results

---

## 🔧 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

### Code Style

The project follows these conventions:
- **TypeScript**: Strict mode enabled
- **React**: Functional components with hooks
- **Styling**: Tailwind CSS utility classes
- **Naming**: PascalCase for components, camelCase for functions
- **Imports**: Path aliases using `@/` prefix

### Custom Hooks

**useUser**: Manages user authentication state
```typescript
const { user } = useUser();
```

**usePromptCounter**: Tracks prompt generation usage
```typescript
const { promptsRemaining, decrementPrompts } = usePromptCounter();
```

---

## 📦 Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Output location**
   
   Optimized files will be in the `dist/` directory

3. **Preview the build**
   ```bash
   npm run preview
   ```

4. **Deploy**
   
   The `dist/` folder can be deployed to:
   - Vercel
   - Netlify
   - GitHub Pages
   - Any static hosting service

   **Environment Variables**: Remember to set `GEMINI_API_KEY` in your hosting platform's environment variables.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📧 Contact

**Farhan Kabir** - [@farhankabir133](https://github.com/farhankabir133)

**Project Link**: [https://github.com/farhankabir133/AI-Prompt-Generator](https://github.com/farhankabir133/AI-Prompt-Generator)

**AI Studio Demo**: [https://ai.studio/apps/drive/1AMMR8z9yBJnSWxQ17SyOTjOPbokWJwd3](https://ai.studio/apps/drive/1AMMR8z9yBJnSWxQ17SyOTjOPbokWJwd3)

---

<div align="center">

**⭐ If you find this project helpful, please consider giving it a star!**

Made with ❤️ by [Farhan Kabir](https://github.com/farhankabir133)

</div>
