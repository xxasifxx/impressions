
import React from 'react';

interface Transformation {
  before: string;
  after: string;
  type: string;
  weeks: string;
}

interface BeforeAfterGalleryProps {
  title: string;
  description: string;
  transformations: Transformation[];
}

const BeforeAfterGallerySection = ({ title, description, transformations }: BeforeAfterGalleryProps) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
            {title}
          </h2>
          <p className="text-lg text-stone-600">{description}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {transformations.map((transformation, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative rounded-xl overflow-hidden shadow-lg mb-4">
                <div className="grid grid-cols-2 h-80">
                  <div className="relative">
                    <img src={transformation.before} alt="Before" className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 left-2">
                      <span className="bg-stone-800/80 text-white px-2 py-1 rounded text-xs">Before</span>
                    </div>
                  </div>
                  <div className="relative">
                    <img src={transformation.after} alt="After" className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 right-2">
                      <span className="bg-emerald-600/80 text-white px-2 py-1 rounded text-xs">After</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-medium text-stone-800 mb-1">{transformation.type}</h3>
                <p className="text-stone-600 text-sm">{transformation.weeks}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterGallerySection;
