
import React from 'react';
import { Clock } from 'lucide-react';

interface ProcessStep {
  step: number;
  title: string;
  description: string;
  image: string;
  duration: string;
}

interface ProcessStepsProps {
  title: string;
  description: string;
  steps: ProcessStep[];
  accentColor: string;
}

const ProcessSteps = ({ title, description, steps, accentColor }: ProcessStepsProps) => {
  return (
    <section className="py-20 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
            {title}
          </h2>
          <p className="text-lg text-stone-600">{description}</p>
        </div>

        <div className="max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className={`flex items-center gap-8 mb-16 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 ${accentColor} text-white rounded-full flex items-center justify-center text-xl font-bold`}>
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium text-stone-800">{step.title}</h3>
                    <div className="flex items-center gap-2 text-stone-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{step.duration}</span>
                    </div>
                  </div>
                </div>
                <p className="text-stone-600 text-lg leading-relaxed">{step.description}</p>
              </div>
              <div className="flex-1">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img src={step.image} alt={step.title} className="w-full h-80 object-cover" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
