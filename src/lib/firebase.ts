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
const firebaseConfig = (typeof window !== 'undefined' && window.__FIREBASE_CONFIG__) || appletConfig;

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// EXPERIMENTAL FORCE LONG POLLING IS REQUIRED for Indian Mobile ISPs!
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true
}, firebaseConfig.firestoreDatabaseId === '(default)' ? undefined : firebaseConfig.firestoreDatabaseId);

export const isFirebaseConfigured = firebaseConfig.apiKey !== 'PLACEHOLDER' && firebaseConfig.apiKey.trim() !== '' && !firebaseConfig.apiKey.includes('YOUR_API_KEY');




