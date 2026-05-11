import { motion } from 'framer-motion';
import { mockSettings } from '../lib/supabase';

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 prose prose-slate dark:prose-invert max-w-none"
      >
        <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: May 11, 2026</p>

        <div 
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: mockSettings.terms_content || '' }}
        />
      </motion.div>
    </div>
  );
}
