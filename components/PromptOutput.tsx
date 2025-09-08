import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Sparkles } from 'lucide-react';
import type { PromptSuggestion } from '../types';
import PromptCard from './PromptCard';
import { Card, CardContent } from './ui/Card';


interface PromptOutputProps {
    suggestions: PromptSuggestion[];
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
        },
    },
};

const SkeletonCard = () => (
    <div className="border border-zinc-800 bg-zinc-900/50 shadow-md rounded-xl p-6">
        <div className="h-4 bg-zinc-700 rounded w-1/3 mb-4 animate-pulse"></div>
        <div className="space-y-2">
            <div className="h-3 bg-zinc-700 rounded w-full animate-pulse"></div>
            <div className="h-3 bg-zinc-700 rounded w-5/6 animate-pulse"></div>
        </div>
    </div>
);

const PromptOutput: React.FC<PromptOutputProps> = ({ suggestions, isLoading, error, isAuthenticated }) => {
    return (
        <div className="space-y-4">
            {error && (
                <Card className="bg-red-900/50 border-red-500/50">
                    <CardContent className="p-4">
                        <div className="flex items-center text-red-200">
                            <AlertCircle className="w-5 h-5 mr-3" />
                            <div>
                                <p className="font-semibold">An Error Occurred</p>
                                <p className="text-sm">{error}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>
            )}

            <AnimatePresence>
                {!isLoading && suggestions.length === 0 && !error && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                       <div className="text-center py-16 px-6 border-2 border-dashed border-zinc-800 rounded-xl flex flex-col items-center">
                           <Sparkles className="w-12 h-12 text-zinc-600 mb-4" />
                           <h2 className="text-xl font-bold text-zinc-50 mb-2">Your AI-Generated Prompts Will Appear Here</h2>
                           <p className="text-zinc-400">Fill out the form and click "Generate" to begin.</p>
                       </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <AnimatePresence>
                    {suggestions.map((s, index) => (
                        <PromptCard key={index} suggestion={s} isAuthenticated={isAuthenticated} />
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default PromptOutput;
