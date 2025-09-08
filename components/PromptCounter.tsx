import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePromptCounter } from '../hooks/usePromptCounter';
import { Card, CardContent } from './ui/Card';

const AnimatedCounter = ({ value }: { value: number }) => {
    const valueStr = String(value);
    const width = valueStr.length * 10; 

    return (
        <div style={{ width: `${width}px` }} className="relative h-6">
            <AnimatePresence initial={false}>
                <motion.span
                    key={value}
                    className="absolute inset-0"
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {value}
                </motion.span>
            </AnimatePresence>
        </div>
    );
};

const PromptCounter: React.FC = () => {
    const { promptsRemaining } = usePromptCounter();

    const getCounterColor = () => {
        if (promptsRemaining > 5) return 'text-green-400';
        if (promptsRemaining > 0) return 'text-yellow-400';
        return 'text-red-500';
    };

    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-zinc-300 font-medium">Prompts Remaining</span>
                    <div className={`text-xl font-bold font-mono ${getCounterColor()}`}>
                        <AnimatedCounter value={promptsRemaining} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default PromptCounter;
