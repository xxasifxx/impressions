import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I book a consultation?",
      answer: "You can book a consultation by filling out our form above or clicking any 'Book on WhatsApp' button. We'll respond within a few hours to schedule your appointment."
    },
    {
      question: "What should I expect during my consultation?",
      answer: "During your consultation, we'll discuss your beauty goals, assess your skin type and features, and create a personalized plan. We'll also provide product recommendations and styling tips."
    },
    {
      question: "Do you offer bridal packages?",
      answer: "Yes! We specialize in bridal beauty and offer complete packages including trial sessions, wedding day makeup and hair, and touch-up services throughout your special day."
    },
    {
      question: "What products do you use?",
      answer: "We use only high-quality, professional-grade products from trusted brands. We can accommodate sensitive skin and specific product preferences - just let us know during your consultation."
    },
    {
      question: "How far in advance should I book?",
      answer: "For regular services, we recommend booking 1-2 weeks in advance. For bridal services or special events, we suggest booking 2-3 months ahead to ensure availability."
    },
    {
      question: "Do you offer mobile services?",
      answer: "Yes, we offer mobile services for special events, bridal parties, and group bookings. Additional travel fees may apply depending on location."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about our beauty services and consultation process
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg mb-4 overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-rose-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 py-4 bg-white border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <a 
            href="https://wa.me/+1234567890?text=Hi! I have a question about your beauty services."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Ask us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
