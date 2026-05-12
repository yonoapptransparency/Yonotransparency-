import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import crypto from "crypto";

// Secret key for AES-256-CBC encryption
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex');
const IV_LENGTH = 16; 

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // API Route: Secure Link
  app.get("/api/secure-download", (req, res) => {
    const { id } = req.query;
    if (!id || typeof id !== 'string') {
      res.status(400).json({ error: 'Access Denied: Missing App ID' });
      return;
    }

    // Since we don't have a real database setup, we need a way to mock fetching it
    // In actual production, this would do a server-side DB query to get encrypted_download_url
    // Read the mockapps from localStorage or just use a fallback mock here
    // For the preview, we'll redirect them to a mock download endpoint
    const mockSecureUrl = `https://example.com/download-secure?fileId=${id}&token=${crypto.randomBytes(16).toString('hex')}`;
    
    // Server-side redirect (302) masks the real URL from the browser history
    res.set('Cache-Control', 'no-store, max-age=0');
    res.redirect(302, mockSecureUrl);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static files
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
