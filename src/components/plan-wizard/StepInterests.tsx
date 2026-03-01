import React from 'react';

interface StepInterestsProps {
    selectedInterests: string[];
    setInterests: (val: string[]) => void;
    onGenerate: () => void;
    onBack: () => void;
}

export function StepInterests({ selectedInterests, setInterests, onGenerate, onBack }: StepInterestsProps) {
    const interestsList = [
        '🏰 Heritage', '🐯 Wildlife', '🏖️ Beaches',
        '🏔️ Mountains', '🧘 Spirituality', '🍲 Food',
        '🛍️ Shopping', '🎨 Art', '🧗 Adventure', '🚌 Local Life'
    ];

    const toggleInterest = (interest: string) => {
        if (selectedInterests.includes(interest)) {
            setInterests(selectedInterests.filter(i => i !== interest));
        } else {
            if (selectedInterests.length < 5) {
                setInterests([...selectedInterests, interest]);
            }
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold text-slate-900">What do you love?</h2>
                <p className="text-slate-500">Select up to 5 interests tailored to you.</p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
                {interestsList.map((interest) => {
                    const isSelected = selectedInterests.includes(interest);
                    return (
                        <button
                            key={interest}
                            onClick={() => toggleInterest(interest)}
                            className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${isSelected
                                    ? 'bg-orange-600 border-orange-600 text-white shadow-md transform scale-105'
                                    : 'bg-white border-gray-200 text-slate-700 hover:border-orange-300'
                                }`}
                        >
                            {interest}
                        </button>
                    );
                })}
            </div>

            <div className="flex gap-3 pt-4">
                <button
                    onClick={onBack}
                    className="flex-1 py-3.5 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                    Back
                </button>
                <button
                    onClick={onGenerate}
                    disabled={selectedInterests.length === 0}
                    className="flex-1 py-3.5 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl font-semibold shadow-lg shadow-orange-500/20 hover:scale-[1.02] disabled:opacity-50 disabled:transform-none transition-all"
                >
                    Create Plan ✨
                </button>
            </div>
        </div>
    );
}
