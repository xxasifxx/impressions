
import React from 'react';
import { Crown, Star, Heart } from 'lucide-react';

const CompleteBeautyPackages = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-rose-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
            Complete Beauty Packages
          </h2>
          <p className="text-lg text-stone-600">Combine makeup with other services for the ultimate transformation</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-rose-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3 mb-6">
              <Crown className="w-8 h-8 text-amber-600" />
              <h3 className="text-2xl font-light text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
                Royal Treatment
              </h3>
            </div>
            <div className="text-3xl font-light text-rose-600 mb-4">$195</div>
            <div className="space-y-3 text-stone-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                <span>Hair styling & makeup</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                <span>Eyebrow threading</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                <span>Premium lashes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                <span>Touch-up kit</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-300 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="text-xs text-purple-600 bg-purple-50 px-3 py-1 rounded-full mb-4 inline-block">Most Popular</div>
            <div className="flex items-center gap-3 mb-6">
              <Star className="w-8 h-8 text-purple-600" />
              <h3 className="text-2xl font-light text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
                Glow & Go
              </h3>
            </div>
            <div className="text-3xl font-light text-purple-600 mb-4">$140</div>
            <div className="space-y-3 text-stone-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Makeup application</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Hair styling</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Basic lashes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Quick touch-ups</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-emerald-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-8 h-8 text-emerald-600" />
              <h3 className="text-2xl font-light text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
                Fresh Face
              </h3>
            </div>
            <div className="text-3xl font-light text-emerald-600 mb-4">$85</div>
            <div className="space-y-3 text-stone-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>Natural makeup</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>Eyebrow shaping</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>Skincare consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>Product samples</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompleteBeautyPackages;
