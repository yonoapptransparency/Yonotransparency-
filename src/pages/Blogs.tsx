import { useEffect, useState } from 'react';
import { mockBlogs, mockSettings } from '../lib/supabase';
import { FileText, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Blogs() {
  const [blogs] = useState(mockBlogs);

  useEffect(() => {
    document.title = `Blogs - ${mockSettings.site_title}`;
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="animate-fade-in max-w-4xl mx-auto py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-pink-500/10 rounded-xl text-pink-500">
          <FileText className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Our Blog</h1>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          No blog posts available right now.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {blogs.map(blog => (
            <div key={blog.id} className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden glass-panel hover:border-pink-500/30 transition-colors group">
              <img src={blog.cover_url || undefined} alt={blog.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-pink-400 font-semibold mb-3">
                  <Calendar className="w-4 h-4" />
                  {new Date(blog.published_at).toLocaleDateString()}
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white line-clamp-2">{blog.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-4">{blog.content}</p>
                <div className="text-sm font-medium text-slate-600 dark:text-slate-300">By {blog.author}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
