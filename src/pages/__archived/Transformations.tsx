
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star, Heart, Play, Pause, Share2, Phone } from 'lucide-react';

const Transformations = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [likedTransformations, setLikedTransformations] = useState(new Set());

  const categories = [
    { id: 'all', name: 'All Transformations' },
    { id: 'hair-color', name: 'Hair Color' },
    { id: 'hair-cuts', name: 'Hair Cuts' },
    { id: 'makeup', name: 'Makeup' },
    { id: 'full-makeover', name: 'Full Makeover' }
  ];

  const transformations = [
    {
      id: 1,
      title: 'Dramatic Color Change',
      category: 'hair-color',
      before: '/lovable-uploads/f41c2f8a-628b-41e1-b27c-4fab5011976b.png',
      after: '/lovable-uploads/5b93eca0-6808-4052-af4d-cf567c69ecdf.png',
      description: 'From brunette to platinum blonde with lowlights',
      stylist: 'Maria',
      likes: 47,
      comments: 12,
      isVideo: false
    },
    {
      id: 2,
      title: 'Bob to Pixie Transformation',
      category: 'hair-cuts',
      before: '/lovable-uploads/fbc6cbfd-042f-414f-bb0d-e91e731efe1f.png',
      after: '/lovable-uploads/f41c2f8a-628b-41e1-b27c-4fab5011976b.png',
      description: 'Bold cut for a fresh new look',
      stylist: 'Sarah',
      likes: 38,
      comments: 8,
      isVideo: true,
      videoSrc: '/assets/videos/showcase-video-01.mp4'
    },
    {
      id: 3,
      title: 'Prom Night Glam',
      category: 'makeup',
      before: '/lovable-uploads/5b93eca0-6808-4052-af4d-cf567c69ecdf.png',
      after: '/lovable-uploads/fbc6cbfd-042f-414f-bb0d-e91e731efe1f.png',
      description: 'Elegant makeup for prom night',
      stylist: 'Jessica',
      likes: 52,
      comments: 15,
      isVideo: false
    },
    {
      id: 4,
      title: 'Complete Wedding Makeover',
      category: 'full-makeover',
      before: '/lovable-uploads/f41c2f8a-628b-41e1-b27c-4fab5011976b.png',
      after: '/lovable-uploads/5b93eca0-6808-4052-af4d-cf567c69ecdf.png',
      description: 'Hair, makeup, and styling for the perfect wedding day',
      stylist: 'Maria & Jessica',
      likes: 89,
      comments: 23,
      isVideo: true,
      videoSrc: '/assets/videos/showcase-video-02.mp4'
    },
    {
      id: 5,
      title: 'Natural Highlights',
      category: 'hair-color',
      before: '/lovable-uploads/fbc6cbfd-042f-414f-bb0d-e91e731efe1f.png',
      after: '/lovable-uploads/f41c2f8a-628b-41e1-b27c-4fab5011976b.png',
      description: 'Sun-kissed highlights for a natural glow',
      stylist: 'Sarah',
      likes: 34,
      comments: 7,
      isVideo: false
    },
    {
      id: 6,
      title: 'Layered Cut & Style',
      category: 'hair-cuts',
      before: '/lovable-uploads/5b93eca0-6808-4052-af4d-cf567c69ecdf.png',
      after: '/lovable-uploads/fbc6cbfd-042f-414f-bb0d-e91e731efe1f.png',
      description: 'Modern layers with bouncy blowout',
      stylist: 'Maria',
      likes: 41,
      comments: 9,
      isVideo: false
    }
  ];

  const filteredTransformations = transformations.filter(transformation => 
    selectedCategory === 'all' || transformation.category === selectedCategory
  );

  const toggleLike = (id) => {
    const newLiked = new Set(likedTransformations);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLikedTransformations(newLiked);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-stone-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 text-stone-600 hover:text-stone-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Main</span>
            </Link>
            
            <div className="text-center">
              <div className="text-2xl font-light text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
                Transformation Gallery
              </div>
              <div className="text-xs text-stone-500 tracking-wide">Before & After Showcase</div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button size="sm" className="bg-stone-800 hover:bg-stone-900">
                <Phone className="w-4 h-4 mr-2" />
                (732) 613-1942
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-white via-stone-50 to-amber-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive', letterSpacing: '0.05em' }}>
              Amazing Transformations
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto mb-8">
              See the incredible before and after results • Real clients, real transformations
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-stone-800 text-white'
                    : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Transformations Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredTransformations.map(transformation => (
              <div key={transformation.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-stone-100 hover:shadow-xl transition-shadow">
                <div className="relative">
                  {transformation.isVideo ? (
                    <div className="relative">
                      <video 
                        src={transformation.videoSrc}
                        className="w-full h-64 object-cover"
                        poster={transformation.after}
                        controls
                      />
                      <div className="absolute top-2 left-2">
                        <span className="bg-amber-500 text-stone-900 px-2 py-1 rounded-full text-xs font-medium">
                          Video
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative h-64 overflow-hidden">
                      <div className="absolute inset-0 flex">
                        <div className="w-1/2 relative">
                          <img 
                            src={transformation.before} 
                            alt="Before"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-2 left-2">
                            <span className="bg-stone-600 text-white px-2 py-1 rounded text-xs">Before</span>
                          </div>
                        </div>
                        <div className="w-1/2 relative">
                          <img 
                            src={transformation.after} 
                            alt="After"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-2 right-2">
                            <span className="bg-amber-500 text-stone-900 px-2 py-1 rounded text-xs">After</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-medium text-stone-800 mb-1">{transformation.title}</h3>
                      <p className="text-sm text-stone-600">{transformation.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-stone-500 mb-4">
                    <span>By {transformation.stylist}</span>
                    <div className="flex items-center gap-4">
                      <span>{transformation.comments} comments</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => toggleLike(transformation.id)}
                      className={`flex items-center gap-2 transition-colors ${
                        likedTransformations.has(transformation.id)
                          ? 'text-red-500'
                          : 'text-stone-400 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${likedTransformations.has(transformation.id) ? 'fill-current' : ''}`} />
                      <span>{transformation.likes + (likedTransformations.has(transformation.id) ? 1 : 0)}</span>
                    </button>
                    
                    <button className="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-br from-stone-50 to-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
              <h3 className="text-3xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
                Ready for Your Transformation?
              </h3>
              <p className="text-stone-600 mb-8">
                Join our gallery of amazing transformations. Book your appointment today and let our expert stylists 
                help you achieve the look you've always wanted.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-stone-800 hover:bg-stone-900 text-white px-12 py-4 text-lg">
                  Book Your Transformation
                </Button>
                <Button size="lg" variant="outline" className="border-stone-300 text-stone-700 hover:bg-stone-50 px-12 py-4 text-lg">
                  Call (732) 613-1942
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Transformations;
