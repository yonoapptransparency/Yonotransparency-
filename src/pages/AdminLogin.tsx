import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { auth } from '../lib/firebase';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';

export default function AdminLogin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setAuthenticated(true);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (authenticated) {
    return <Navigate to="/admin" />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
      <div className="glass-panel p-10 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-pink-500/20 p-4 rounded-full">
            <Shield className="w-10 h-10 text-pink-400" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center mb-8">Admin Access</h1>
        
        <div className="space-y-6">
          {error && <div className="text-rose-400 text-sm text-center">{error}</div>}
          
          <button 
            onClick={handleLogin}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg transition-all shadow-lg"
          >
            Authenticate with Google
          </button>
        </div>
      </div>
    </div>
  );
}
