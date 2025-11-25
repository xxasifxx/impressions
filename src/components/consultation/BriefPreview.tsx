// CONSULTATION BRIEF PREVIEW COMPONENT
// Beautiful preview of consultation brief with export options

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  CheckCircle2, 
  MessageCircle, 
  Copy, 
  Download, 
  Mail,
  Share2,
  Sparkles,
  Clock,
  Target
} from 'lucide-react';
import { FormattedBrief, ExportFormat, ExportOptions } from '@/types/BriefTypes';
import { BriefGenerator } from '@/engine/BriefGenerator';

interface BriefPreviewProps {
  brief: FormattedBrief;
  onExport?: (format: ExportFormat, success: boolean) => void;
  onClose?: () => void;
  whatsappNumber?: string;
}

const BriefPreview: React.FC<BriefPreviewProps> = ({
  brief,
  onExport,
  onClose,
  whatsappNumber = '+1234567890'
}) => {
  const [isExporting, setIsExporting] = useState<ExportFormat | null>(null);
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);
  const briefGenerator = BriefGenerator.getInstance();

  const handleExport = async (format: ExportFormat, customOptions?: Partial<ExportOptions>) => {
    setIsExporting(format);
    setExportSuccess(null);

    try {
      const options: ExportOptions = {
        format,
        includeMetadata: true,
        includeRecommendations: true,
        recipientInfo: {
          phone: whatsappNumber
        },
        ...customOptions
      };

      const result = await briefGenerator.exportBrief(brief, options);
      
      if (result.success) {
        setExportSuccess(`Successfully exported to ${format}!`);
        
        // Handle specific export actions
        if (format === 'copy' && result.content) {
          await navigator.clipboard.writeText(result.content);
        } else if (format === 'download' && result.downloadUrl) {
          const link = document.createElement('a');
          link.href = result.downloadUrl;
          link.download = `consultation-brief-${new Date().toISOString().split('T')[0]}.txt`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
        
        onExport?.(format, true);
      } else {
        throw new Error(result.error || 'Export failed');
      }
    } catch (error) {
      console.error('Export failed:', error);
      setExportSuccess(`Failed to export to ${format}. Please try again.`);
      onExport?.(format, false);
    } finally {
      setIsExporting(null);
      
      // Clear success message after 3 seconds
      setTimeout(() => setExportSuccess(null), 3000);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <CheckCircle2 className="h-16 w-16 text-green-500 mr-4" />
          <Sparkles className="h-12 w-12 text-yellow-500" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {brief.title}
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          {brief.subtitle}
        </p>
        <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>Generated {formatDate(brief.metadata.generatedAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            <span>Engagement Score: {brief.metadata.engagementScore.toFixed(1)}/10</span>
          </div>
        </div>
      </div>

      {/* Brief Content */}
      <Card className="p-8 mb-8 bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 shadow-lg">
        <div className="space-y-6">
          {brief.sections.map((section, index) => (
            <div 
              key={section.id} 
              className="flex items-start gap-4 p-4 rounded-lg bg-white/70 backdrop-blur-sm border border-gray-100"
            >
              <div className="text-3xl flex-shrink-0 mt-1">
                {section.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {section.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {section.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Summary
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            {brief.summary}
          </p>
          
          {/* Recommendations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {brief.recommendations.primary.length > 0 && (
              <div className="bg-white/80 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Primary Recommendations</h4>
                <ul className="space-y-1">
                  {brief.recommendations.primary.map((service, index) => (
                    <li key={index} className="text-gray-700 text-sm flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {brief.recommendations.packages.length > 0 && (
              <div className="bg-white/80 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Special Packages</h4>
                <ul className="space-y-1">
                  {brief.recommendations.packages.map((pkg, index) => (
                    <li key={index} className="text-gray-700 text-sm flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      {pkg}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Export Options */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Share Your Beauty Plan
        </h2>
        
        {exportSuccess && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
            <p className="text-green-800 font-medium">{exportSuccess}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* WhatsApp Export */}
          <Button
            size="lg"
            variant="default"
            onClick={() => handleExport('whatsapp')}
            disabled={isExporting === 'whatsapp'}
            className="h-20 flex flex-col items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
          >
            <MessageCircle className="h-6 w-6" />
            <span className="text-sm font-medium">
              {isExporting === 'whatsapp' ? 'Sending...' : 'Send to WhatsApp'}
            </span>
          </Button>

          {/* Copy to Clipboard */}
          <Button
            size="lg"
            variant="outline"
            onClick={() => handleExport('copy')}
            disabled={isExporting === 'copy'}
            className="h-20 flex flex-col items-center gap-2 border-2 hover:bg-gray-50"
          >
            <Copy className="h-6 w-6" />
            <span className="text-sm font-medium">
              {isExporting === 'copy' ? 'Copying...' : 'Copy to Clipboard'}
            </span>
          </Button>

          {/* Download */}
          <Button
            size="lg"
            variant="outline"
            onClick={() => handleExport('download')}
            disabled={isExporting === 'download'}
            className="h-20 flex flex-col items-center gap-2 border-2 hover:bg-gray-50"
          >
            <Download className="h-6 w-6" />
            <span className="text-sm font-medium">
              {isExporting === 'download' ? 'Preparing...' : 'Download'}
            </span>
          </Button>

          {/* Email */}
          <Button
            size="lg"
            variant="outline"
            onClick={() => handleExport('email')}
            disabled={isExporting === 'email'}
            className="h-20 flex flex-col items-center gap-2 border-2 hover:bg-gray-50"
          >
            <Mail className="h-6 w-6" />
            <span className="text-sm font-medium">
              {isExporting === 'email' ? 'Opening...' : 'Email'}
            </span>
          </Button>
        </div>

        {/* Additional Info */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">
            Your consultation brief includes personalized recommendations based on your preferences.
          </p>
          <p className="text-xs text-gray-500">
            Generated on {brief.metadata.generatedAt.toLocaleString()} • 
            {brief.metadata.totalQuestions} questions answered
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="xl"
            variant="default"
            onClick={() => handleExport('whatsapp', { 
              customMessage: 'I\'d like to book an appointment based on this consultation!' 
            })}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Book Your Appointment Now
          </Button>
          
          {onClose && (
            <Button
              size="xl"
              variant="outline"
              onClick={onClose}
              className="border-2"
            >
              Start New Consultation
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BriefPreview;
