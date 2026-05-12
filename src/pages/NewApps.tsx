import { motion } from 'framer-motion';
import { useData } from '../contexts/DataContext';
import { ShieldCheck, ShieldAlert, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NewApps() {
  const { apps: mockApps, settings: mockSettings, news: mockNews, blogs: mockBlogs, videos: mockVideos, saveApps: saveMockApps, saveSettings: saveMockSettings, saveNews: saveMockNews, saveBlogs: saveMockBlogs, saveVideos: saveMockVideos } = useData();
  const newApps = mockApps
    .filter(app => app.is_new)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 10);

  const triggerNewAppHaptic = () => {
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate([30, 50, 30]); // Distinct double vibration
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="max-w-3xl mx-auto pb-20 select-none">
      <div className="text-center mb-10 pt-10">
        <h1 className="text-4xl font-black tracking-tighter mb-2 flex items-center justify-center gap-2 text-black dark:text-white uppercase">
          <Sparkles className="w-8 h-8 text-red-600" /> New Applications
        </h1>
        <p className="text-black dark:text-slate-400 font-black uppercase tracking-widest text-xs">The latest, hand-checked software arrivals.</p>
      </div>

      <motion.div 
        variants={mockSettings.animations_enabled ? containerVariants : {}}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-6"
      >
        {newApps.map((app) => (
          <motion.div key={app.id} variants={itemVariants}>
            <Link 
              onClick={triggerNewAppHaptic} 
              to={`/app/${app.slug}`} 
              className="glass-panel p-5 sm:p-6 hover:bg-white/5 transition-all group flex flex-col sm:flex-row gap-6 items-start relative overflow-hidden block border border-white/10"
            >
              {/* "NEW" Ribbon / Glowing Badge */}
              <div className="absolute top-0 right-0">
                <div className="bg-red-600 text-white text-[10px] sm:text-xs font-bold px-3 py-1 rounded-bl-xl shadow-lg shadow-red-600/30 animate-pulse tracking-wider">
                  NEW
                </div>
              </div>

              <div className="w-20 h-20 sm:w-28 sm:h-28 shrink-0 rounded-2xl overflow-hidden bg-slate-800 border border-white/10">
                {app.icon_url ? (
                  <img src={app.icon_url || undefined} alt={app.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-slate-500">
                    {app.name.substring(0, 1)}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0 pr-8">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-black truncate text-black dark:text-white group-hover:text-red-600 transition-colors uppercase tracking-tight">{app.name}</h3>
                  {app.safety_status === 'Verified' && <ShieldCheck className="w-4 h-4 text-red-600 shrink-0" />}
                  {(app.safety_status === 'Caution' || app.safety_status === 'Unsafe') && <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />}
                </div>
                <div className="text-sm font-black text-black dark:text-slate-400 mb-3 uppercase tracking-wider">{app.developer} • {app.file_size}</div>
                
                {app.release_notes && (
                  <div className="bg-red-500/5 dark:bg-red-500/10 border border-red-500/20 rounded-xl p-3 mt-2">
                    <div className="text-xs font-black text-red-600 mb-1 uppercase tracking-widest">What's New</div>
                    <div className="text-sm text-black dark:text-red-100/90 whitespace-pre-wrap font-medium">{app.release_notes}</div>
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        ))}

        {newApps.length === 0 && (
          <div className="text-center py-20 text-slate-400 glass-panel">
            <p className="text-lg">No new applications at this time.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
