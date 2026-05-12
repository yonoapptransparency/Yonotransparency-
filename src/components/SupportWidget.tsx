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
    <div className="relative inline-block z-50">
      <button
        onClick={toggleWidget}
        className="flex items-center gap-2 px-3 justify-center min-h-[48px] bg-pink-100 dark:bg-pink-500/20 rounded-full border border-pink-200 dark:border-pink-500/50 text-pink-600 dark:text-pink-400 hover:bg-pink-200 dark:hover:bg-pink-500/30 transition-colors"
        aria-label="Support Widget"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm font-bold hidden xl:inline">Need Help</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute right-0 top-full mt-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl rounded-2xl p-4 w-64 text-slate-800 dark:text-slate-200 origin-top-right"
          >
            <div className="flex justify-between items-center mb-4 border-b border-slate-200 dark:border-white/10 pb-2">
              <h3 className="font-bold text-slate-900 dark:text-white">Need Help?</h3>
              <button onClick={toggleWidget} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400"><X className="w-4 h-4"/></button>
            </div>
            
            <div className="flex flex-col gap-3">
              <a 
                href={`https://wa.me/${mockSettings.helpline_whatsapp.replace('+','')}`} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-slate-200 dark:hover:border-white/10 text-slate-700 dark:text-slate-300"
              >
                <div className="bg-[#25D366]/10 p-2 rounded-full text-[#25D366]"><MessageCircle className="w-4 h-4"/></div>
                <div className="text-sm font-medium">WhatsApp Support</div>
              </a>
              
              <a 
                href={`mailto:${mockSettings.support_email}`} 
                className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-slate-200 dark:hover:border-white/10 text-slate-700 dark:text-slate-300"
              >
                <div className="bg-pink-500/10 p-2 rounded-full text-pink-500 dark:text-pink-400"><Mail className="w-4 h-4"/></div>
                <div className="text-sm font-medium">{protectedEmail}</div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
