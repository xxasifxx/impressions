
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Eye, Lips, GalleryHorizontal, Camera } from 'lucide-react';

const journeySteps = [
  {
    icon: <Eye className="w-12 h-12 text-rose-600" />,
    title: "Eyes: The Windows to the Soul",
    description: "Mastering the art of expression with precise liners, blended shadows, and captivating lashes."
  },
  {
    icon: <Lips className="w-12 h-12 text-rose-600" />,
    title: "Lips: The Perfect Pout",
    description: "Defining and enhancing with rich colors and perfect finishes, from matte to high-gloss."
  },
  {
    icon: <GalleryHorizontal className="w-12 h-12 text-rose-600" />,
    title: "Face: The Flawless Canvas",
    description: "Creating a perfect base with seamless foundation, expert contouring, and a radiant glow."
  },
  {
    icon: <Camera className="w-12 h-12 text-rose-600" />,
    title: "The Final Look: Photoshoot Ready",
    description: "Bringing it all together for a stunning, long-lasting look that's ready for any camera."
  }
];

const MakeupVisualJourney = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
            The Art of Makeup
          </h2>
          <p className="text-lg text-stone-600">A visual journey through our makeup philosophy</p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {journeySteps.map((step, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-8 text-center border border-rose-200 h-full flex flex-col justify-center items-center hover:shadow-lg transition-shadow duration-300">
                    <div className="mb-4">{step.icon}</div>
                    <h3 className="text-xl font-medium text-stone-800 mb-2">{step.title}</h3>
                    <p className="text-sm text-stone-600">{step.description}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default MakeupVisualJourney;
