import React from 'react';

const TrustStats = () => {
  const stats = [
    {
      number: "500+",
      label: "Happy Clients",
      icon: "😊"
    },
    {
      number: "3+",
      label: "Years Experience",
      icon: "⭐"
    },
    {
      number: "98%",
      label: "Satisfaction Rate",
      icon: "💯"
    },
    {
      number: "24/7",
      label: "WhatsApp Support",
      icon: "💬"
    }
  ];

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Beauty Enthusiasts
          </h2>
          <p className="text-lg text-gray-600">
            Join hundreds of satisfied clients who trust Impressions for their beauty needs
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="mb-4">
                <span className="text-4xl md:text-5xl block mb-2">{stat.icon}</span>
                <div className="text-3xl md:text-4xl font-bold text-rose-600 mb-1 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-rose-50 px-6 py-3 rounded-full border border-rose-200">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-700 font-medium">
              Currently accepting new clients
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustStats;
