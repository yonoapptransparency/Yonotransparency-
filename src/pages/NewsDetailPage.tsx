import { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { mockNews } from '../lib/supabase';
import { ArrowLeft, MessageSquare, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
}

export default function NewsDetailPage() {
  const { slug } = useParams();
  const newsItem = mockNews.find(n => n.slug === slug);
  const [commentText, setCommentText] = useState('');
  
  const getInitialComments = () => {
    const saved = localStorage.getItem(`comments_${slug}`);
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      {
        id: '1',
        author: 'Jane Doe',
        content: 'Thanks for sharing this news. Very informative!',
        date: new Date(Date.now() - 86400000).toLocaleDateString()
      }
    ];
  };

  const [comments, setComments] = useState<Comment[]>(getInitialComments);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      author: 'Guest User',
      content: commentText,
      date: new Date().toLocaleDateString()
    };

    const newCommentsList = [newComment, ...comments];
    setComments(newCommentsList);
    localStorage.setItem(`comments_${slug}`, JSON.stringify(newCommentsList));
    setCommentText('');
  };

  if (!newsItem) {
    return <Navigate to="/news" />;
  }

  return (
    <div className="animate-fade-in max-w-4xl mx-auto px-4 sm:px-6 mb-20">
      <Helmet>
        <title>{newsItem.seo_title || newsItem.title}</title>
        <meta name="description" content={newsItem.seo_description || newsItem.description} />
        {newsItem.seo_keywords && <meta name="keywords" content={newsItem.seo_keywords} />}
        <meta property="og:title" content={newsItem.seo_title || newsItem.title} />
        <meta property="og:description" content={newsItem.seo_description || newsItem.description} />
        <meta property="og:image" content={newsItem.og_image_url || newsItem.logo_url} />
        <meta property="og:type" content="article" />
      </Helmet>
      
      <Link to="/news" className="inline-flex items-center gap-2 text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 font-medium mb-6 mt-4">
        <ArrowLeft className="w-5 h-5" /> Back to News
      </Link>

      <div className="glass-panel overflow-hidden border border-slate-200 dark:border-white/10">
        {newsItem.logo_url && (
            <div className="w-full h-64 md:h-96">
                <img src={newsItem.logo_url} alt={newsItem.title} className="w-full h-full object-cover" />
            </div>
        )}
        
        <div className="p-6 sm:p-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            {newsItem.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-200 dark:border-white/10">
                <div>
                    <p className="font-bold text-slate-900 dark:text-white">{newsItem.ceo_name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{newsItem.ceo_description}</p>
                </div>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
                <p className="text-xl font-medium mb-6 text-slate-900 dark:text-white">{newsItem.description}</p>
                <ReactMarkdown>{newsItem.content}</ReactMarkdown>
            </div>

            {newsItem.link && (
                <div className="mt-10 pt-8 border-t border-slate-200 dark:border-white/10">
                    <a href={newsItem.link} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center min-h-[48px] px-8 bg-pink-500 text-white font-bold rounded-full hover:bg-pink-600 transition-colors shadow-lg shadow-pink-500/25">
                        Read more from source
                    </a>
                </div>
            )}

            <div className="mt-16 pt-10 border-t border-slate-200 dark:border-white/10">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-8">
                <MessageSquare className="w-6 h-6 text-pink-500" />
                Comments ({comments.length})
              </h3>
              
              <form onSubmit={handleAddComment} className="mb-10">
                <div className="relative">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Leave a comment..."
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl p-4 pr-16 text-slate-900 dark:text-white focus:ring-2 focus:ring-pink-500 min-h-[100px] resize-y"
                  />
                  <button
                    type="submit"
                    disabled={!commentText.trim()}
                    className="absolute bottom-4 right-4 w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Submit comment"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>

              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400 flex items-center justify-center font-bold">
                          {comment.author.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{comment.author}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{comment.date}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
