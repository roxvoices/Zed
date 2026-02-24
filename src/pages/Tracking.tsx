import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Package, MapPin, Clock, CheckCircle2, AlertCircle, Loader2, ArrowRight, Truck, Globe } from 'lucide-react';
import { Order } from '../types';

const Tracking = () => {
  const [trackingId, setTrackingId] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'not-found' | 'error'>('idle');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setStatus('loading');
    setOrder(null);

    try {
      const response = await fetch(`/api/track/${trackingId.toUpperCase()}`);
      if (response.ok) {
        const data = await response.json();
        setOrder(data);
        setStatus('idle');
      } else if (response.status === 404) {
        setStatus('not-found');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const steps = [
    { name: 'Pending', icon: <Clock size={20} />, desc: 'Order received and processing' },
    { name: 'In Transit', icon: <Truck size={20} />, desc: 'Parcel is on its way to Zambia' },
    { name: 'Arrived in Zambia', icon: <Globe size={20} />, desc: 'Parcel has cleared initial customs' },
    { name: 'Out for Delivery', icon: <Package size={20} />, desc: 'Local courier is delivering' },
    { name: 'Delivered', icon: <CheckCircle2 size={20} />, desc: 'Parcel successfully delivered' },
  ];

  const getCurrentStepIndex = (currentStatus: string) => {
    return steps.findIndex(s => s.name === currentStatus);
  };

  return (
    <div className="bg-zed-dark min-h-screen pt-32 pb-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-display font-bold text-white mb-6"
          >
            Track Your <span className="text-zed-red">Shipment.</span>
          </motion.h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Real-time intelligence for your global cargo. Enter your tracking ID below.
          </p>
        </div>

        <div className="glass-card p-8 mb-16">
          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-6">
            <div className="flex-grow relative group">
              <div className="absolute inset-0 bg-zed-red/10 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <Package className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 z-20" size={24} />
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                placeholder="ENTER TRACKING ID (e.g. ZC-12345)"
                className="relative z-10 w-full pl-14 pr-6 py-6 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-zed-red focus:ring-4 focus:ring-zed-red/10 outline-none transition-all font-mono text-xl tracking-widest placeholder:text-slate-600 placeholder:tracking-normal placeholder:font-sans"
              />
            </div>
            <button
              disabled={status === 'loading'}
              type="submit"
              className="btn-primary flex items-center justify-center gap-3 px-10 py-5 disabled:opacity-70"
            >
              {status === 'loading' ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>
                  Track <Search size={20} />
                </>
              )}
            </button>
          </form>

          {status === 'not-found' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex items-center gap-3 text-zed-red bg-zed-red/10 p-5 rounded-2xl border border-zed-red/20"
            >
              <AlertCircle size={20} />
              <span className="font-bold">Tracking ID not found. Please verify and try again.</span>
            </motion.div>
          )}
        </div>

        <AnimatePresence>
          {order && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="space-y-12"
            >
              {/* Visual Timeline */}
              <div className="glass-card p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                  <Truck size={200} className="text-white" />
                </div>
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
                  <div>
                    <p className="text-xs font-bold text-zed-red uppercase tracking-[0.3em] mb-2">Current Status</p>
                    <h2 className="text-4xl font-display font-bold text-white">{order.status}</h2>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em] mb-2">Tracking ID</p>
                    <p className="text-2xl font-mono font-bold text-white">{order.tracking_id}</p>
                  </div>
                </div>

                <div className="relative">
                  {/* Progress Line */}
                  <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-white/5 rounded-full">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(getCurrentStepIndex(order.status) / (steps.length - 1)) * 100}%` }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      className="h-full bg-zed-green shadow-[0_0_15px_rgba(0,245,212,0.5)] rounded-full"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-4 relative">
                    {steps.map((step, idx) => {
                      const isCompleted = getCurrentStepIndex(order.status) >= idx;
                      const isCurrent = getCurrentStepIndex(order.status) === idx;
                      
                      return (
                        <div key={step.name} className="flex md:flex-col items-center gap-6 md:gap-0">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: idx * 0.2 }}
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center z-10 transition-all duration-500 ${
                              isCompleted ? 'bg-zed-green text-zed-dark shadow-[0_0_20px_rgba(0,245,212,0.3)]' : 'bg-white/5 text-slate-600 border border-white/10'
                            } ${isCurrent ? 'ring-4 ring-zed-green/20 scale-125' : ''}`}
                          >
                            {isCompleted ? <CheckCircle2 size={24} /> : step.icon}
                          </motion.div>
                          <div className="md:text-center md:mt-8">
                            <p className={`text-sm font-bold uppercase tracking-wider mb-1 ${
                              isCurrent ? 'text-zed-green' : isCompleted ? 'text-white' : 'text-slate-600'
                            }`}>
                              {step.name}
                            </p>
                            <p className="text-xs text-slate-500 font-medium hidden md:block">{step.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="glass-card p-10"
                >
                  <h3 className="text-xl font-display font-bold text-white mb-8 flex items-center gap-3">
                    <MapPin size={24} className="text-zed-red" /> Route Intelligence
                  </h3>
                  <div className="space-y-8 relative">
                    <div className="absolute left-3 top-6 bottom-6 w-px bg-white/10" />
                    <div className="relative pl-10">
                      <div className="absolute left-0 top-1 w-6 h-6 bg-zed-red/20 rounded-full border border-zed-red/40 flex items-center justify-center">
                        <div className="w-2 h-2 bg-zed-red rounded-full" />
                      </div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Origin (UK)</p>
                      <p className="text-white font-bold text-lg">{order.pickup}</p>
                    </div>
                    <div className="relative pl-10">
                      <div className="absolute left-0 top-1 w-6 h-6 bg-zed-green/20 rounded-full border border-zed-green/40 flex items-center justify-center">
                        <div className="w-2 h-2 bg-zed-green rounded-full" />
                      </div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Destination (ZM)</p>
                      <p className="text-white font-bold text-lg">{order.delivery}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="glass-card p-10"
                >
                  <h3 className="text-xl font-display font-bold text-white mb-8 flex items-center gap-3">
                    <Package size={24} className="text-zed-red" /> Cargo Specifications
                  </h3>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Weight</p>
                      <p className="text-white font-bold text-xl">{order.weight}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">ETA</p>
                      <p className="text-white font-bold text-xl">
                        {order.status === 'Delivered' ? 'Delivered' : '7-14 Days'}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Description</p>
                      <p className="text-slate-300 font-medium leading-relaxed">
                        {order.description || 'Standard logistics cargo'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Tracking;
