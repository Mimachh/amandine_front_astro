import React, { useEffect, useState } from 'react';

interface Step {
    id: number;
    name: string;
    status: string;
}

export interface TabulationProps {
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
    currentStep: number;
    setSelectedSlotIndex: (value: number) => void;
    color: string;
}

const Tabulation: React.FC<TabulationProps> = ({ setCurrentStep, currentStep, setSelectedSlotIndex, color }) => {
    const [steps, setSteps] = useState<Step[]>([
        { id: 1, name: 'Date', status: 'upcoming' },
        { id: 2, name: 'Heure', status: 'upcoming' },
        { id: 3, name: 'Informations', status: 'upcoming' },
        { id: 4, name: 'Confirmation', status: 'upcoming' },
    ]);

    useEffect(() => {
        const updatedSteps = steps.map((step) => {
            if (step.id < currentStep) {
                return { ...step, status: 'complete' };
            } else if (step.id === currentStep) {
                return { ...step, status: 'current' };
            } else {
                return { ...step, status: 'upcoming' };
            }
        });
        setSteps([...updatedSteps]);

        if (currentStep === 1) {
            setSelectedSlotIndex(null);
        }
    }, [currentStep, setSelectedSlotIndex]);

    return (
        <nav aria-label="Progress" className="py-2">
            <ol role="list" className="space-y-4 md:flex md:space-x-3 md:space-y-0">
                {steps.map((step) => (
                    <li key={step.name} className="md:flex-1">
                        <button
                            type='button'
                            disabled={step.id >= currentStep} // Désactive le bouton si l'id est supérieur ou égal à currentStep
                            style={{
                                borderColor: (step.status === 'complete' || step.status === 'current') ? color : step.status === 'upcomming' ? "lightgrey" : "",
                                opacity: step.status !== 'complete' ? "55%" : "",
                                color: (step.status === 'complete' || step.status === 'current') ? color : step.status === 'upcomming' ? "lightgrey" : "",
                            }}
                            className={`${step.status === 'complete'
                                ? 'border-indigo-600 text-indigo-600'
                                : step.status === 'current'
                                    ? 'border-indigo-600'
                                    : 'border-gray-200 text-gray-500'
                                } group flex flex-col border-l-4 py-1 md:py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-0.5 w-full`}
                            onClick={() => setCurrentStep(step.id)}
                        >
                            <div className='flex flex-row gap-1'>
                                <span className="text-xs md:text-sm font-medium">{step.id}.{step.name}</span>
                            </div>
                        </button>
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Tabulation;
