import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { AppConfig, GlobalSettings, NewsItem, BlogPost, VideoItem } from '../lib/supabase';

// Providing fallback data immediately helps avoid layout shifts
import { mockApps, mockSettings, mockNews, mockBlogs, mockVideos } from '../lib/supabase';

interface DataContextType {
  apps: AppConfig[];
  settings: GlobalSettings;
  news: NewsItem[];
  blogs: BlogPost[];
  videos: VideoItem[];
  loading: boolean;
  saveApps: (apps: AppConfig[]) => Promise<void>;
  saveSettings: (settings: GlobalSettings) => Promise<void>;
  saveNews: (news: NewsItem[]) => Promise<void>;
  saveBlogs: (blogs: BlogPost[]) => Promise<void>;
  saveVideos: (videos: VideoItem[]) => Promise<void>;
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [apps, setApps] = useState<AppConfig[]>(mockApps);
  const [settings, setSettings] = useState<GlobalSettings>(mockSettings);
  const [news, setNews] = useState<NewsItem[]>(mockNews);
  const [blogs, setBlogs] = useState<BlogPost[]>(mockBlogs);
  const [videos, setVideos] = useState<VideoItem[]>(mockVideos);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We could read/write individual documents, but since the previous code managed whole arrays,
    // we'll store the whole array in a single document for each type for simplicity given the current mockup status.
    const unsubs = [
      onSnapshot(doc(db, 'store_data', 'apps'), (snap) => {
        if (snap.exists()) setApps(snap.data().items || []);
      }, (err) => console.error(err)),
      onSnapshot(doc(db, 'store_data', 'settings'), (snap) => {
        if (snap.exists()) setSettings(snap.data() as GlobalSettings);
      }, (err) => console.error(err)),
      onSnapshot(doc(db, 'store_data', 'news'), (snap) => {
        if (snap.exists()) setNews(snap.data().items || []);
      }, (err) => console.error(err)),
      onSnapshot(doc(db, 'store_data', 'blogs'), (snap) => {
        if (snap.exists()) setBlogs(snap.data().items || []);
      }, (err) => console.error(err)),
      onSnapshot(doc(db, 'store_data', 'videos'), (snap) => {
        if (snap.exists()) setVideos(snap.data().items || []);
      }, (err) => console.error(err))
    ];
    
    // Simulate loading for UI
    setTimeout(() => setLoading(false), 500);

    return () => unsubs.forEach(u => u());
  }, []);

  const saveApps = async (newApps: AppConfig[]) => {
    await setDoc(doc(db, 'store_data', 'apps'), { items: newApps });
  };
  const saveSettings = async (newSettings: GlobalSettings) => {
    await setDoc(doc(db, 'store_data', 'settings'), newSettings);
  };
  const saveNews = async (newNews: NewsItem[]) => {
    await setDoc(doc(db, 'store_data', 'news'), { items: newNews });
  };
  const saveBlogs = async (newBlogs: BlogPost[]) => {
    await setDoc(doc(db, 'store_data', 'blogs'), { items: newBlogs });
  };
  const saveVideos = async (newVideos: VideoItem[]) => {
    await setDoc(doc(db, 'store_data', 'videos'), { items: newVideos });
  };

  return (
    <DataContext.Provider value={{ apps, settings, news, blogs, videos, loading, saveApps, saveSettings, saveNews, saveBlogs, saveVideos }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within DataProvider");
  return context;
};
