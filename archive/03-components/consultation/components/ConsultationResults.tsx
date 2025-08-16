import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ShoppingCart, Sparkles } from 'lucide-react';

interface ConsultationResultsProps {
  recommendations: any;
  onViewServices: () => void;
  onStartOver: () => void;
}

/**
 * ConsultationResults component for displaying service recommendations
 */
const ConsultationResults: React.FC<ConsultationResultsProps> = ({
  recommendations,
  onViewServices,
  onStartOver
}) => {
  return (
    <motion.div
      key="results"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-grow flex"
    >
      <Card className="p-4 flex-grow">
        <div className="text-center mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
          >
            <Sparkles className="w-10 h-10 text-red-600 mx-auto mb-2" />
          </motion.div>
          <h2 className="text-xl font-light mb-2 text-gray-900">
            Perfect! We have recommendations for you.
          </h2>
          <p className="text-sm text-gray-600">
            Based on your needs, here are services that would be perfect for you.
          </p>
        </div>

        {/* Cross-Domain Recommendations - Scrollable */}
        <div className="space-y-3 mb-4 max-h-[40vh] overflow-auto">
          
          {/* Hair Salon Services */}
          {recommendations.recommendedServices['hair-salon'].length > 0 && (
            <ServiceCategory 
              title="Hair Salon Services"
              emoji="💇‍♀️"
              services={recommendations.recommendedServices['hair-salon']}
              bgClass="bg-gradient-to-r from-red-50 to-pink-50"
              delay={0.3}
            />
          )}

          {/* Makeup Studio Services */}
          {recommendations.recommendedServices['makeup-studio'].length > 0 && (
            <ServiceCategory 
              title="Makeup Studio Services"
              emoji="💄"
              services={recommendations.recommendedServices['makeup-studio']}
              bgClass="bg-gradient-to-r from-pink-50 to-purple-50"
              delay={0.4}
            />
          )}

          {/* Med Spa Services */}
          {recommendations.recommendedServices['med-spa'].length > 0 && (
            <ServiceCategory 
              title="Med Spa Services"
              emoji="✨"
              services={recommendations.recommendedServices['med-spa']}
              bgClass="bg-gradient-to-r from-green-50 to-blue-50"
              delay={0.5}
            />
          )}

          {/* Cross-Domain Packages */}
          {recommendations.crossDomainPackages && recommendations.crossDomainPackages.length > 0 && (
            <ServiceCategory 
              title="Special Package Deals"
              emoji="🎁"
              services={recommendations.crossDomainPackages}
              bgClass="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200"
              delay={0.6}
              isPackage={true}
            />
          )}
        </div>

        {/* Action Buttons - Fixed at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-2 mt-auto"
        >
          <Button
            onClick={onViewServices}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm h-9"
          >
            <ShoppingCart className="w-3 h-3 mr-1" />
            View Services & Book
          </Button>
          <Button
            onClick={onStartOver}
            variant="outline"
            className="flex-1 text-sm h-9"
          >
            Start Over
          </Button>
        </motion.div>
      </Card>
    </motion.div>
  );
};

// Service Category Component
interface ServiceCategoryProps {
  title: string;
  emoji: string;
  services: string[];
  bgClass: string;
  delay: number;
  isPackage?: boolean;
}

const ServiceCategory: React.FC<ServiceCategoryProps> = ({
  title,
  emoji,
  services,
  bgClass,
  delay,
  isPackage = false
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`rounded-lg p-3 ${bgClass}`}
    >
      <h3 className="text-base font-semibold mb-2 text-gray-900 flex items-center gap-2">
        <span className="text-lg">{emoji}</span>
        {title}
      </h3>
      <div className="space-y-1">
        {services.map((serviceId: string, index: number) => (
          <div key={serviceId} className="flex items-center gap-2">
            {isPackage ? (
              <Sparkles className="w-3 h-3 text-yellow-600 flex-shrink-0" />
            ) : (
              <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
            )}
            <span className="text-sm text-gray-700">
              {serviceId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              {isPackage && ' Package'}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ConsultationResults;

