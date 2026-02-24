import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      question: 'How long does shipping from UK to Zambia take?',
      answer: 'Air freight typically takes 7-10 working days, while sea freight can take 6-8 weeks depending on the schedule and customs clearance.'
    },
    {
      question: 'What items are prohibited for shipping?',
      answer: 'Prohibited items include hazardous materials, explosives, flammable liquids, illegal drugs, and certain perishable goods. Please contact us for a full list of restricted items.'
    },
    {
      question: 'How do I track my parcel?',
      answer: 'Once your shipment is processed, you will receive a unique tracking ID (e.g., ZC-ABC12345). You can enter this ID on our "Track Parcel" page for real-time updates.'
    },
    {
      question: 'Do you offer door-to-door delivery in Zambia?',
      answer: 'Yes, we offer door-to-door delivery services across major cities in Zambia, including Lusaka, Ndola, Kitwe, and Livingstone.'
    },
    {
      question: 'Are my items insured during transit?',
      answer: 'We offer optional insurance coverage for high-value items. Standard shipments are covered under our basic liability policy. We recommend insurance for fragile or expensive goods.'
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="bg-zed-dark min-h-screen pt-32 pb-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-zed-red font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Knowledge Base</span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-8">
            Frequently Asked <span className="text-zed-red">Questions.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Everything you need to know about shipping with Zed Cart UK.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card overflow-hidden"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full p-8 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-xl font-display font-bold text-white pr-8">{faq.question}</span>
                <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${activeIndex === idx ? 'bg-zed-red text-white' : 'bg-white/5 text-slate-500'}`}>
                  {activeIndex === idx ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>
              
              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-8 pb-8 text-slate-400 leading-relaxed text-lg border-t border-white/5 pt-6">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 glass-card p-12 text-center">
          <HelpCircle className="text-zed-red mx-auto mb-6" size={48} />
          <h3 className="text-2xl font-display font-bold text-white mb-4">Still have questions?</h3>
          <p className="text-slate-400 mb-8">Our support team is available 24/7 to help you with any specific inquiries.</p>
          <a href="/contact" className="btn-primary inline-flex items-center gap-2">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
