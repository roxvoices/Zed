import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-zed-dark text-white pt-32 pb-12 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-zed-red/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          {/* Brand */}
          <div className="md:col-span-4 space-y-8">
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-zed-red p-2.5 rounded-2xl shadow-lg shadow-zed-red/20">
                <Truck className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-display font-bold tracking-tight">
                ZED<span className="text-zed-red">CART</span>
              </span>
            </Link>
            <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
              The premier UK to Zambia shipping specialist. Engineered for speed, security, and absolute reliability.
            </p>
            <div className="flex space-x-6">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-zed-red hover:bg-white/10 transition-all duration-300">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-8">Navigation</h3>
            <ul className="space-y-4 text-slate-400 font-medium">
              {[
                { name: 'Home', path: '/' },
                { name: 'Services', path: '/services' },
                { name: 'Get a Quote', path: '/quote' },
                { name: 'Track Parcel', path: '/track' },
                { name: 'About Us', path: '/about' },
                { name: 'FAQ', path: '/faq' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-zed-red transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-8">Solutions</h3>
            <ul className="space-y-4 text-slate-400 font-medium">
              {['Door-to-Door', 'Priority Air', 'Secure Sea', 'Express Parcel', 'Customs Mastery'].map((item) => (
                <li key={item} className="hover:text-zed-red transition-colors cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-8">Contact</h3>
            <ul className="space-y-6 text-slate-400 font-medium">
              <li className="flex items-start space-x-4">
                <MapPin size={20} className="text-zed-red shrink-0" />
                <span className="text-sm leading-relaxed">7 Wellington Pl, Leeds LS1 4AP, United Kingdom</span>
              </li>
              <li className="flex items-center space-x-4">
                <Phone size={20} className="text-zed-red shrink-0" />
                <span className="text-sm">+44 7448 593714</span>
              </li>
              <li className="flex items-center space-x-4">
                <Mail size={20} className="text-zed-red shrink-0" />
                <span className="text-sm">zedcartuk@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500 font-medium">
          <p>&copy; {new Date().getFullYear()} Zed Cart UK. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
