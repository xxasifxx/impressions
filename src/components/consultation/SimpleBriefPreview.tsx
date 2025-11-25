import { Button } from "@/components/ui/button";
import { MessageCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import type { ConsultationBriefData } from "@/types/SimpleConsultationTypes";

interface SimpleBriefPreviewProps {
  briefData: ConsultationBriefData;
  onSend: () => void;
  onBack: () => void;
}

const SimpleBriefPreview = ({ briefData, onSend, onBack }: SimpleBriefPreviewProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <div className="space-y-6 animate-fade-in">
          <div className="text-center mb-8">
            <CheckCircle2 className="h-16 w-16 text-rose-500 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Here's your consultation request
            </h2>
            <p className="text-gray-600">
              We'll send this to our beauty team on WhatsApp
            </p>
          </div>

          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-6 border border-rose-200 space-y-4">
            {briefData.purpose && (
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <div className="text-sm text-gray-600">Service Needed</div>
                  <div className="text-lg text-gray-800 font-medium">
                    {briefData.purpose}
                  </div>
                </div>
              </div>
            )}

            {briefData.budget && (
              <div className="flex items-start gap-3">
                <span className="text-2xl">💰</span>
                <div>
                  <div className="text-sm text-gray-600">Budget</div>
                  <div className="text-lg text-gray-800 font-medium">
                    {briefData.budget}
                  </div>
                </div>
              </div>
            )}

            {briefData.timeline && (
              <div className="flex items-start gap-3">
                <span className="text-2xl">📅</span>
                <div>
                  <div className="text-sm text-gray-600">Timeline</div>
                  <div className="text-lg text-gray-800 font-medium">
                    {briefData.timeline}
                  </div>
                </div>
              </div>
            )}

            {briefData.preferences && (
              <div className="flex items-start gap-3">
                <span className="text-2xl">💅</span>
                <div>
                  <div className="text-sm text-gray-600">Style Preference</div>
                  <div className="text-lg text-gray-800 font-medium">
                    {briefData.preferences}
                  </div>
                </div>
              </div>
            )}

            {briefData.requirements && briefData.requirements.length > 0 && (
              <div className="flex items-start gap-3">
                <span className="text-2xl">✨</span>
                <div>
                  <div className="text-sm text-gray-600">Special Requirements</div>
                  <div className="text-lg text-gray-800 font-medium">
                    {briefData.requirements.join(", ")}
                  </div>
                </div>
              </div>
            )}

            {briefData.contact && (
              <div className="flex items-start gap-3">
                <span className="text-2xl">📱</span>
                <div>
                  <div className="text-sm text-gray-600">Contact Information</div>
                  <div className="text-lg text-gray-800 font-medium">
                    {briefData.contact}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 mt-8">
            <Button
              size="lg"
              onClick={onSend}
              className="group shadow-lg w-full bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600"
            >
              <MessageCircle className="mr-2 group-hover:scale-110 transition-transform" />
              Send to WhatsApp
            </Button>
            
            <Button
              variant="outline"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Edit
            </Button>
            
            <p className="text-center text-sm text-gray-500">
              Our beauty team typically responds within 30 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleBriefPreview;

