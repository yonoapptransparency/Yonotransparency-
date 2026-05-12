import { ShieldCheck, AlertTriangle, ShieldAlert } from 'lucide-react';

interface SecureDownloadButtonProps {
  appId: string;
  status: 'Verified' | 'Caution' | 'Unsafe';
}

export default function SecureDownloadButton({ appId, status }: SecureDownloadButtonProps) {
  const handleDownload = () => {
    // 1. Trigger Mobile Haptics
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
    
    // 2. Redirect to the Masked API
    window.location.href = `/api/secure-download?id=${appId}`;
  };

  return (
    <button 
      onClick={handleDownload}
      className={`w-full sm:w-96 min-h-[64px] font-black py-4 px-10 rounded-full flex items-center justify-center gap-3 transition-all shadow-2xl text-xl shrink-0 active:scale-95 uppercase tracking-tighter
        ${status === 'Verified' ? 'bg-green-600 hover:bg-green-500 text-white shadow-green-600/40 border-b-4 border-green-800' : 
          status === 'Caution' ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-amber-500/40 border-b-4 border-amber-700' : 
          'bg-red-600 hover:bg-red-500 text-white animate-pulse shadow-red-600/40 border-b-4 border-red-800'}`}
    >
      {status === 'Verified' ? (
        <><ShieldCheck className="w-6 h-6 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" /> <span className="text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Secure Download</span></>
      ) : status === 'Caution' ? (
        <><AlertTriangle className="w-6 h-6 text-slate-900 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]" /> <span className="text-slate-900 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">Verify Before Download</span></>
      ) : (
        <><ShieldAlert className="w-6 h-6 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" /> <span className="text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Download Anyway</span></>
      )}
    </button>
  );
}
