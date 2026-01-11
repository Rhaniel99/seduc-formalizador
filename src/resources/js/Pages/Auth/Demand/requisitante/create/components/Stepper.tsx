import React from 'react';

export function Stepper({ steps, currentStep }: any) {
    return (
        <div className="flex items-center justify-between">
            {steps.map((step: any, index: number) => (
                <React.Fragment key={step.id}>
                    <div className="flex flex-col items-center flex-1">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${step.id === currentStep
                                ? 'border-blue-600 bg-blue-600 text-white'
                                : step.id < currentStep
                                    ? 'border-green-600 bg-green-600 text-white'
                                    : 'border-gray-300 bg-white text-gray-400'
                                }`}
                        >
                            {step.id}
                        </div>
                        <div className="text-center mt-2">
                            <p className={`text-sm ${step.id === currentStep ? 'text-gray-900' : 'text-gray-500'}`}>
                                {step.title}
                            </p>
                            <p className="text-xs text-gray-400">{step.description}</p>
                        </div>
                    </div>
                    {index < steps.length - 1 && (
                        <div
                            className={`flex-1 h-0.5 mx-4 transition-colors ${step.id < currentStep ? 'bg-green-600' : 'bg-gray-300'
                                }`}
                            style={{ maxWidth: '100px' }}
                        />
                    )}
                </React.Fragment>
            ))}
        </div>
    )
}
