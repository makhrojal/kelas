import React from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { Edit3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Postingan } from '@/src/types';

interface ArticleViewProps {
  article: Postingan;
}

export default function ArticleView({ article }: ArticleViewProps) {
  const isAdmin = localStorage.getItem('admin_session') === 'true';

  const htmlContent = React.useMemo(() => {
    const rawHtml = marked.parse(article.body) as string;
    return DOMPurify.sanitize(rawHtml);
  }, [article.body]);

  return (
    <article className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)]">
          <Link to="/" className="hover:text-[var(--ink)] transition-colors">Home</Link>
          <span className="opacity-30">/</span>
          <Link to={`/kelas/${article.kelasId}`} className="hover:text-[var(--ink)] transition-colors">Kelas</Link>
        </div>

        {isAdmin && (
          <Link 
            to={`/admin?edit=${article.id}`}
            className="text-[11px] font-bold uppercase tracking-widest text-[var(--accent)] hover:opacity-70 transition-opacity flex items-center gap-2"
          >
            <Edit3 size={12} />
            Edit
          </Link>
        )}
      </div>

      <header className="mb-16 space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
          {article.judul}
        </h1>

        <div className="flex items-center gap-6 text-[13px] font-medium text-[var(--ink3)]">
          <span>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('id-ID', { dateStyle: 'long' }) : 'Draft'}</span>
          <span className="w-1 h-1 rounded-full bg-[var(--border)]" />
          <span>{Math.ceil(article.body.length / 1000)} menit baca</span>
        </div>
      </header>

      {article.thumbnail && (
        <div className="mb-16 rounded-3xl overflow-hidden aspect-[16/9]">
          <img 
            src={article.thumbnail} 
            alt={article.judul} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      <div 
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {article.hasKuis && (
        <footer className="mt-24 pt-16 border-t border-[var(--border)]">
          <div className="text-center space-y-8">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold tracking-tight">Siap untuk menguji diri?</h3>
              <p className="text-lg text-[var(--ink2)] opacity-60">Selesaikan kuis singkat untuk memvalidasi pemahaman Anda.</p>
            </div>
            <Link 
              to={`/kuis/${article.kuisId}`}
              className="inline-block bg-[var(--accent)] text-white px-10 py-4 rounded-full font-bold text-base hover:opacity-90 transition-opacity shadow-lg shadow-[var(--accent)]/20"
            >
              Mulai Kuis
            </Link>
          </div>
        </footer>
      )}
    </article>
  );
}
