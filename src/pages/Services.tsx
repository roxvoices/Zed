import React from 'react';
import { motion } from 'motion/react';
import { Truck, Plane, Ship, Zap, Package, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      id: 'door-to-door',
      title: 'Door-to-Door',
      icon: <Truck size={40} />,
      description: 'The ultimate convenience. We pick up from your UK address and deliver directly to the recipient in Zambia. We handle all logistics, including customs clearance.',
      features: ['UK-wide pickup', 'Zambia-wide delivery', 'Customs clearance', 'Real-time tracking'],
      color: 'from-zed-red/20 to-transparent',
    },
    {
      id: 'priority-air',
      title: 'Priority Air',
      icon: <Plane size={40} />,
      description: 'When speed is the only variable. Our priority air service ensures your parcels reach Zambia within 5-7 working days with absolute security.',
      features: ['5-7 day delivery', 'High-value security', 'Daily departures', 'Express processing'],
      color: 'from-zed-green/20 to-transparent',
    },
    {
      id: 'secure-sea',
      title: 'Secure Sea',
      icon: <Ship size={40} />,
      description: 'The most economical way to ship large items, furniture, or bulk goods. Perfect for household relocations and commercial cargo.',
      features: ['Bulk cargo specialists', 'Container sharing', 'Full container loads', 'Heavy machinery'],
      color: 'from-zed-gold/20 to-transparent',
    },
    {
      id: 'express-parcel',
      title: 'Express Parcel',
      icon: <Zap size={40} />,
      description: 'Small parcels and essential documents delivered with priority. Perfect for gifts, paperwork, and urgent small items.',
      features: ['Priority handling', 'Signature required', 'Document specialists', 'Competitive rates'],
      color: 'from-white/10 to-transparent',
    },
  ];

  return (
    <div className="bg-zed-dark min-h-screen pb-32 pt-24">
      {/* Header */}
      <div className="py-24 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-zed-red font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Our Solutions</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-8">
              Logistics <span className="text-zed-red">Mastered.</span>
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-xl leading-relaxed">
              We've engineered a suite of services designed to bridge the distance between the UK and Zambia with surgical precision.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-zed-red/5 blur-[120px] -z-10" />
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`glass-card p-12 group hover:border-white/20 transition-all duration-500 relative overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="mb-10 p-5 bg-white/5 rounded-2xl w-fit text-white group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                  {service.icon}
                </div>
                <h2 className="text-3xl font-display font-bold text-white mb-6">{service.title}</h2>
                <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                  {service.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3">
                      <CheckCircle2 className="text-zed-green" size={18} />
                      <span className="text-slate-300 font-medium text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link to="/quote" className="text-white font-bold flex items-center gap-2 group/btn">
                  Request Quote <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Custom Solution CTA */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-16 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-zed-red/10 via-transparent to-zed-green/10 opacity-50" />
          <div className="relative z-10">
            <h2 className="text-4xl font-display font-bold text-white mb-6">Complex Requirements?</h2>
            <p className="text-slate-400 mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
              From commercial cargo to specialized equipment, our logistics engineers can design a bespoke solution for your specific needs.
            </p>
            <Link to="/contact" className="btn-primary">
              Consult with an Expert
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
