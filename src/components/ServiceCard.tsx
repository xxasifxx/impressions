
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, Users } from 'lucide-react';
import BeforeAfterGallery from './BeforeAfterGallery';

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  price: string;
  link: string;
  transformations: Array<{
    before: string;
    after: string;
    title: string;
    timeframe?: string;
  }>;
  difficulty?: 'Easy' | 'Moderate' | 'Complex';
  duration?: string;
  clientStory?: {
    name: string;
    quote: string;
    rating: number;
  };
  specialist?: string;
}

const ServiceCard = ({
  id,
  title,
  description,
  price,
  link,
  transformations,
  difficulty,
  duration,
  clientStory,
  specialist
}: ServiceCardProps) => {
  const difficultyColors = {
    Easy: 'bg-green-100 text-green-700',
    Moderate: 'bg-yellow-100 text-yellow-700',
    Complex: 'bg-red-100 text-red-700'
  };

  return (
    <Link to={link} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
        {/* Before/After Gallery */}
        <BeforeAfterGallery transformations={transformations} />
        
        <div className="p-6">
          {/* Header with Price and Badges */}
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-medium text-stone-800 group-hover:text-red-600 transition-colors">
              {title}
            </h3>
            <div className="flex flex-col items-end gap-2">
              <span className="text-lg font-bold text-red-600">{price}</span>
              {difficulty && (
                <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[difficulty]}`}>
                  {difficulty}
                </span>
              )}
            </div>
          </div>

          {/* Service Info */}
          <div className="flex items-center gap-4 mb-3 text-sm text-stone-500">
            {duration && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{duration}</span>
              </div>
            )}
            {specialist && (
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>with {specialist}</span>
              </div>
            )}
          </div>

          <p className="text-stone-600 text-sm mb-4">{description}</p>

          {/* Client Story */}
          {clientStory && (
            <div className="bg-stone-50 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < clientStory.rating ? 'text-yellow-400 fill-current' : 'text-stone-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-stone-600 italic mb-2">"{clientStory.quote}"</p>
              <p className="text-xs text-stone-500">— {clientStory.name}</p>
            </div>
          )}

          {/* CTA */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-500">Starting at {price}</span>
            <div className="text-red-600 group-hover:text-red-700 transition-colors">
              <span className="text-sm font-medium">View Details →</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
