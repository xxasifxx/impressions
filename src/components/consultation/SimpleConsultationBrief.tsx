import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SimpleBriefPreview from "./SimpleBriefPreview";
import type { ConsultationBriefData, ConsultationStep } from "@/types/SimpleConsultationTypes";
import { getProductionConfig } from "@/config/production";

const SimpleConsultationBrief = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [briefData, setBriefData] = useState<ConsultationBriefData>({});
  
  const totalSteps = 4;
  const whatsappNumber = getProductionConfig().briefGeneration.whatsappNumber;

  const generateWhatsAppMessage = () => {
    let message = "💄 New Beauty Consultation Request from Impressions\n\n";
    
    if (briefData.purpose) {
      message += `🎯 Service Needed: ${briefData.purpose}\n`;
    }
    if (briefData.budget) {
      message += `💰 Budget: ${briefData.budget}\n`;
    }
    if (briefData.timeline) {
      message += `📅 Timeline: ${briefData.timeline}\n`;
    }
    if (briefData.preferences) {
      message += `💅 Style Preference: ${briefData.preferences}\n`;
    }
    
    message += "\n✨ Ready to book this consultation! Please contact me to schedule.";
    
    return message;
  };

  const sendToWhatsApp = () => {
    const message = generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
  };

  const consultationSteps: ConsultationStep[] = [
    {
      id: 1,
      title: "What brings you here today?",
      question: "What type of beauty service are you looking for?",
      type: "select",
      key: "purpose",
      options: [
        "Hair styling and color",
        "Makeup for special event",
        "Skincare consultation",
        "Complete makeover",
        "Bridal beauty package",
        "Regular maintenance"
      ],
      required: true
    },
    {
      id: 2,
      title: "What's your budget range?",
      question: "How much are you looking to invest in your beauty experience?",
      type: "select",
      key: "budget",
      options: [
        "$100 - $250",
        "$250 - $500",
        "$500 - $1,000",
        "$1,000 - $2,000",
        "$2,000+",
        "I'm flexible"
      ],
      required: true
    },
    {
      id: 3,
      title: "When do you need this?",
      question: "What's your timeline for this beauty service?",
      type: "select",
      key: "timeline",
      options: [
        "This week",
        "Next week",
        "Within a month",
        "In 2-3 months",
        "I'm planning ahead (3+ months)",
        "I'm flexible"
      ],
      required: true
    },
    {
      id: 4,
      title: "Tell us about your style",
      question: "How would you describe your beauty preferences?",
      type: "select",
      key: "preferences",
      options: [
        "Natural and minimal",
        "Bold and dramatic",
        "Classic and elegant",
        "Trendy and modern",
        "Bohemian and free-spirited",
        "I'm open to suggestions"
      ],
      required: false
    }
  ];

  const updateBrief = (key: keyof ConsultationBriefData, value: string | string[]) => {
    setBriefData(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const currentStepData = consultationSteps[currentStep - 1];
  const isLastStep = currentStep === totalSteps;
  const canProceed = currentStepData?.required ? briefData[currentStepData.key] : true;

  // Show brief preview on step 7 (after completing all 6 steps)
  if (currentStep > totalSteps) {
    return <SimpleBriefPreview briefData={briefData} onSend={sendToWhatsApp} onBack={() => setCurrentStep(totalSteps)} />;
  }

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-white/70">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-white/70">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-rose-400 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {currentStepData.title}
            </h2>
            <p className="text-white/80">
              {currentStepData.question}
            </p>
          </div>

          {/* Form input based on step type */}
          <div className="space-y-3">
            {currentStepData.type === 'select' && (
              <div className="grid gap-3">
                {currentStepData.options?.map((option) => (
                  <button
                    key={option}
                    onClick={() => updateBrief(currentStepData.key, option)}
                    className={`p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                      briefData[currentStepData.key] === option
                        ? 'border-rose-400 bg-rose-500 text-white'
                        : 'border-white/30 bg-white/10 text-white hover:border-rose-300 hover:bg-white/20'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {currentStepData.type === 'multiselect' && (
              <div className="grid gap-3">
                {currentStepData.options?.map((option) => {
                  const isSelected = briefData.requirements?.includes(option) || false;
                  return (
                    <button
                      key={option}
                      onClick={() => {
                        const current = briefData.requirements || [];
                        const updated = isSelected
                          ? current.filter(item => item !== option)
                          : [...current, option];
                        updateBrief('requirements', updated);
                      }}
                      className={`p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                        isSelected
                          ? 'border-rose-400 bg-rose-500 text-white'
                          : 'border-white/30 bg-white/10 text-white hover:border-rose-300 hover:bg-white/20'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded border-2 mr-3 ${
                          isSelected ? 'bg-white border-white' : 'border-white/50'
                        }`}>
                          {isSelected && (
                            <svg className="w-3 h-3 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        {option}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {currentStepData.type === 'text' && (
              <textarea
                value={briefData[currentStepData.key] as string || ''}
                onChange={(e) => updateBrief(currentStepData.key, e.target.value)}
                placeholder="Please provide your contact information (phone, email, or preferred method)"
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-rose-400 focus:outline-none resize-none"
                rows={4}
              />
            )}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 border-white/30 text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <Button
              onClick={isLastStep ? () => setCurrentStep(totalSteps + 1) : nextStep}
              disabled={!canProceed}
              className="flex items-center gap-2 bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600"
            >
              {isLastStep ? 'Review & Send' : 'Continue'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Skip option for non-required steps */}
        {!currentStepData.required && (
          <div className="text-center mt-4">
            <button
              onClick={nextStep}
              className="text-white/70 hover:text-white text-sm underline"
            >
              Skip this step
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleConsultationBrief;
