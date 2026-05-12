import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { mockApps } from '../lib/supabase';
import { ShieldCheck, ShieldAlert, ArrowRight, Star, Sparkles, Info } from 'lucide-react';
import { cn } from '../lib/utils';
import { useEffect } from 'react';

export default function AppDetails() {
  const { slug } = useParams();
  const app = mockApps.find(a => a.slug === slug);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!app) {
    return <Navigate to="/" />;
  }

  const defaultDesc = `Download ${app.name} completely verified for privacy and security. ${app.safety_status} status.`;
  const desc = app.seo_description || defaultDesc;
  const title = app.seo_title || `${app.name} - Verified & Safe`;
  const ogImage = app.og_image_url || app.icon_url;

  const faqSchema = app.faqs && app.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": app.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": app.name,
    "description": app.seo_description || `${app.name} details`,
    "applicationCategory": app.category,
    "operatingSystem": "All",
    "softwareVersion": app.version,
    "image": app.og_image_url || app.icon_url,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto select-none">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={desc} />
        {app.seo_keywords && <meta name="keywords" content={app.seo_keywords} />}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content={ogImage} />
        {app.canonical_url && <link rel="canonical" href={app.canonical_url} />}
        <script type="application/ld+json">
          {JSON.stringify(softwareSchema)}
        </script>
        {faqSchema && (
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        )}
      </Helmet>
      <div className="glass-panel p-6 sm:p-10 mb-8 flex flex-col sm:flex-row gap-8 items-center sm:items-start text-center sm:text-left">
        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden shrink-0 shadow-2xl bg-slate-800 border border-white/10">
          {app.icon_url ? (
            <img src={app.icon_url || undefined} alt={app.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl font-bold bg-slate-800 text-slate-500">
              {app.name.substring(0, 1)}
            </div>
          )}
        </div>
        
        <div className="flex-1 flex flex-col items-center sm:items-start w-full">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight">{app.name}</h1>
            {app.is_new && (
              <div className="px-2 py-1 bg-pink-500/10 border border-pink-500/30 text-pink-600 dark:text-pink-400 text-xs font-bold rounded-lg flex items-center gap-1 animate-pulse">
                <Sparkles className="w-3 h-3" /> Recently Added
              </div>
            )}
            <div className={cn(
              "px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5 shadow-lg",
              app.safety_status === 'Verified' ? "bg-pink-500/20 text-pink-400 border border-pink-500/30" : 
              app.safety_status === 'Caution' ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : 
              "bg-rose-500/20 text-rose-400 border border-rose-500/30"
            )}>
              {app.safety_status === 'Verified' && <ShieldCheck className="w-3.5 h-3.5" />}
              {(app.safety_status === 'Caution' || app.safety_status === 'Unsafe') && <ShieldAlert className="w-3.5 h-3.5" />}
              {app.safety_status}
            </div>
          </div>
          
          <div className="text-slate-400 text-lg mb-6">{app.developer}</div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full mb-8">
            <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
              <div className="text-slate-500 text-xs mb-1">Version</div>
              <div className="font-semibold">{app.version}</div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
              <div className="text-slate-500 text-xs mb-1">Size</div>
              <div className="font-semibold">{app.file_size}</div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
              <div className="text-slate-500 text-xs mb-1">Category</div>
              <div className="font-semibold">{app.category}</div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
              <div className="text-slate-500 text-xs mb-1">Rating</div>
              <div className="font-semibold flex items-center justify-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {app.rating ? app.rating.toFixed(1) : 'N/A'}
              </div>
            </div>
          </div>

          <Link 
            to={`/download/${app.slug}`} 
            className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600 text-white font-semibold py-4 px-8 rounded-full flex items-center justify-center gap-2 transition-all shadow-lg shadow-pink-500/20"
          >
            Proceed to Download Page <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
      
      {app.screenshots && app.screenshots.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">Screenshots</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
            {app.screenshots.filter(Boolean).map((img, i) => (
              <img 
                key={i} 
                src={img} 
                alt={`${app.name} screenshot ${i + 1}`} 
                className="h-64 sm:h-80 w-auto object-cover rounded-xl border border-white/10 snap-center shadow-lg pointer-events-none"
              />
            ))}
          </div>
        </div>
      )}
      {app.faqs && app.faqs.length > 0 && (
        <div className="mb-12 max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Info className="w-5 h-5 text-pink-500" /> Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {app.faqs.map((faq, idx) => (
              <details key={idx} className="group bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl overflow-hidden pointer-events-auto">
                <summary className="font-semibold p-4 cursor-pointer select-none flex items-center justify-between text-slate-800 dark:text-white group-open:text-pink-600 dark:group-open:text-pink-400 min-h-[48px]">
                  {faq.question}
                  <span className="text-2xl leading-none transition-transform group-open:rotate-45 ml-4">+</span>
                </summary>
                <div 
                  className="px-4 pb-4 pt-2 text-slate-600 dark:text-slate-300 prose prose-sm prose-slate dark:prose-invert max-w-none text-left"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </details>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
