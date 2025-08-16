
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Star, Heart, TrendingUp, Phone } from 'lucide-react';

const Careers = () => {
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
              <div className="text-2xl font-light text-stone-800" style={{ fontFamily: 'Fleur De Leah, cursive' }}>
                Join Our Team
              </div>
              <div className="text-xs text-stone-500 tracking-wide">Career Opportunities</div>
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
      <section className="py-20 bg-gradient-to-br from-white via-green-50 to-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-6xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Fleur De Leah, cursive' }}>
              We're Hiring!
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto mb-8">
              Join our growing team of talented beauty professionals and be part of a salon that values creativity, excellence, and personal growth.
            </p>
          </div>

          {/* Current Opening */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-600 font-medium">Currently Hiring</span>
              </div>
              
              <h2 className="text-3xl font-light mb-4 text-stone-800" style={{ fontFamily: 'Fleur De Leah, cursive' }}>
                Junior Hair Stylist Position
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-stone-800 mb-3">What We're Looking For:</h3>
                  <ul className="space-y-2 text-stone-600">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>Cosmetology license required</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>1-2 years experience preferred</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>Passion for hair and beauty</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>Excellent customer service skills</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>Team player attitude</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-stone-800 mb-3">What We Offer:</h3>
                  <ul className="space-y-2 text-stone-600">
                    <li className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-500" />
                      <span>Competitive compensation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-rose-500" />
                      <span>Supportive work environment</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span>Professional development opportunities</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span>Diverse, multicultural clientele</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-500" />
                      <span>Flexible scheduling</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Why Work With Us */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl font-light text-center mb-12 text-stone-800" style={{ fontFamily: 'Fleur De Leah, cursive' }}>
              Why Choose Impressions?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-medium text-stone-800 mb-3">Growing Business</h3>
                <p className="text-stone-600">Join a thriving salon with a strong reputation and growing client base in East Brunswick.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-medium text-stone-800 mb-3">Inclusive Culture</h3>
                <p className="text-stone-600">Work in a welcoming environment that celebrates diversity and serves clients from all backgrounds.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-rose-600" />
                </div>
                <h3 className="text-xl font-medium text-stone-800 mb-3">Professional Excellence</h3>
                <p className="text-stone-600">Be part of a team committed to delivering exceptional service and staying current with trends.</p>
              </div>
            </div>
          </div>

          {/* Application CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Fleur De Leah, cursive' }}>
              Ready to Join Our Team?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-800 hover:bg-green-900 text-white px-8">
                Apply Now - Call (732) 613-1942
              </Button>
              <Button size="lg" variant="outline" className="border-stone-300 text-stone-700 hover:bg-stone-50 px-8">
                Visit Us in Person
              </Button>
            </div>
            <p className="text-stone-500 mt-4">
              Walk-ins welcome for applications • Bring your portfolio and resume
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
