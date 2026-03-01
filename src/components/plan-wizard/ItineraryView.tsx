import React from 'react';
import { Download, Share2, MapPin, Clock } from 'lucide-react';

interface Activity {
    time: string;
    description: string;
}

interface DayPlan {
    day: number;
    theme: string;
    activities: Activity[];
}

interface ItineraryData {
    tripTitle: string;
    summary: string;
    itinerary: DayPlan[];
}

interface ItineraryViewProps {
    plan: ItineraryData;
    onReset: () => void;
}

export function ItineraryView({ plan, onReset }: ItineraryViewProps) {
    return (
        <div className="w-full max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-12">

            {/* Header */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-500 to-amber-500" />
                <h1 className="text-2xl font-extrabold text-slate-900 mb-2">{plan.tripTitle}</h1>
                <p className="text-slate-600 leading-relaxed">{plan.summary}</p>

                <div className="mt-4 flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-50 rounded-lg hover:bg-slate-100 border border-slate-200 transition-colors">
                        <Share2 className="w-4 h-4" /> Share
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-50 rounded-lg hover:bg-slate-100 border border-slate-200 transition-colors">
                        <Download className="w-4 h-4" /> Save PDF
                    </button>
                </div>
            </div>

            {/* Timeline */}
            <div className="space-y-6">
                {plan.itinerary.map((day, index) => (
                    <div key={index} className="flex gap-4 group">
                        {/* Day Marker */}
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 shrink-0 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm shadow-md z-10">
                                D{day.day}
                            </div>
                            {index !== plan.itinerary.length - 1 && (
                                <div className="w-0.5 grow bg-gray-200 my-2 group-hover:bg-orange-200 transition-colors" />
                            )}
                        </div>

                        {/* Content */}
                        <div className="grow bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="font-bold text-lg text-slate-900 mb-3 flex items-center gap-2">
                                <span className="text-orange-600">{day.theme}</span>
                            </h3>

                            <div className="space-y-4">
                                {day.activities.map((act, i) => (
                                    <div key={i} className="flex gap-3 text-sm">
                                        <div className="min-w-[70px] font-medium text-slate-500 flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" />
                                            {act.time}
                                        </div>
                                        <div className="text-slate-700">{act.description}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center pt-8">
                <button
                    onClick={onReset}
                    className="text-slate-500 hover:text-orange-600 font-medium transition-colors"
                >
                    Craft another trip
                </button>
            </div>

        </div>
    );
}
