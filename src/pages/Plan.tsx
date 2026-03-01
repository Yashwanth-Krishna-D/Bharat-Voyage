import React from 'react';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import { StepDuration } from '../components/plan-wizard/StepDuration';
import { StepBudget } from '../components/plan-wizard/StepBudget';
import { StepInterests } from '../components/plan-wizard/StepInterests';
import { PlanLoader } from '../components/plan-wizard/PlanLoader';
import { ItineraryView } from '../components/plan-wizard/ItineraryView';

const Plan = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [planData, setPlanData] = useState(null);

    // Form State
    const [destination, setDestination] = useState('');
    const [days, setDays] = useState(3);
    const [budget, setBudget] = useState<'Low' | 'Moderate' | 'Luxury'>('Moderate');
    const [travelers, setTravelers] = useState(2);
    const [interests, setInterests] = useState<string[]>([]);

    const handleGenerate = async () => {
        setStep(4); // Loading state
        setLoading(true);

        try {
            const res = await fetch('http://localhost:5000/api/plan/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ destination, days, budget, travelers, interests })
            });
            const data = await res.json();

            if (res.ok) {
                setPlanData(data);
                setStep(5);
            } else {
                console.error("Failed:", data.error);
                setStep(3); // Go back on error
                alert(data.error || "Failed to generate plan");
            }
        } catch (error) {
            console.error(error);
            setStep(3);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const resetPlan = () => {
        setStep(1);
        setPlanData(null);
        setDestination('');
        setDays(3);
        setInterests([]);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-10">
            <Navbar>
                <div className="font-bold text-lg tracking-tight">TripPlanner<span className="text-orange-600">AI</span></div>
            </Navbar>

            <main className="pt-24 px-4 w-full flex flex-col items-center">

                {/* Progress Bar (Only for wizard steps) */}
                {step < 5 && (
                    <div className="w-full max-w-lg mb-8">
                        <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                            <span className={step >= 1 ? 'text-orange-600' : ''}>Location</span>
                            <span className={step >= 2 ? 'text-orange-600' : ''}>Budget</span>
                            <span className={step >= 3 ? 'text-orange-600' : ''}>Interests</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-500 ease-out"
                                style={{ width: `${(step / 3) * 100}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Wizard Container */}
                <div className={`w-full transition-all duration-500 ${step === 5 ? 'max-w-4xl' : 'max-w-lg'}`}>
                    {step < 5 && (
                        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-white p-6 sm:p-8">
                            {step === 1 && (
                                <StepDuration
                                    destination={destination} setDestination={setDestination}
                                    days={days} setDays={setDays}
                                    onNext={() => setStep(2)}
                                />
                            )}

                            {step === 2 && (
                                <StepBudget
                                    budget={budget} setBudget={setBudget}
                                    travelers={travelers} setTravelers={setTravelers}
                                    onNext={() => setStep(3)}
                                    onBack={() => setStep(1)}
                                />
                            )}

                            {step === 3 && (
                                <StepInterests
                                    selectedInterests={interests} setInterests={setInterests}
                                    onBack={() => setStep(2)}
                                    onGenerate={handleGenerate}
                                />
                            )}

                            {step === 4 && <PlanLoader />}
                        </div>
                    )}

                    {step === 5 && planData && (
                        <ItineraryView plan={planData} onReset={resetPlan} />
                    )}
                </div>

            </main>
        </div>
    );
}

export default Plan;

