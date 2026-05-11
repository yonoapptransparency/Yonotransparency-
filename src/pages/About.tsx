import { motion } from 'framer-motion';
import { mockSettings } from '../lib/supabase';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8"
      >
        <h1 className="text-3xl font-bold mb-8">About {mockSettings.site_title}</h1>
        
        <div 
          className="space-y-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400 markdown-body"
          dangerouslySetInnerHTML={{ __html: mockSettings.about_content || '' }}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
          <div className="text-center p-6 bg-slate-50 dark:bg-white/5 rounded-2xl">
            <div className="text-3xl font-bold text-pink-500 mb-2">100%</div>
            <div className="text-sm font-semibold">Verified Safe</div>
          </div>
          <div className="text-center p-6 bg-slate-50 dark:bg-white/5 rounded-2xl">
            <div className="text-3xl font-bold text-blue-500 mb-2">50k+</div>
            <div className="text-sm font-semibold">Active Users</div>
          </div>
          <div className="text-center p-6 bg-slate-50 dark:bg-white/5 rounded-2xl">
            <div className="text-3xl font-bold text-purple-500 mb-2">24/7</div>
            <div className="text-sm font-semibold">Security Monitoring</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
