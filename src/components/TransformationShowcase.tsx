
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Play, Pause, Volume2, VolumeX, Star } from 'lucide-react';

const TransformationShowcase = () => {
  const [video1Playing, setVideo1Playing] = useState(false);
  const [video2Playing, setVideo2Playing] = useState(false);
  const [video1Muted, setVideo1Muted] = useState(true);
  const [video2Muted, setVideo2Muted] = useState(true);

  const toggleVideo1 = () => {
    const video = document.getElementById('video1') as HTMLVideoElement;
    if (video1Playing) {
      video.pause();
    } else {
      video.play();
    }
    setVideo1Playing(!video1Playing);
  };

  const toggleVideo2 = () => {
    const video = document.getElementById('video2') as HTMLVideoElement;
    if (video2Playing) {
      video.pause();
    } else {
      video.play();
    }
    setVideo2Playing(!video2Playing);
  };

  const toggleVideo1Sound = () => {
    const video = document.getElementById('video1') as HTMLVideoElement;
    video.muted = !video1Muted;
    setVideo1Muted(!video1Muted);
  };

  const toggleVideo2Sound = () => {
    const video = document.getElementById('video2') as HTMLVideoElement;
    video.muted = !video2Muted;
    setVideo2Muted(!video2Muted);
  };

  return (
    <section className="py-20 bg-stone-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-light mb-6 tracking-wider text-white" style={{ fontFamily: 'Fleur De Leah, cursive', letterSpacing: '0.1em' }}>
            Transformation Stories
          </h2>
          <p className="text-xl text-stone-300 max-w-3xl mx-auto">
            See the artistry in action • Real clients, real transformations
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Prom Transformation Story */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-stone-800 to-stone-900 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-amber-400 fill-current" />
                <span className="text-amber-400 font-medium">Featured Story</span>
              </div>
              <h3 className="text-3xl font-light mb-4 tracking-wide" style={{ fontFamily: 'Fleur De Leah, cursive' }}>
                Prom Night Magic
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <img 
                    src="/lovable-uploads/46eaf28c-0012-415c-a930-cc3832c40ac8.png" 
                    alt="Before prom transformation"
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                  <span className="text-sm text-stone-400">Before</span>
                </div>
                <div className="text-center">
                  <img 
                    src="/lovable-uploads/5b93eca0-6808-4052-af4d-cf567c69ecdf.png" 
                    alt="After prom transformation"
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                  <span className="text-sm text-amber-400">After</span>
                </div>
              </div>
              <blockquote className="text-stone-300 italic mb-6">
                "I felt like a princess! The transformation was beyond my dreams."
              </blockquote>
              <Link to="/transformations">
                <Button variant="outline" className="w-full border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-stone-900">
                  See All Transformations
                </Button>
              </Link>
            </div>
          </div>

          {/* Video Transformations */}
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
            {/* Video 1 */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <video 
                id="video1"
                src="/assets/videos/showcase-video-01.mp4"
                className="w-full h-80 object-cover"
                muted={video1Muted}
                loop
                onEnded={() => setVideo1Playing(false)}
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <button
                  onClick={toggleVideo1}
                  className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  {video1Playing ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-1" />}
                </button>
                <button
                  onClick={toggleVideo1Sound}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  {video1Muted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
                </button>
              </div>
              <div className="absolute top-4 left-4">
                <span className="bg-amber-500 text-stone-900 px-2 py-1 rounded-full text-xs font-medium">
                  Hair Transformation
                </span>
              </div>
            </div>

            {/* Video 2 */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <video 
                id="video2"
                src="/assets/videos/showcase-video-02.mp4"
                className="w-full h-80 object-cover"
                muted={video2Muted}
                loop
                onEnded={() => setVideo2Playing(false)}
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <button
                  onClick={toggleVideo2}
                  className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  {video2Playing ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-1" />}
                </button>
                <button
                  onClick={toggleVideo2Sound}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  {video2Muted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
                </button>
              </div>
              <div className="absolute top-4 left-4">
                <span className="bg-amber-500 text-stone-900 px-2 py-1 rounded-full text-xs font-medium">
                  Style Process
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformationShowcase;
