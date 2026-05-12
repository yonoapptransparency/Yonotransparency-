import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Placeholder password
      setAuthenticated(true);
    } else {
      setError(true);
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
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Master Password</label>
            <input 
              type="password" 
              required
              className="w-full bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg p-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
            />
          </div>
          
          {error && <div className="text-rose-400 text-sm text-center">Invalid password</div>}
          
          <button 
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg transition-all shadow-lg"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
}
