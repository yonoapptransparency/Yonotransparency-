import { motion } from 'framer-motion';
import { Newspaper, Search, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { mockNews } from '../lib/supabase';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredNews = mockNews.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.ceo_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in min-h-screen">
      <Helmet>
        <title>Latest News</title>
        <meta name="description" content="Read the latest news and updates." />
      </Helmet>
      <div className="mb-8 px-1">
        <h1 className="text-3xl font-black mb-4 flex items-center gap-3 text-black dark:text-white uppercase tracking-tight">
          <Newspaper className="w-8 h-8 text-red-600" /> Latest News
        </h1>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-3 bg-slate-100 dark:bg-white/5 border border-transparent dark:border-white/5 rounded-full text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500/30 transition-all"
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((item) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel hover:border-pink-500/30 transition-all overflow-hidden relative flex flex-col"
          >
            <div className="h-48 border-b border-white/10 shrink-0 relative">
              <img src={item.logo_url} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-lg font-black text-black dark:text-white mb-2 line-clamp-2 uppercase tracking-tight">{item.title}</h3>
              <p className="text-sm text-slate-800 dark:text-slate-400 mb-4 line-clamp-3 font-medium">{item.description}</p>
              
              <div className="mt-auto pt-4 border-t border-slate-200 dark:border-white/10">
                <Link to={`/news/${item.slug}`} className="flex items-center justify-between text-red-600 dark:text-red-400 font-black uppercase text-xs tracking-widest hover:text-red-700 dark:hover:text-red-300">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
        {filteredNews.length === 0 && (
          <div className="col-span-full py-20 text-center text-slate-500">
            No news found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
