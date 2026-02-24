import React from 'react';
import { motion } from 'motion/react';
import { Shield, Globe, Users, Award } from 'lucide-react';

const AboutUs = () => {
  const stats = [
    { label: 'Years Experience', value: '10+' },
    { label: 'Parcels Delivered', value: '50k+' },
    { label: 'Happy Clients', value: '15k+' },
    { label: 'Zambia Branches', value: '5' },
  ];

  return (
    <div className="bg-zed-dark min-h-screen pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-zed-red font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Our Story</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-8">
              Connecting the UK to <span className="text-zed-red">Zambia.</span>
            </h1>
            <p className="text-slate-400 text-xl leading-relaxed mb-8">
              Zed Cart UK was founded with a single mission: to provide the most reliable, secure, and affordable shipping bridge between the United Kingdom and Zambia.
            </p>
            <p className="text-slate-500 text-lg leading-relaxed mb-12">
              We understand the importance of every parcel. Whether it's a gift for family, essential business supplies, or personal belongings, we treat every shipment with the highest level of care and professional integrity.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="glass-card p-6">
                  <p className="text-3xl font-display font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-card p-4 aspect-square overflow-hidden">
              <img 
                src="https://picsum.photos/seed/logistics/800/800" 
                alt="Logistics" 
                className="w-full h-full object-cover rounded-2xl opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zed-dark via-transparent to-transparent" />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-10 -left-10 glass-card p-8 hidden md:block">
              <div className="flex items-center gap-4">
                <Award className="text-zed-gold" size={40} />
                <div>
                  <p className="text-white font-bold">Certified Excellence</p>
                  <p className="text-slate-500 text-sm">Logistics Partner of the Year</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Shield className="text-zed-red" size={32} />,
              title: 'Secure Handling',
              desc: 'State-of-the-art tracking and security protocols for every shipment.'
            },
            {
              icon: <Globe className="text-zed-green" size={32} />,
              title: 'Global Network',
              desc: 'Strategically located hubs in the UK and major Zambian cities.'
            },
            {
              icon: <Users className="text-zed-gold" size={32} />,
              title: 'Expert Team',
              desc: 'Dedicated professionals with deep knowledge of international customs.'
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-10"
            >
              <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit">
                {item.icon}
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-4">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
