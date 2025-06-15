
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface ServiceCategoryCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  link: string;
}

const ServiceCategoryCard: React.FC<ServiceCategoryCardProps> = ({ icon: Icon, title, description, link }) => {
  return (
    <Link to={link} className="group block">
      <Card className="h-full bg-white hover:bg-stone-50 transition-colors duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 transform">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <Icon className="w-6 h-6 text-red-700" />
            </div>
            <CardTitle className="text-xl font-semibold text-stone-800">{title}</CardTitle>
          </div>
          <p className="text-stone-600 mb-4 min-h-[40px]">{description}</p>
          <div className="flex items-center text-sm font-medium text-red-700">
            View Services
            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ServiceCategoryCard;
