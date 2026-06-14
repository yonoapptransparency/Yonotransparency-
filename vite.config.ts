import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, loadEnv, Plugin} from 'vite';

function fallbackFirebaseConfig(): Plugin {
  return {
    name: 'fallback-firebase-config',
    resolveId(id) {
      if (id.endsWith('firebase-applet-config.json')) {
        const filePath = path.resolve(__dirname, 'firebase-applet-config.json');
        if (!fs.existsSync(filePath)) {
          return id;
        }
      }
    },
    load(id) {
      if (id.endsWith('firebase-applet-config.json')) {
        const filePath = path.resolve(__dirname, 'firebase-applet-config.json');
        if (!fs.existsSync(filePath)) {
          return `export default {
            apiKey: import.meta.env?.VITE_FIREBASE_API_KEY || "",
            authDomain: import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN || "",
            projectId: import.meta.env?.VITE_FIREBASE_PROJECT_ID || "",
            storageBucket: import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET || "",
            messagingSenderId: import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
            appId: import.meta.env?.VITE_FIREBASE_APP_ID || "",
            firestoreDatabaseId: import.meta.env?.VITE_FIREBASE_DATABASE_ID || "(default)"
          };`
        }
      }
    }
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), fallbackFirebaseConfig()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
