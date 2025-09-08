import React, { useState, useCallback } from 'react';
import { SparklesIcon } from './components/Icons';
import GeneratorForm from './components/GeneratorForm';
import PromptOutput from './components/PromptOutput';
import AnimatedBackground from './components/AnimatedBackground';
import AuthCTA from './components/AuthCTA';
import PromptCounter from './components/PromptCounter';
import { UserProvider } from './hooks/useUser';
import { PromptCounterProvider } from './hooks/usePromptCounter';
import { useUser } from './hooks/useUser';
import { usePromptCounter } from './hooks/usePromptCounter';
import { generatePrompts } from './services/geminiService';
import type { GeneratorFormState, PromptSuggestion } from './types';

const AppContent: React.FC = () => {
    const [suggestions, setSuggestions] = useState<PromptSuggestion[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { user } = useUser();
    const { promptsRemaining, decrementPrompts } = usePromptCounter();

    const handleSubmit = useCallback(async (formState: GeneratorFormState) => {
        if (promptsRemaining <= 0) {
            setError("You've run out of prompts. Please upgrade or create an account for more.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setSuggestions([]);

        try {
            const newPrompts = await generatePrompts(formState);
            setSuggestions(newPrompts);
            decrementPrompts();
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [promptsRemaining, decrementPrompts]);

    return (
        <>
            <AnimatedBackground />
            <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
                <header className="text-center mb-8 md:mb-12">
                    <div className="inline-flex items-center gap-2 bg-zinc-900/50 border border-zinc-800 px-4 py-2 rounded-full mb-4">
                        <SparklesIcon className="w-5 h-5 text-indigo-400" />
                        <span className="text-sm font-medium text-zinc-300">PromptPerfect AI</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-zinc-50">
                        AI Prompt Generator
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-zinc-400">
                        Craft the perfect prompt for any task. Describe your goal, and our AI will generate creative and effective prompts for you.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <aside className="lg:col-span-1 space-y-4">
                        <GeneratorForm
                            isLoading={isLoading}
                            hasPrompts={promptsRemaining > 0}
                            onSubmit={handleSubmit}
                        />
                        <PromptCounter />
                        <AuthCTA />
                    </aside>

                    <section className="lg:col-span-2">
                        <PromptOutput
                            suggestions={suggestions}
                            isLoading={isLoading}
                            error={error}
                            isAuthenticated={user.isAuthenticated}
                        />
                    </section>
                </div>
            </main>
        </>
    );
};


const App: React.FC = () => {
    return (
        <UserProvider>
            <PromptCounterProvider>
                <AppContent />
            </PromptCounterProvider>
        </UserProvider>
    );
};

export default App;
