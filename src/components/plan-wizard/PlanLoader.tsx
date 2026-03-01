import React from 'react';
import { Loader2, Plane } from 'lucide-react';

export function PlanLoader() {
    return (
        <div className="flex flex-col items-center justify-center py-12 space-y-6 animate-in fade-in duration-700">
            <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-orange-100 flex items-center justify-center">
                    <Plane className="w-10 h-10 text-orange-500 animate-bounce" />
                </div>
                <div className="absolute inset-0 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>

            <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-slate-900">Crafting your perfect trip...</h3>
                <p className="text-slate-500 text-sm max-w-xs mx-auto">
                    Our AI is checking flights, finding hidden gems, and curating your itinerary.
                </p>
            </div>
        </div>
    );
}
