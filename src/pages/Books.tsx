import { motion } from 'framer-motion';
import { Book as BookIcon, Download, Search } from 'lucide-react';
import { useState } from 'react';
import { mockBooks } from '../lib/supabase';

export default function Books() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredBooks = mockBooks.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in min-h-screen">
      <div className="mb-8 px-1">
        <h1 className="text-3xl font-bold mb-4 flex items-center gap-3">
          <BookIcon className="w-8 h-8 text-pink-500" /> Books & Guides
        </h1>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-3 bg-slate-100 dark:bg-white/5 border border-transparent dark:border-white/5 rounded-full text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500/30 transition-all"
            placeholder="Search books or authors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBooks.map((book) => (
          <motion.div 
            key={book.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-4 flex gap-4 hover:border-pink-500/30 transition-all"
          >
            <div className="w-32 h-44 shrink-0 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg">
              <img src={book.cover_url || undefined} alt={book.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-between flex-1 py-1">
              <div>
                <span className="text-[10px] font-bold text-pink-500 uppercase tracking-widest mb-1 block">{book.category}</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">{book.title}</h3>
                <p className="text-sm text-slate-500 mb-2">by {book.author}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">{book.description}</p>
              </div>
              <a 
                href={book.download_url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 rounded-xl transition-colors text-sm"
              >
                <Download className="w-4 h-4" /> Download PDF
              </a>
            </div>
          </motion.div>
        ))}
        {filteredBooks.length === 0 && (
          <div className="col-span-full py-20 text-center text-slate-500">
            No books found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
