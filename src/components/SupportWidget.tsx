import { useState, useEffect } from 'react';
import { MessageCircle, Mail, X } from 'lucide-react';
import { mockSettings } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

export default function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleWidget = () => {
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
    setIsOpen(!isOpen);
  };

  // Protect email from simple bot scrapers by rendering it character by character or dynamically
  const protectedEmail = mockSettings.support_email.split('').map((char, i) => <span key={i}>{char}</span>);

  return (
    <div className="fixed bottom-32 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-16 right-0 mb-4 bg-slate-900 border border-white/10 shadow-2xl rounded-2xl p-4 w-64 glass-panel text-slate-200"
          >
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
              <h3 className="font-bold text-white">Need Help?</h3>
              <button onClick={toggleWidget} className="p-1 rounded-full hover:bg-white/10"><X className="w-4 h-4"/></button>
            </div>
            
            <div className="flex flex-col gap-3">
              <a 
                href={`https://wa.me/${mockSettings.helpline_whatsapp.replace('+','')}`} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-white/10"
              >
                <div className="bg-[#25D366]/20 p-2 rounded-full text-[#25D366]"><MessageCircle className="w-4 h-4"/></div>
                <div className="text-sm font-medium">WhatsApp Support</div>
              </a>
              
              <a 
                href={`mailto:${mockSettings.support_email}`} 
                className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-white/10"
              >
                <div className="bg-pink-500/20 p-2 rounded-full text-pink-400"><Mail className="w-4 h-4"/></div>
                <div className="text-sm font-medium">{protectedEmail}</div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleWidget}
        className="w-12 h-12 rounded-full bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center shadow-lg shadow-pink-500/20"
        aria-label="Support Widget"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
