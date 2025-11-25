import { Button } from "@/components/ui/button";
import { MessageCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import type { ConsultationBriefData } from "@/types/SimpleConsultationTypes";

interface SimpleBriefPreviewProps {
  briefData: ConsultationBriefData;
  onSend: () => void;
  onBack: () => void;
}

const generateWhatsAppMessage = (briefData: ConsultationBriefData) => {
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

const SimpleBriefPreview = ({ briefData, onSend, onBack }: SimpleBriefPreviewProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
        <div className="space-y-6 animate-fade-in">
          <div className="text-center mb-8">
            <CheckCircle2 className="h-16 w-16 text-rose-500 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Here's your consultation request
            </h2>
            <p className="text-white/80">
              We'll send this to our beauty team on WhatsApp
            </p>
          </div>

          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-6 border border-rose-200 space-y-4">
            {briefData.purpose && (
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <div className="text-sm text-white/70">Service Needed</div>
                  <div className="text-lg text-white font-medium">
                    {briefData.purpose}
                  </div>
                </div>
              </div>
            )}

            {briefData.budget && (
              <div className="flex items-start gap-3">
                <span className="text-2xl">💰</span>
                <div>
                  <div className="text-sm text-white/70">Budget</div>
                  <div className="text-lg text-white font-medium">
                    {briefData.budget}
                  </div>
                </div>
              </div>
            )}

            {briefData.timeline && (
              <div className="flex items-start gap-3">
                <span className="text-2xl">📅</span>
                <div>
                  <div className="text-sm text-white/70">Timeline</div>
                  <div className="text-lg text-white font-medium">
                    {briefData.timeline}
                  </div>
                </div>
              </div>
            )}

            {briefData.preferences && (
              <div className="flex items-start gap-3">
                <span className="text-2xl">💅</span>
                <div>
                  <div className="text-sm text-white/70">Style Preference</div>
                  <div className="text-lg text-white font-medium">
                    {briefData.preferences}
                  </div>
                </div>
              </div>
            )}


          </div>

          {/* WhatsApp Message Preview */}
          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold text-green-800">WhatsApp Message Preview</h3>
            </div>
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                {generateWhatsAppMessage(briefData)}
              </pre>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-8">
            <Button
              size="lg"
              onClick={onSend}
              className="group shadow-lg w-full bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600"
            >
              <MessageCircle className="mr-2 group-hover:scale-110 transition-transform" />
              Send Consultation Request
            </Button>
            
            <Button
              variant="outline"
              onClick={onBack}
              className="flex items-center gap-2 border-white/30 text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Edit
            </Button>
            
            <p className="text-center text-sm text-white/70">
              Our beauty team typically responds within 30 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleBriefPreview;
