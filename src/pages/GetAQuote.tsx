import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const GetAQuote = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pickup: '',
    delivery: '',
    weight: '',
    description: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          pickup: '',
          delivery: '',
          weight: '',
          description: '',
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-zed-dark min-h-screen pt-32 pb-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-display font-bold text-white mb-6"
          >
            Precision <span className="text-zed-red">Pricing.</span>
          </motion.h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Get an instant, transparent quote for your UK to Zambia shipment. No hidden fees, just professional logistics.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-10 md:p-16 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-zed-red to-transparent" />
          
          {status === 'success' ? (
            <div className="text-center py-20">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-24 h-24 bg-zed-green/20 rounded-3xl flex items-center justify-center mx-auto mb-10"
              >
                <CheckCircle className="text-zed-green" size={48} />
              </motion.div>
              <h2 className="text-3xl font-display font-bold text-white mb-6">Quote Request Transmitted</h2>
              <p className="text-slate-400 text-lg mb-12 max-w-md mx-auto">
                Our logistics engineers are analyzing your requirements. You will receive a detailed quote within 24 hours.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="btn-primary"
              >
                New Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-zed-red focus:ring-2 focus:ring-zed-red/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Intelligence</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@logistics.com"
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-zed-red focus:ring-2 focus:ring-zed-red/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Secure Phone</label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+44 7000 000000"
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-zed-red focus:ring-2 focus:ring-zed-red/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Est. Mass (kg)</label>
                  <input
                    required
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="e.g. 25kg"
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-zed-red focus:ring-2 focus:ring-zed-red/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Origin (UK)</label>
                  <input
                    required
                    type="text"
                    name="pickup"
                    value={formData.pickup}
                    onChange={handleChange}
                    placeholder="London, SE1"
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-zed-red focus:ring-2 focus:ring-zed-red/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Destination (ZM)</label>
                  <input
                    required
                    type="text"
                    name="delivery"
                    value={formData.delivery}
                    onChange={handleChange}
                    placeholder="Lusaka, Central"
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-zed-red focus:ring-2 focus:ring-zed-red/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Cargo Specifications</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe your shipment in detail..."
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-zed-red focus:ring-2 focus:ring-zed-red/20 outline-none transition-all resize-none"
                ></textarea>
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-3 text-zed-red bg-zed-red/10 p-5 rounded-2xl border border-zed-red/20">
                  <AlertCircle size={20} />
                  <span className="font-bold">Transmission failed. Please verify your data.</span>
                </div>
              )}

              <button
                disabled={status === 'loading'}
                type="submit"
                className="w-full btn-primary flex items-center justify-center gap-3 py-5 text-xl disabled:opacity-70 group"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="animate-spin" size={24} />
                    Processing...
                  </>
                ) : (
                  <>
                    Request Precision Quote <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default GetAQuote;
