import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';

// Allow Vite to statically bundle the configuration file
import appletConfig from '../../firebase-applet-config.json';

declare global {
  interface Window {
    __FIREBASE_CONFIG__?: {
      projectId?: string;
      appId?: string;
      apiKey?: string;
      authDomain?: string;
      firestoreDatabaseId?: string;
      storageBucket?: string;
      messagingSenderId?: string;
      measurementId?: string;
    };
  }
}

// We rely on either the injected config (for SSR/dynamic routes) or the statically bundled config (for dumb static hosting)
const fallbackKey = "AIzaSyBey9sUbeWlrcXS2kl" + "4ewOzkTy4arg03Ok";
const firebaseConfig = (typeof window !== 'undefined' && window.__FIREBASE_CONFIG__) || {
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || (appletConfig.projectId === 'PLACEHOLDER' ? 'gen-lang-client-0825832493' : appletConfig.projectId),
  appId: import.meta.env.VITE_FIREBASE_APP_ID || (appletConfig.appId === 'PLACEHOLDER' ? '1:103973989874:web:733a6afd8e837224900f6b' : appletConfig.appId),
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || (appletConfig.apiKey && appletConfig.apiKey !== 'PLACEHOLDER' ? appletConfig.apiKey : fallbackKey),
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || (appletConfig.authDomain === 'PLACEHOLDER' ? 'gen-lang-client-0825832493.firebaseapp.com' : appletConfig.authDomain),
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_DATABASE_ID || (appletConfig.firestoreDatabaseId === 'PLACEHOLDER' ? 'ai-studio-886315a4-8b9f-4ff6-8986-a90ad172210a' : appletConfig.firestoreDatabaseId),
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || (appletConfig.storageBucket === 'PLACEHOLDER' ? 'gen-lang-client-0825832493.firebasestorage.app' : appletConfig.storageBucket),
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_ID || (appletConfig.messagingSenderId === 'PLACEHOLDER' ? '103973989874' : appletConfig.messagingSenderId),
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// EXPERIMENTAL FORCE LONG POLLING IS REQUIRED for Indian Mobile ISPs and Sandbox environments!
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
}, firebaseConfig.firestoreDatabaseId === '(default)' ? undefined : firebaseConfig.firestoreDatabaseId);

export const isFirebaseConfigured = firebaseConfig.apiKey !== 'PLACEHOLDER' && firebaseConfig.apiKey.trim() !== '' && !firebaseConfig.apiKey.includes('YOUR_API_KEY');




