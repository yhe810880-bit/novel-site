'use client';

import Link from 'next/link';
import { useState } from 'react';
import { HiMenu, HiX, HiSun, HiMoon } from 'react-icons/hi';
import { useTheme } from '@/components/ThemeProvider';

export default function Reader({ novelId, novelTitle, chapter, prevChapter, nextChapter, allChapters }) {
  const [fontSize, setFontSize] = useState(18);
  const { theme, toggleTheme } = useTheme();
  const [showToc, setShowToc] = useState(false);

  function makeUrl(chId) { return '/read/' + novelId + '/' + chId; }

  return (
    <div className="min-h-screen bg-reader-bg relative">
      <div className="sticky top-0 z-40 bg-nav-bg/95 backdrop-blur-sm border-b border-card-border">
        <div className="max-w-4xl mx-auto px-4 h-12 flex items-center justify-between">
          <Link href={'/novel/' + novelId} className="text-sm text-muted hover:text-accent transition-colors">\u2190 \u8fd4\u56de</Link>
          <span className="text-sm font-medium truncate mx-4">{chapter.title}</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowToc(!showToc)} className="p-1.5 rounded hover:bg-card-border transition-colors"><HiMenu className="w-5 h-5" /></button>
            <button onClick={() => setFontSize(s => Math.max(14, s - 1))} className="p-1.5 rounded hover:bg-card-border transition-colors text-sm" title="\u7f29\u5c0f">A-</button>
            <button onClick={() => setFontSize(s => Math.min(32, s + 1))} className="p-1.5 rounded hover:bg-card-border transition-colors text-sm" title="\u653e\u5927">A+</button>
            <button onClick={toggleTheme} className="p-1.5 rounded hover:bg-card-border transition-colors">{theme === 'dark' ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}</button>
          </div>
        </div>
      </div>
      {showToc && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowToc(false)} />
          <div className="relative z-10 w-72 max-w-[80vw] bg-card-bg h-full overflow-y-auto shadow-lg">
            <div className="p-4 border-b border-card-border flex items-center justify-between">
              <h3 className="font-semibold">{novelTitle}</h3>
              <button onClick={() => setShowToc(false)}><HiX className="w-5 h-5" /></button>
            </div>
            <div className="p-2">
              {allChapters.map(ch => (
                <Link key={ch.id} href={makeUrl(ch.id)} onClick={() => setShowToc(false)}
                  className={'block px-3 py-2 rounded-lg text-sm transition-colors ' + (ch.id === chapter.id ? 'bg-accent/10 text-accent font-medium' : 'hover:bg-card-border')}>
                  {ch.chapter_number}. {ch.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="max-w-3xl mx-auto px-6 py-8 md:py-12">
        <h1 className="text-2xl font-bold text-center mb-8">{chapter.title}</h1>
        <div className="leading-relaxed space-y-4 reader-content" style={{ fontSize: fontSize + 'px', lineHeight: '2' }}>
          {chapter.content.split('\n').map((paragraph, i) => (
            <p key={i} className="text-justify indent-8">{paragraph || '\u00A0'}</p>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-card-border flex items-center justify-between gap-4">
          {prevChapter ? <Link href={makeUrl(prevChapter.id)} className="px-4 py-2 rounded-lg bg-card-bg border border-card-border hover:border-accent/30 transition-colors text-sm">\u2190 \u4e0a\u4e00\u7ae0</Link> : <div />}
          {nextChapter ? <Link href={makeUrl(nextChapter.id)} className="px-4 py-2 rounded-lg bg-card-bg border border-card-border hover:border-accent/30 transition-colors text-sm">\u4e0b\u4e00\u7ae0 \u2192</Link> : <div />}
        </div>
      </div>
    </div>
  );
}
