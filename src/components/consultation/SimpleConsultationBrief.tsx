import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SimpleBriefPreview from "./SimpleBriefPreview";
import type { ConsultationBriefData, ConsultationStep } from "@/types/SimpleConsultationTypes";

const SimpleConsultationBrief = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [briefData, setBriefData] = useState<ConsultationBriefData>({});
  
  const totalSteps = 6;
  const whatsappNumber = "+1234567890"; // Configure with actual business number

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
      required: true
    },
    {
      id: 5,
      title: "Any special requirements?",
      question: "Do you have any specific needs or preferences we should know about?",
      type: "multiselect",
      key: "requirements",
      options: [
        "Sensitive skin",
        "Allergies to certain products",
        "Prefer organic/natural products",
        "Need long-lasting results",
        "Mobile service (come to me)",
        "Group booking",
        "Photography included",
        "Consultation first"
      ]
    },
    {
      id: 6,
      title: "How can we reach you?",
      question: "What's the best way to contact you?",
      type: "text",
      key: "contact",
      required: true
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

  const generateWhatsAppMessage = () => {
    let message = "💄 New Beauty Consultation Request from Impressions\n\n";
    
    if (briefData.purpose) {
      message += `Service Needed: ${briefData.purpose}\n`;
    }
    if (briefData.budget) {
      message += `Budget: ${briefData.budget}\n`;
    }
    if (briefData.timeline) {
      message += `Timeline: ${briefData.timeline}\n`;
    }
    if (briefData.preferences) {
      message += `Style Preference: ${briefData.preferences}\n`;
    }
    if (briefData.requirements && briefData.requirements.length > 0) {
      message += `Special Requirements: ${briefData.requirements.join(", ")}\n`;
    }
    if (briefData.contact) {
      message += `Contact: ${briefData.contact}\n`;
    }
    
    message += "\nPlease reach out to discuss this consultation request. Thank you!";
    return message;
  };

  const sendToWhatsApp = () => {
    const message = generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
  };

  const currentStepData = consultationSteps[currentStep - 1];
  const isLastStep = currentStep === totalSteps;
  const canProceed = currentStepData?.required ? briefData[currentStepData.key] : true;

  // Show brief preview on step 7 (after completing all 6 steps)
  if (currentStep > totalSteps) {
    return <SimpleBriefPreview briefData={briefData} onSend={sendToWhatsApp} onBack={() => setCurrentStep(totalSteps)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-gray-500">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-rose-400 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {currentStepData.title}
            </h2>
            <p className="text-gray-600">
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
                        ? 'border-rose-400 bg-rose-50 text-rose-700'
                        : 'border-gray-200 hover:border-rose-200 hover:bg-rose-25'
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
                          ? 'border-rose-400 bg-rose-50 text-rose-700'
                          : 'border-gray-200 hover:border-rose-200 hover:bg-rose-25'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded border-2 mr-3 ${
                          isSelected ? 'bg-rose-400 border-rose-400' : 'border-gray-300'
                        }`}>
                          {isSelected && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
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
              className="flex items-center gap-2"
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
              className="text-gray-500 hover:text-gray-700 text-sm underline"
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

