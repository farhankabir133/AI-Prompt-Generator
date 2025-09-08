import React, { useState } from 'react';
import { Zap, Loader } from 'lucide-react';
import { PromptCategory, PromptTone, PromptLength } from '../types';
import type { GeneratorFormState } from '../types';
import { CATEGORY_OPTIONS, TONE_OPTIONS, LENGTH_OPTIONS } from '../constants';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';

interface GeneratorFormProps {
  isLoading: boolean;
  hasPrompts: boolean;
  onSubmit: (formState: GeneratorFormState) => void;
}

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

const GeneratorForm: React.FC<GeneratorFormProps> = ({ isLoading, hasPrompts, onSubmit }) => {
    const [formState, setFormState] = useState<GeneratorFormState>({
        topic: '',
        category: PromptCategory.GENERAL,
        tone: PromptTone.CREATIVE,
        length: PromptLength.MEDIUM,
        description: '',
        keywords: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleCategoryChange = (category: PromptCategory) => {
        setFormState(prevState => ({ ...prevState, category }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formState);
    };

    const labelClasses = "block mb-2 text-sm font-medium text-zinc-300";
    const inputClasses = "bg-zinc-800 border border-zinc-700 text-zinc-50 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 placeholder-zinc-500 transition duration-200";

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create Your Prompts</CardTitle>
                <CardDescription>Fill in the details below to generate prompts.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div>
                        <label htmlFor="topic" className={labelClasses}>Title / Topic*</label>
                        <input type="text" id="topic" name="topic" value={formState.topic} onChange={handleInputChange} className={inputClasses} placeholder="e.g., A futuristic city at sunset" required />
                    </div>
                    <div>
                        <label className={labelClasses}>Category</label>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                            {CATEGORY_OPTIONS.slice(0, 3).map(opt => (
                                <button type="button" key={opt} onClick={() => handleCategoryChange(opt)} className={cn('px-2 py-1.5 rounded-md transition-colors', formState.category === opt ? 'bg-indigo-600 text-white' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300')}>{opt}</button>
                            ))}
                        </div>
                         <select value={formState.category} onChange={(e) => handleCategoryChange(e.target.value as PromptCategory)} className={`${inputClasses} mt-2`}>
                            {CATEGORY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="description" className={labelClasses}>Description (Optional)</label>
                        <textarea id="description" name="description" value={formState.description} onChange={handleInputChange} className={inputClasses} rows={3} placeholder="Add more context or specific instructions..."></textarea>
                    </div>
                    <div>
                        <label htmlFor="keywords" className={labelClasses}>Keywords (Optional)</label>
                        <input type="text" id="keywords" name="keywords" value={formState.keywords} onChange={handleInputChange} className={inputClasses} placeholder="e.g., cyberpunk, neon lights, serene" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="tone" className={labelClasses}>Tone</label>
                            <select id="tone" name="tone" value={formState.tone} onChange={handleInputChange} className={inputClasses}>
                                {TONE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="length" className={labelClasses}>Length</label>
                            <select id="length" name="length" value={formState.length} onChange={handleInputChange} className={inputClasses}>
                                {LENGTH_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={isLoading || !hasPrompts} className="w-full">
                        {isLoading ? (
                            <Loader className="w-5 h-5 mr-2 animate-spin" />
                        ) : (
                            <Zap className="w-5 h-5 mr-2" />
                        )}
                        {isLoading ? 'Generating...' : 'Generate Prompts'}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default GeneratorForm;
