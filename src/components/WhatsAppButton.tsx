import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '447448593714'; // UK Number
  const message = 'Hello Zed Cart UK, I would like to inquire about a shipment.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 bg-[#25D366] text-white rounded-2xl shadow-2xl flex items-center justify-center relative group"
      >
        <div className="absolute inset-0 bg-[#25D366] rounded-2xl animate-ping opacity-20 group-hover:opacity-40" />
        <MessageCircle size={32} fill="currentColor" />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-white text-zed-dark rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-white/10">
          Chat on WhatsApp
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-white rotate-45" />
        </div>
      </motion.a>
    </div>
  );
};

export default WhatsAppButton;
