import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, MessageSquare, Clock, ArrowRight } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: 'Direct Line',
      value: '+44 7448 593714',
      link: 'tel:+447448593714',
      desc: 'Available 24/7 for urgent logistics support.',
    },
    {
      icon: <Mail size={24} />,
      title: 'Email Intelligence',
      value: 'info@zedcartuk.com',
      link: 'mailto:info@zedcartuk.com',
      desc: 'For detailed quotes and commercial inquiries.',
    },
    {
      icon: <MessageSquare size={24} />,
      title: 'WhatsApp Secure',
      value: '+44 7448 593714',
      link: 'https://wa.me/447448593714',
      desc: 'Instant messaging for quick updates.',
    },
    {
      icon: <MapPin size={24} />,
      title: 'UK Headquarters',
      value: 'London, United Kingdom',
      link: '#',
      desc: 'Strategically located for UK-wide collection.',
    },
  ];

  return (
    <div className="bg-zed-dark min-h-screen pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-zed-red font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Get in Touch</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-8">
              Let's Bridge the <span className="text-zed-red">Gap.</span>
            </h1>
            <p className="text-slate-400 text-xl leading-relaxed mb-12 max-w-xl">
              Whether you're shipping a single parcel or managing a commercial supply chain, our experts are ready to assist.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {contactInfo.map((item, idx) => (
                <motion.a
                  key={idx}
                  href={item.link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-card p-8 group hover:border-white/20 transition-all"
                >
                  <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit text-zed-red group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-zed-red font-mono font-bold mb-3">{item.value}</p>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Visual/Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="glass-card p-4 aspect-square md:aspect-video lg:aspect-square overflow-hidden group">
              <div className="absolute inset-0 bg-zed-red/5 group-hover:bg-zed-red/10 transition-colors" />
              <div className="w-full h-full bg-slate-900 rounded-2xl relative overflow-hidden flex items-center justify-center">
                {/* Simulated Map Grid */}
                <div className="absolute inset-0 opacity-20" style={{ 
                  backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', 
                  backgroundSize: '30px 30px' 
                }} />
                
                <div className="relative z-10 text-center p-12">
                  <div className="w-20 h-20 bg-zed-red/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                    <MapPin className="text-zed-red" size={40} />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-4">Global Network</h3>
                  <p className="text-slate-400 max-w-xs mx-auto">
                    Our logistics grid covers the entire UK and reaches every corner of Zambia.
                  </p>
                </div>

                {/* Decorative lines */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  <div className="absolute top-1/4 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-zed-red/30 to-transparent rotate-45" />
                  <div className="absolute bottom-1/4 right-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-zed-green/30 to-transparent -rotate-45" />
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-10 -right-10 glass-card p-8 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-zed-green rounded-full animate-ping" />
                <div>
                  <p className="text-white font-bold">Live Support</p>
                  <p className="text-slate-500 text-sm">Average response: 5 mins</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
