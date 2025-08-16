import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, Clock, DollarSign, Package, Sparkles } from 'lucide-react';
import { useConsultation } from '@/hooks/useConsultation';
import { useDomainTheme } from '@/contexts/DomainThemeContext';
import { ServiceRecommendation, BundleRecommendation, formatPrice } from '@/utils/recommendationEngine';

const ConsultationResults = () => {
  const { domain, journey } = useParams<{ domain: string; journey: string }>();
  const { consultationState } = useConsultation();
  const { theme } = useDomainTheme();

  if (!consultationState.recommendations || !consultationState.isComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating your personalized recommendations...</p>
        </div>
      </div>
    );
  }

  const { recommendations } = consultationState;
  const journeyTitle = journey?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || '';

  const RecommendationCard: React.FC<{ 
    recommendation: ServiceRecommendation; 
    isPrimary?: boolean;
    onAddToCart?: () => void;
  }> = ({ recommendation, isPrimary = false, onAddToCart }) => {
    const { service, score, reasoning, marginTier } = recommendation;
    
    return (
      <div className={`bg-white rounded-xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
        isPrimary ? `border-${theme.primary}-200 bg-gradient-to-br from-${theme.primary}-50 to-white` : 'border-gray-200 hover:border-gray-300'
      }`}>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className={`text-xl font-semibold ${isPrimary ? `text-${theme.primary}-800` : 'text-gray-800'}`}>
                  {service.name}
                </h3>
                {isPrimary && (
                  <span className={`px-2 py-1 text-xs font-medium bg-${theme.primary}-100 text-${theme.primary}-700 rounded-full`}>
                    Top Pick
                  </span>
                )}
                {marginTier === 'high' && (
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                )}
              </div>
              <p className="text-gray-600 text-sm mb-3">{service.description}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{service.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  <span className="font-medium text-gray-700">{service.price}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>Match Score: {score}/10</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Why we recommend this:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {reasoning.map((reason, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full bg-${theme.primary}-400 mt-2 flex-shrink-0`}></span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <button
            onClick={onAddToCart}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
              isPrimary 
                ? `bg-${theme.primary}-600 hover:bg-${theme.primary}-700 text-white` 
                : `border-2 border-${theme.primary}-200 text-${theme.primary}-700 hover:bg-${theme.primary}-50`
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    );
  };

  const BundleCard: React.FC<{ bundle: BundleRecommendation }> = ({ bundle }) => {
    return (
      <div className={`bg-gradient-to-br from-${theme.primary}-50 via-white to-${theme.primary}-50 rounded-xl shadow-lg border-2 border-${theme.primary}-200`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Package className={`w-5 h-5 text-${theme.primary}-600`} />
              <h3 className={`text-xl font-semibold text-${theme.primary}-800`}>{bundle.name}</h3>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 line-through">
                {formatPrice(bundle.originalPrice)}
              </div>
              <div className={`text-xl font-bold text-${theme.primary}-700`}>
                {formatPrice(bundle.bundlePrice)}
              </div>
            </div>
          </div>
          
          <div className={`bg-green-100 border border-green-200 rounded-lg p-3 mb-4`}>
            <div className="flex items-center justify-between">
              <span className="text-green-800 font-medium">
                You Save: {formatPrice(bundle.savings)}
              </span>
              <span className="text-green-700 text-sm">
                {Math.round((bundle.savings / bundle.originalPrice) * 100)}% off
              </span>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <h4 className="text-sm font-medium text-gray-700">Includes:</h4>
            {bundle.services.map((service, index) => (
              <div key={service.id} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{service.name}</span>
                <span className="text-gray-500">{service.price}</span>
              </div>
            ))}
          </div>
          
          <p className="text-sm text-gray-600 mb-4">{bundle.reasoning}</p>
          
          <button className={`w-full py-3 px-4 bg-${theme.primary}-600 hover:bg-${theme.primary}-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2`}>
            <ShoppingCart className="w-4 h-4" />
            Add Bundle to Cart
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className={`bg-gradient-to-r from-${theme.primary}-600 to-${theme.primary}-700 text-white py-12`}>
        <div className="container mx-auto px-4">
          <Link 
            to={`/${domain}`}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {domain?.replace('-', ' ')}
          </Link>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Your Personalized Recommendations</h1>
            <p className="text-xl text-white/90 mb-2">
              {recommendations.consultationSummary}
            </p>
            <p className="text-white/80">
              Based on your <span className="font-medium">{journeyTitle}</span> consultation, 
              we've found {recommendations.totalRecommendations} perfect matches for you.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Primary Recommendations */}
        {recommendations.primary.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              We recommend starting with:
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.primary.map((rec, index) => (
                <RecommendationCard 
                  key={rec.service.id} 
                  recommendation={rec} 
                  isPrimary={index === 0}
                  onAddToCart={() => console.log('Add to cart:', rec.service.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Bundle Recommendations */}
        {recommendations.bundles.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Save with these packages:
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {recommendations.bundles.slice(0, 2).map((bundle) => (
                <BundleCard key={bundle.id} bundle={bundle} />
              ))}
            </div>
          </section>
        )}

        {/* Complementary Services */}
        {recommendations.complementary.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Complete your look with:
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendations.complementary.map((rec) => (
                <RecommendationCard 
                  key={rec.service.id} 
                  recommendation={rec}
                  onAddToCart={() => console.log('Add to cart:', rec.service.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className={`bg-gradient-to-r from-${theme.primary}-50 to-${theme.primary}-100 rounded-xl p-8 text-center`}>
          <h2 className={`text-2xl font-bold text-${theme.primary}-800 mb-4`}>
            Ready to book your transformation?
          </h2>
          <p className="text-gray-600 mb-6">
            Our expert stylists are ready to bring your vision to life. 
            Book now to secure your preferred time slot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className={`px-8 py-3 bg-${theme.primary}-600 hover:bg-${theme.primary}-700 text-white rounded-lg font-medium transition-colors duration-200`}>
              Book Appointment
            </button>
            <Link 
              to={`/services?domain=${domain}`}
              className={`px-8 py-3 border-2 border-${theme.primary}-200 text-${theme.primary}-700 hover:bg-${theme.primary}-50 rounded-lg font-medium transition-colors duration-200`}
            >
              Browse All Services
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ConsultationResults;

