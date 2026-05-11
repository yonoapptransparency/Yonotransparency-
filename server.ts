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
    
    // In a real app we'd fetch the encrypted payload from Supabase using the 'id'
    // Here we're using a hardcoded placeholder for demonstration
    // We simulate generating a secure 302 redirect here
    const mockSecureUrl = "https://example.com/download.apk";
    
    // Server-side redirect (302) directly to the decrypted raw file payload
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
