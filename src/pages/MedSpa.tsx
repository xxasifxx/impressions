
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Leaf, Heart, Shield, Clock, Phone, CheckCircle, Settings } from 'lucide-react';

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
              <div className="text-3xl font-light text-green-800" style={{ fontFamily: 'Imperial Script, cursive', letterSpacing: '0.1em' }}>
                Med Spa Services
              </div>
              <div className="text-xs text-emerald-600 italic">Advanced Analysis • Facial Technologies • Natural Healing</div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button size="sm" className="bg-green-800 hover:bg-green-900">
                <Phone className="w-4 h-4 mr-2" />
                (732) 613-1942
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-light mb-6 text-green-800" style={{ fontFamily: 'Imperial Script, cursive', letterSpacing: '0.05em' }}>
              Medical Aesthetics
            </h1>
            <p className="text-xl text-green-700 max-w-3xl mx-auto mb-8 font-light italic">
              Licensed aesthetician • Advanced equipment • Professional treatments available now
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-green-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Licensed Aesthetician</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Medical Grade Equipment</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-teal-500" />
                <span>Natural Approach</span>
              </div>
            </div>
          </div>

          {/* Available Services */}
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-16">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-10 shadow-lg border border-green-200">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-8 h-8 text-emerald-600" />
                <h3 className="text-3xl font-light text-green-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
                  Hair Analysis
                </h3>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-emerald-700 font-medium mb-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Available Now</span>
                </div>
              </div>
              <p className="text-green-700 mb-6 italic">
                Advanced microscopic analysis of hair and scalp health using professional-grade equipment. 
                Get personalized treatment recommendations from our licensed aesthetician.
              </p>
              <div className="space-y-3 text-sm text-green-600 mb-6">
                <p>• Microscopic hair and scalp examination</p>
                <p>• Personalized treatment protocols</p>
                <p>• Natural growth enhancement plans</p>
                <p>• Comprehensive health assessment</p>
              </div>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                Book Hair Analysis - $75
              </Button>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-10 shadow-lg border border-green-200">
              <div className="flex items-center gap-3 mb-6">
                <Heart className="w-8 h-8 text-teal-600" />
                <h3 className="text-3xl font-light text-green-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
                  Facial Treatments
                </h3>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-emerald-700 font-medium mb-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Available Now</span>
                </div>
              </div>
              <p className="text-green-700 mb-6 italic">
                Advanced facial technologies performed by our licensed aesthetician. 
                Professional treatments for natural rejuvenation and healthy skin.
              </p>
              <div className="space-y-3 text-sm text-green-600 mb-6">
                <p>• Professional facial treatments</p>
                <p>• Skin health optimization</p>
                <p>• Natural rejuvenation techniques</p>
                <p>• Customized treatment plans</p>
              </div>
              <Button className="w-full bg-teal-600 hover:bg-teal-700">
                Book Facial Treatment - $95+
              </Button>
            </div>
          </div>

          {/* Coming Soon Section */}
          <div className="text-center bg-gradient-to-r from-green-100 to-emerald-100 rounded-3xl p-12 max-w-4xl mx-auto shadow-lg border border-green-200">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Settings className="w-8 h-8 text-green-700" />
              <h3 className="text-4xl font-light text-green-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
                Expanding Services
              </h3>
            </div>
            <p className="text-green-700 mb-8 text-lg italic">
              We're updating our salon's aesthetic to showcase our full med spa capabilities. 
              Advanced body contouring equipment is being prepared for service.
            </p>
            <div className="bg-white/60 rounded-2xl p-6 mb-8">
              <h4 className="text-xl font-medium text-green-800 mb-4">Equipment Ready - Setup in Progress</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-green-600">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span>Fat Loss Technology</span>
                </div>
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span>Body Contouring Equipment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span>Advanced Aesthetic Treatments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span>Boutique Med Spa Environment</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-700 hover:bg-green-800 text-white px-12 py-4 text-lg rounded-full">
                Join Waitlist for Body Treatments
              </Button>
              <Button size="lg" variant="outline" className="border-green-300 text-green-700 hover:bg-green-50 px-12 py-4 text-lg rounded-full">
                Book Available Services
              </Button>
            </div>
            <p className="text-green-600 mt-6 text-sm">
              Hair analysis & facial treatments available now • Body treatments coming soon
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MedSpa;
