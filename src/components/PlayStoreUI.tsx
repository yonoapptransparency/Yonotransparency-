import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { ShieldCheck, Star, Download, AlertTriangle, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BannerProps {
  items: any[];
}

export function FlipkartBanner({ items }: BannerProps) {
  return (
    <div className="w-full overflow-hidden mb-8 -mx-4 sm:mx-0">
      <div className="flex overflow-x-auto gap-4 px-4 pb-4 snap-x no-scrollbar">
        {items.map((item, i) => (
          <Link
            to={item.link || "/"}
            key={item.id || i}
            className="flex-shrink-0 w-[85vw] sm:w-[400px] h-[180px] rounded-2xl relative overflow-hidden snap-center group block"
          >
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="w-full h-full relative"
            >
              <img 
                src={item.image || `https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop`} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                alt="Banner"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                <h3 className="text-white text-xl font-bold mb-1">{item.title}</h3>
                <p className="text-white/80 text-sm mb-3">{item.subtitle}</p>
                <div className="flex items-center gap-2">
                  <span className="bg-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Ad</span>
                  <span className="text-white/60 text-[10px]">Promoted Link</span>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}

import { mockSettings } from '../lib/supabase';

interface TabProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function PlayStoreTabs({ activeTab, onTabChange }: TabProps) {
  const tabs = mockSettings.categories && mockSettings.categories.length > 0 
    ? mockSettings.categories 
    : ["For you", "Top charts", "Children", "Categories"];
  
  return (
    <div className="border-b border-slate-200 dark:border-white/10 mb-6 bg-pink-50 dark:bg-slate-900 sticky top-16 z-40 transition-colors duration-300">
      <div className="flex overflow-x-auto no-scrollbar px-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={cn(
              "whitespace-nowrap px-6 py-4 text-sm font-medium transition-colors relative border-b-2",
              activeTab === tab 
                ? "text-pink-600 dark:text-pink-400 border-pink-600 dark:border-pink-400" 
                : "text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-slate-200"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

interface TopChartItemProps {
  rank: number;
  app: any;
  key?: string | number;
}

export function AppListItem({ app, index }: { app: any, key?: string | number, index?: number }) {
  return (
    <Link 
      to={`/app/${app.slug}`}
      className="flex items-center gap-4 p-4 mb-3 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors rounded-3xl active:scale-[0.98] border border-white/80 dark:border-white/10 shadow-sm"
    >
      {index !== undefined && (
        <div className="w-6 text-[15px] font-bold text-slate-400 dark:text-slate-500 text-center shrink-0">
          {index}
        </div>
      )}
      <div className="w-16 h-16 rounded-[1.25rem] overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-800 shadow-inner">
        <img 
          src={app.icon_url || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=128&h=128&fit=crop"} 
          alt={app.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex items-center gap-1.5 mb-0.5">
          <h3 className="font-bold text-[17px] leading-tight text-slate-900 dark:text-white truncate">
            {app.name}
          </h3>
          {app.safety_status === 'Verified' && <ShieldCheck className="w-4 h-4 shrink-0 text-pink-500" />}
          {app.safety_status === 'Caution' && <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500" />}
          {app.safety_status === 'Unsafe' && <ShieldAlert className="w-4 h-4 shrink-0 text-rose-500" />}
          {app.is_new && <span className="ml-1 shrink-0 inline-block bg-pink-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-tight align-middle -mt-1">New</span>}
        </div>
        <span className="text-[13px] text-slate-600 dark:text-slate-400 mt-0.5 truncate">{app.category}</span>
        <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-0.5">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{app.rating ? app.rating.toFixed(1) : 'N/A'}</span>
        </div>
      </div>
      
      <div className="shrink-0 pl-2">
        <button className="bg-slate-900/5 dark:bg-white/10 hover:bg-slate-900/10 dark:hover:bg-white/20 text-slate-800 dark:text-white px-5 py-[0.35rem] text-sm font-bold rounded-full transition-colors">
          Get
        </button>
      </div>
    </Link>
  );
}

export function TopChartItem({ rank, app }: TopChartItemProps) {
  return (
    <Link 
      to={`/app/${app.slug}`}
      className="flex items-center gap-4 p-4 mb-3 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors rounded-3xl active:scale-[0.98] border border-white/80 dark:border-white/10 shadow-sm"
    >
      <div className="w-6 text-[15px] font-bold text-slate-400 dark:text-slate-500 text-center shrink-0">
        {rank}
      </div>
      
      <div className="w-16 h-16 rounded-[1.25rem] overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-800 shadow-inner">
        <img 
          src={app.icon_url || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=128&h=128&fit=crop"} 
          alt={app.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex items-center gap-1.5 mb-0.5">
          <h3 className="font-bold text-[17px] leading-tight text-slate-900 dark:text-white truncate">
            {app.name}
          </h3>
          {app.safety_status === 'Verified' && <ShieldCheck className="w-4 h-4 shrink-0 text-pink-500" />}
          {app.safety_status === 'Caution' && <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500" />}
          {app.safety_status === 'Unsafe' && <ShieldAlert className="w-4 h-4 shrink-0 text-rose-500" />}
          {app.is_new && <span className="ml-1 shrink-0 inline-block bg-pink-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-tight align-middle -mt-1">New</span>}
        </div>
        <span className="text-[13px] text-slate-600 dark:text-slate-400 mt-0.5 truncate">{app.category}</span>
        <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-0.5">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{app.rating ? app.rating.toFixed(1) : 'N/A'}</span>
        </div>
      </div>
      
      <div className="shrink-0 pl-2">
        <button className="bg-slate-900/5 dark:bg-white/10 hover:bg-slate-900/10 dark:hover:bg-white/20 text-slate-800 dark:text-white px-5 py-[0.35rem] text-sm font-bold rounded-full transition-colors">
          Get
        </button>
      </div>
    </Link>
  );
}
