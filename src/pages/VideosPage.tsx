import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { mockVideos } from '../lib/supabase';
import { Video as VideoIcon, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VideosPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVideos = mockVideos.filter(video => 
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    video.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in max-w-6xl mx-auto py-8">
      <Helmet>
        <title>Videos - YonoStore</title>
        <meta name="description" content="Watch the latest videos and tutorials about apps and games." />
      </Helmet>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <VideoIcon className="w-8 h-8 text-pink-500" />
            Videos
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Watch the latest app reviews, tutorials, and tech updates.
          </p>
        </div>
        
        <input 
          type="search" 
          placeholder="Search videos..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-64 bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl p-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-pink-500 transition-all outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video, index) => (
          <motion.div 
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group block bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-pink-500/10 hover:border-pink-500/30 transition-all duration-300"
          >
            <div className="relative aspect-video bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
              <img 
                src={`https://img.youtube.com/vi/${video.youtube_url.split('v=')[1]?.split('&')[0] || video.youtube_url.split('/').pop()}/maxresdefault.jpg`} 
                alt={video.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.youtube_url.split('v=')[1]?.split('&')[0] || video.youtube_url.split('/').pop()}/hqdefault.jpg`;
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <PlayCircle className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="font-bold text-xl text-slate-900 dark:text-white group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors line-clamp-2 mb-2">
                {video.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-4">
                {video.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-slate-500 shrink-0">
                <span>{new Date(video.created_at).toLocaleDateString()}</span>
                <Link to={`/videos/${video.slug}`} className="text-pink-600 font-medium hover:underline">Watch Video →</Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {filteredVideos.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          No videos found matching your search.
        </div>
      )}
    </div>
  );
}
