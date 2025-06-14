
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Leaf, Heart, Shield, Clock } from 'lucide-react';

const MedSpa = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 text-green-600 hover:text-green-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Portals</span>
            </Link>
            
            <div className="text-center">
              <div className="text-3xl font-light text-green-800" style={{ fontFamily: 'serif', letterSpacing: '0.1em' }}>
                MED SPA
              </div>
              <div className="text-xs text-emerald-600 italic">Advanced Hair Analysis • Facial Technologies • Natural Healing</div>
            </div>
            
            <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
              Coming Soon
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-light mb-6 text-green-800" style={{ fontFamily: 'serif', letterSpacing: '0.05em' }}>
              Natural Healing
            </h1>
            <p className="text-xl text-green-700 max-w-3xl mx-auto mb-8 font-light italic">
              Advanced hair analysis • Facial rejuvenation • Holistic wellness approach
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-green-600">
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-emerald-500" />
                <span>Natural Approach</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Medical Grade</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-teal-500" />
                <span>Healing Focused</span>
              </div>
            </div>
          </div>

          {/* Services Preview */}
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-16">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-10 shadow-lg border border-green-200">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-8 h-8 text-emerald-600" />
                <h3 className="text-3xl font-light text-green-800" style={{ fontFamily: 'serif' }}>
                  Advanced Hair Analysis
                </h3>
              </div>
              <p className="text-green-700 mb-6 italic">
                Cutting-edge technology to analyze hair health, scalp condition, and provide personalized treatment recommendations for optimal hair growth and vitality.
              </p>
              <div className="space-y-3 text-sm text-green-600">
                <p>• Microscopic hair and scalp analysis</p>
                <p>• Personalized treatment protocols</p>
                <p>• Natural growth enhancement</p>
                <p>• Holistic health assessment</p>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-10 shadow-lg border border-green-200">
              <div className="flex items-center gap-3 mb-6">
                <Heart className="w-8 h-8 text-teal-600" />
                <h3 className="text-3xl font-light text-green-800" style={{ fontFamily: 'serif' }}>
                  Facial Technologies
                </h3>
              </div>
              <p className="text-green-700 mb-6 italic">
                Advanced facial treatments using the latest technologies to promote natural healing, rejuvenation, and that coveted healthy glow from within.
              </p>
              <div className="space-y-3 text-sm text-green-600">
                <p>• Non-invasive rejuvenation</p>
                <p>• Natural glow enhancement</p>
                <p>• Skin health optimization</p>
                <p>• Stress relief therapies</p>
              </div>
            </div>
          </div>

          {/* Coming Soon Notice */}
          <div className="text-center bg-gradient-to-r from-green-100 to-emerald-100 rounded-3xl p-12 max-w-4xl mx-auto shadow-lg border border-green-200">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Clock className="w-8 h-8 text-green-700" />
              <h3 className="text-4xl font-light text-green-800" style={{ fontFamily: 'serif' }}>
                Opening Soon
              </h3>
            </div>
            <p className="text-green-700 mb-8 text-lg italic">
              We're transforming our space into a sanctuary of healing and wellness. 
              Be the first to experience our revolutionary approach to beauty and health.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-700 hover:bg-green-800 text-white px-12 py-4 text-lg rounded-full">
                Join Waitlist
              </Button>
              <Button size="lg" variant="outline" className="border-green-300 text-green-700 hover:bg-green-50 px-12 py-4 text-lg rounded-full">
                Learn More
              </Button>
            </div>
            <p className="text-green-600 mt-6 text-sm">
              Early access • Exclusive launch pricing • Priority booking
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MedSpa;
