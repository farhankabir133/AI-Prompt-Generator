import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Diamond, UserIcon, RefreshCw } from 'lucide-react';
import { useUser } from '../hooks/useUser';
import { usePromptCounter } from '../hooks/usePromptCounter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';


const AuthCTA: React.FC = () => {
    const { user, login } = useUser();
    const { promptsRemaining, resetAnonPrompts } = usePromptCounter();

    const showLoginPrompt = !user.isAuthenticated && promptsRemaining <= 3;
    const showPremiumPrompt = user.isAuthenticated && promptsRemaining <= 0;

    const cardVariants = {
        hidden: { opacity: 0, height: 0, y: -10 },
        visible: { opacity: 1, height: 'auto', y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
        exit: { opacity: 0, height: 0, y: -10 },
    }

    return (
        <AnimatePresence>
            {showLoginPrompt && (
                <motion.div variants={cardVariants} initial="hidden" animate="visible" exit="exit">
                    <Card className="bg-gradient-to-br from-indigo-900/50 via-zinc-900/50 to-zinc-900/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><UserIcon className="w-5 h-5 text-indigo-400" /> Create an Account</CardTitle>
                            <CardDescription>Sign up to get more free prompts and save your favorites.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex gap-2">
                             <Button onClick={login} className="w-full">
                                Login / Sign Up
                            </Button>
                            {/* FIX: Use `variant` and `size` props to style the button and fix the type error. Redundant classes are removed from the button and its child icon. */}
                            <Button onClick={resetAnonPrompts} variant="outline" size="icon" aria-label="Reset anonymous prompts">
                                <RefreshCw className="w-4 h-4" />
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            )}

            {showPremiumPrompt && (
                 <motion.div variants={cardVariants} initial="hidden" animate="visible" exit="exit">
                    <Card className="bg-gradient-to-br from-purple-900/50 via-zinc-900/50 to-zinc-900/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Diamond className="w-5 h-5 text-purple-400" /> Go Premium</CardTitle>
                            <CardDescription>You've used all your free prompts. Upgrade for unlimited generation.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                Upgrade Now
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AuthCTA;
