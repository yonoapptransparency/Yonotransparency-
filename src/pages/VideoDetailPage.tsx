import { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { mockVideos } from '../lib/supabase';
import { ArrowLeft, MessageSquare, Send } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
}

export default function VideoDetailPage() {
  const { slug } = useParams();
  const videoItem = mockVideos.find(v => v.slug === slug);
  const [commentText, setCommentText] = useState('');
  
  const getInitialComments = () => {
    const saved = localStorage.getItem(`video_comments_${slug}`);
    if (saved) {
      return JSON.parse(saved);
    }
    return [];
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
    localStorage.setItem(`video_comments_${slug}`, JSON.stringify(newCommentsList));
    setCommentText('');
  };

  if (!videoItem) {
    return <Navigate to="/videos" />;
  }

  // Extract YouTube ID
  let videoId = '';
  try {
    const url = new URL(videoItem.youtube_url);
    if (url.hostname.includes('youtube.com')) {
      videoId = url.searchParams.get('v') || '';
    } else if (url.hostname.includes('youtu.be')) {
      videoId = url.pathname.slice(1);
    }
  } catch (e) {
    videoId = videoItem.youtube_url.split('/').pop() || '';
  }

  return (
    <div className="animate-fade-in max-w-4xl mx-auto pb-12">
      <Helmet>
        <title>{videoItem.seo_title || videoItem.title}</title>
        <meta name="description" content={videoItem.seo_description || videoItem.description} />
        {videoItem.seo_keywords && <meta name="keywords" content={videoItem.seo_keywords} />}
        <meta property="og:title" content={videoItem.seo_title || videoItem.title} />
        <meta property="og:description" content={videoItem.seo_description || videoItem.description} />
        <meta property="og:type" content="video.other" />
      </Helmet>
      
      <Link to="/videos" className="inline-flex items-center gap-2 text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 font-medium mb-6 mt-4">
        <ArrowLeft className="w-4 h-4" /> Back to Videos
      </Link>

      <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl shadow-pink-500/5 border border-slate-200 dark:border-white/10">
        <div className="relative aspect-video w-full bg-black">
          {videoId ? (
            <iframe 
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} 
              title={videoItem.title}
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen>
            </iframe>
          ) : (
            <div className="flex items-center justify-center h-full text-white">Invalid Video URL</div>
          )}
        </div>
        
        <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
              {videoItem.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="text-sm font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-white/10">
                {new Date(videoItem.created_at).toLocaleDateString()}
              </span>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none prose-pink text-slate-700 dark:text-slate-300">
              <p>{videoItem.description}</p>
            </div>

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
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl p-4 pr-16 text-slate-900 dark:text-white focus:ring-2 focus:ring-pink-500 min-h-[100px] resize-y outline-none"
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
                {comments.length === 0 && (
                  <p className="text-slate-500 text-center py-8">No comments yet. Be the first to share your thoughts!</p>
                )}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
