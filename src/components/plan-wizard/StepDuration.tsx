import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

interface StepDurationProps {
    destination: string;
    setDestination: (val: string) => void;
    days: number;
    setDays: (val: number) => void;
    onNext: () => void;
}

export function StepDuration({ destination, setDestination, days, setDays, onNext }: StepDurationProps) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold text-slate-900">Where are you heading?</h2>
                <p className="text-slate-500">Start your journey by picking a place and time.</p>
            </div>

            <div className="space-y-4">
                <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="e.g., Jaipur, Goa, Kerala"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                    />
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                            <Calendar className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="font-semibold text-slate-900">Trip Duration</p>
                            <p className="text-sm text-slate-500">{days} Days</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setDays(Math.max(1, days - 1))}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >-</button>
                        <span className="w-4 text-center font-medium">{days}</span>
                        <button
                            onClick={() => setDays(Math.min(30, days + 1))}
                            className="w-8 h-8 rounded-full border border-black text-white bg-black flex items-center justify-center hover:opacity-80"
                        >+</button>
                    </div>
                </div>
            </div>

            <button
                onClick={onNext}
                disabled={!destination}
                className="w-full py-3.5 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl font-semibold shadow-lg shadow-orange-500/20 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 transition-all"
            >
                Continue
            </button>
        </div>
    );
}
