import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Save, Sparkles } from 'lucide-react';
import type { PromptSuggestion } from '../types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';

interface PromptCardProps {
    suggestion: PromptSuggestion;
    isAuthenticated: boolean;
}

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const PromptCard: React.FC<PromptCardProps> = ({ suggestion, isAuthenticated }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(suggestion.prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [suggestion.prompt]);

    return (
        <motion.div variants={cardVariants}>
            <Card className="h-full flex flex-col">
                <CardHeader>
                    <CardTitle>{suggestion.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-zinc-400 text-sm mb-4">{suggestion.prompt}</p>
                    <div className="flex items-start gap-2 text-xs text-zinc-500 bg-zinc-800/50 p-2 rounded-md">
                        <Sparkles className="w-4 h-4 flex-shrink-0 text-indigo-400 mt-0.5" />
                        <div>
                            <span className="font-semibold text-zinc-400">Approach:</span> {suggestion.approach}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="justify-end gap-2">
                    {isAuthenticated && (
                        // FIX: Use `variant` and `size` props and remove redundant className to fix prop type error.
                        <Button variant="outline" size="sm">
                            <Save className="w-4 h-4 mr-2" />
                            Save
                        </Button>
                    )}
                    <Button onClick={handleCopy} size="sm" className="bg-zinc-700 hover:bg-zinc-600 text-zinc-50 w-28">
                        {copied ? (
                            <>
                                <Check className="w-4 h-4 mr-2" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <Copy className="w-4 h-4 mr-2" />
                                Copy
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
};

export default PromptCard;
