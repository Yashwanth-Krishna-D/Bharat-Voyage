import React from 'react';
import { Wallet, Users } from 'lucide-react';

interface StepBudgetProps {
    budget: 'Low' | 'Moderate' | 'Luxury';
    setBudget: (val: 'Low' | 'Moderate' | 'Luxury') => void;
    travelers: number;
    setTravelers: (val: number) => void;
    onNext: () => void;
    onBack: () => void;
}

export function StepBudget({ budget, setBudget, travelers, setTravelers, onNext, onBack }: StepBudgetProps) {
    const budgets = [
        { id: 'Low', label: 'Budget', icon: '💸' },
        { id: 'Moderate', label: 'Standard', icon: '⚖️' },
        { id: 'Luxury', label: 'Luxury', icon: '💎' },
    ] as const;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold text-slate-900">Your Style & Squad</h2>
                <p className="text-slate-500">Customize your comfort level and group size.</p>
            </div>

            {/* Budget Selection */}
            <div className="grid grid-cols-3 gap-3">
                {budgets.map((b) => (
                    <button
                        key={b.id}
                        onClick={() => setBudget(b.id)}
                        className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${budget === b.id
                                ? 'border-orange-500 bg-orange-50 text-orange-700'
                                : 'border-gray-100 bg-white hover:border-orange-200'
                            }`}
                    >
                        <span className="text-2xl">{b.icon}</span>
                        <span className="text-sm font-semibold">{b.label}</span>
                    </button>
                ))}
            </div>

            {/* Travelers Counter */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                        <Users className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="font-semibold text-slate-900">Travelers</p>
                        <p className="text-sm text-slate-500">People going</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setTravelers(Math.max(1, travelers - 1))}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >-</button>
                    <span className="w-4 text-center font-medium">{travelers}</span>
                    <button
                        onClick={() => setTravelers(Math.min(10, travelers + 1))}
                        className="w-8 h-8 rounded-full border border-black text-white bg-black flex items-center justify-center hover:opacity-80"
                    >+</button>
                </div>
            </div>

            <div className="flex gap-3 pt-2">
                <button
                    onClick={onBack}
                    className="flex-1 py-3.5 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                    Back
                </button>
                <button
                    onClick={onNext}
                    className="flex-1 py-3.5 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl font-semibold shadow-lg shadow-orange-500/20 hover:scale-[1.02] transition-all"
                >
                    Continue
                </button>
            </div>
        </div>
    );
}
