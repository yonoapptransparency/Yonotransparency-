import { motion } from 'framer-motion';
import { mockSettings } from '../lib/supabase';

export default function Ticker() {
  if (!mockSettings.ticker_text) return null;

  return (
    <div className="bg-pink-100 dark:bg-slate-950 text-pink-600 dark:text-pink-400 py-2 overflow-hidden border-b border-pink-200 dark:border-pink-900/50 flex items-center relative z-50">
      <div className="bg-pink-500 w-2 h-2 rounded-full absolute left-4 z-10 shadow-[0_0_8px_rgba(236,72,153,0.8)] animate-pulse" />
      
      <div className="flex whitespace-nowrap overflow-hidden pl-10 w-full relative">
        {/* We use two motion.div elements to create a seamless loop */}
        <motion.div
          className="inline-block whitespace-nowrap min-w-full font-mono text-xs sm:text-sm font-medium tracking-wide"
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20
          }}
        >
          <span className="mx-8">{mockSettings.ticker_text}</span>
          <span className="mx-8">{mockSettings.ticker_text}</span>
        </motion.div>
      </div>
    </div>
  );
}
