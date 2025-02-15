"use client";
import AuthLayout from '@/components/AuthLayout';
import React, { useState } from 'react';

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, title: 'Step 1', content: 'Content for Step 1' },
    { id: 2, title: 'Step 2', content: 'Content for Step 2' },
    { id: 3, title: 'Step 3', content: 'Content for Step 3' },
  ];

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <AuthLayout screenType="onboarding">
      <div className="w-full max-w-md mx-auto space-y-6 px-4 sm:px-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Onboarding</h1>
          <div className="flex items-center justify-between">
            {steps.map((step) => (
              <div key={step.id} className={`flex-1 text-center ${currentStep === step.id ? 'font-bold' : ''}`}>
                {step.title}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>{steps.find((step) => step.id === currentStep)?.content}</div>
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="rounded-lg bg-gray-300 px-4 py-2 text-white transition-colors hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500/20"
            >
              Previous
            </button>
            <button
              onClick={nextStep}
              disabled={currentStep === steps.length}
              className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
