import { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { mockApps, mockSettings } from '../lib/supabase';
import { Search, ShieldAlert, ShieldCheck, Sparkles, ArrowRight, TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';
import { FlipkartBanner, PlayStoreTabs, TopChartItem, AppListItem } from '../components/PlayStoreUI';

export default function Home() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || mockSettings.categories?.[0] || 'All Apps');
  const [apps, setApps] = useState(mockApps);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    } else {
      setActiveTab(mockSettings.categories?.[0] || 'All Apps');
    }
  }, [searchParams, location]);

  useEffect(() => {
    const handleStorageChange = () => {
      const savedApps = localStorage.getItem('yonostore_apps');
      if (savedApps) setApps(JSON.parse(savedApps));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const triggerHaptic = () => {
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(20);
    }
  };

  const filteredApps = apps
    .filter(app => app.name.toLowerCase().includes(searchTerm.toLowerCase()) || app.category.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => a.serial_number - b.serial_number);

  const bannerItems = mockSettings.banners || [];

  return (
    <div className="select-none min-h-screen">
      <Helmet>
        <title>{mockSettings.site_title}</title>
        <meta name="description" content={mockSettings.meta_description} />
      </Helmet>
      {/* Search Header Style */}
      <div className="mb-6 px-1">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-3 bg-slate-100 dark:bg-white/5 border border-transparent dark:border-white/5 rounded-full text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500/30 transition-all"
            placeholder="Search apps & games"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <PlayStoreTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      {!searchTerm && activeTab.toLowerCase() !== 'categories' && activeTab.toLowerCase() !== 'top charts' && (
        <FlipkartBanner items={bannerItems} />
      )}

      {activeTab.toLowerCase() === 'top charts' && (
        <div className="space-y-2 animate-fade-in">
          <div className="bg-pink-500/10 p-4 rounded-2xl mb-6 flex items-center justify-between border border-pink-500/20">
            <div className="flex items-center gap-3">
              <div className="bg-pink-500 p-2 rounded-lg text-white">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-pink-800 dark:text-pink-300">Trending Now</h3>
                <p className="text-xs text-pink-600 dark:text-pink-400">Apps with highest growth this week</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-2 mb-4">
             <div className="flex gap-2">
                <button className="bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 px-4 py-1.5 rounded-full text-xs font-bold border border-pink-200 dark:border-pink-800">Top free</button>
             </div>
          </div>

          <div className="space-y-1">
            {filteredApps.map((app, index) => (
              <TopChartItem key={app.id} rank={index + 1} app={app} />
            ))}
          </div>
        </div>
      )}

      {(() => {
        const isHomeTab = activeTab.toLowerCase() === (mockSettings.categories?.[0]?.toLowerCase() || 'all apps') || activeTab.toLowerCase() === 'all apps' || activeTab.toLowerCase() === 'home' || activeTab.toLowerCase() === 'apps';
        return isHomeTab && (
        <div className="animate-fade-in">
          <h2 className="text-lg font-bold mb-4 px-2 mt-4">New Applications</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 px-1 mb-8">
            {filteredApps.filter(app => app.is_new).map((app) => (
              <Link key={app.id} to={`/app/${app.slug}`} className="flex flex-col gap-2 group">
                <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm relative">
                  <img src={app.icon_url || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=128&h=128&fit=crop"} alt={app.name} className="w-full h-full object-cover group-active:scale-95 transition-transform" />
                  {app.is_new && (
                    <span className="absolute top-1 right-1 bg-pink-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-tight shadow-sm z-10">New</span>
                  )}
                </div>
                <div className="px-1 mt-1">
                  <h3 className="text-[13px] leading-tight font-bold truncate text-slate-900 dark:text-white">{app.name}</h3>
                  <div className="text-[11px] text-slate-500 truncate">{app.category}</div>
                </div>
              </Link>
            ))}
            {filteredApps.filter(app => app.is_new).length === 0 && (
               <div className="col-span-full text-center py-6 text-slate-400 text-sm">No new apps recently added.</div>
            )}
          </div>

          <h2 className="text-lg font-bold mt-4 mb-4 px-2">All Applications</h2>
          <div className="space-y-2">
            {filteredApps.map((app, index) => (
               <AppListItem key={app.id} app={app} index={index + 1} />
            ))}
          </div>
        </div>
        );
      })()}

      {activeTab.toLowerCase() === 'categories' && (
        <div className="grid grid-cols-2 gap-4 animate-fade-in">
           {mockSettings.categories?.filter(c => c.toLowerCase() !== (mockSettings.categories?.[0]?.toLowerCase() || 'all apps') && c.toLowerCase() !== 'top charts' && c.toLowerCase() !== 'categories').map((cat) => (
             <button key={cat} onClick={() => setActiveTab(cat)} className="flex items-center gap-4 p-6 glass-panel text-left active:scale-[0.98] transition-transform">
                <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500">
                   <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="font-bold">{cat}</span>
             </button>
           ))}
        </div>
      )}

      {(() => {
        const isHomeTab = activeTab.toLowerCase() === (mockSettings.categories?.[0]?.toLowerCase() || 'all apps') || activeTab.toLowerCase() === 'all apps' || activeTab.toLowerCase() === 'home' || activeTab.toLowerCase() === 'apps';
        const isExcluded = isHomeTab || activeTab.toLowerCase() === 'top charts' || activeTab.toLowerCase() === 'categories';
        
        return !isExcluded && (
        <div className="animate-fade-in space-y-2 px-1">
          {(() => {
            const currentTabLower = activeTab.toLowerCase().trim();
            const tabApps = filteredApps.filter(app => {
              if (searchTerm) return true;
              const appCategories = app.category ? app.category.toLowerCase().split(',').map(c => c.trim()) : [];
              return appCategories.some(cat => cat === currentTabLower || cat.includes(currentTabLower) || currentTabLower.includes(cat));
            });
            return tabApps.length > 0 ? (
              tabApps.map((app, index) => <AppListItem key={app.id} app={app} index={index + 1} />)
            ) : (
              <div className="text-center py-20 text-slate-400">
                <p className="text-lg">No apps found in {activeTab}</p>
              </div>
            );
          })()}
        </div>
        );
      })()}

      {filteredApps.length === 0 && searchTerm && (
        <div className="text-center py-20 text-slate-400">
          <p className="text-lg">No results found for "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
}
