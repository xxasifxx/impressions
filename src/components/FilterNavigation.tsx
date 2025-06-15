
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, Palette, Scissors, Sparkles, Heart } from 'lucide-react';

interface FilterCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

interface FilterNavigationProps {
  filterCategories: FilterCategory[];
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
}

const iconMap = {
  Star,
  Palette,
  Scissors,
  Sparkles,
  Heart
};

const FilterNavigation = ({ filterCategories, activeFilter, onFilterChange }: FilterNavigationProps) => {
  return (
    <div className="w-full md:w-80 md:flex-shrink-0 bg-gradient-to-br from-red-50 to-stone-50 p-6 border-b md:border-b-0 md:border-r border-stone-200">
      <div className="md:sticky md:top-8">
        <h2 className="text-3xl font-light text-stone-800 mb-6" style={{ fontFamily: 'Imperial Script, cursive', letterSpacing: '0.08em' }}>
          What Are You Looking For?
        </h2>

        <div className="space-y-2">
          {filterCategories.map((category) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap];
            return (
              <button
                key={category.id}
                onClick={() => onFilterChange(category.id)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-300 border ${
                  activeFilter === category.id
                    ? 'bg-white border-red-200 shadow-md'
                    : 'bg-white/50 border-transparent hover:bg-white hover:shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-md ${
                    activeFilter === category.id ? 'bg-red-100' : 'bg-stone-100'
                  }`}>
                    <IconComponent className={`w-4 h-4 ${
                      activeFilter === category.id ? 'text-red-600' : 'text-stone-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-stone-800 text-base" style={{ fontFamily: 'Playfair Display, serif' }}>{category.title}</h3>
                    <p className="text-sm text-stone-500">{category.subtitle}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-8 p-4 bg-gradient-to-r from-red-600 to-red-700 rounded-lg text-white">
          <h3 className="text-2xl font-light mb-1" style={{ fontFamily: 'Imperial Script, cursive', letterSpacing: '0.06em' }}>
            Still Not Sure?
          </h3>
          <p className="text-sm text-red-100 mb-3">
            Book a consultation
          </p>
          <Button size="sm" className="bg-white text-red-700 hover:bg-red-50 w-full text-sm">
            Free Consultation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterNavigation;
