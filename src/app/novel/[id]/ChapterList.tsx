'use client';

import Link from 'next/link';
import { useState } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';

export default function ChapterList({ novelId, chapters }) {
  const [showAll, setShowAll] = useState(false);
  const displayChapters = showAll ? chapters : chapters.slice(0, 20);

  if (chapters.length === 0) {
    return <div className="text-center py-10 text-muted"><p>\u6682\u65e0\u7ae0\u8282</p></div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">\u7ae0\u8282\u5217\u8868\uff08\u5171 {chapters.length} \u7ae0\uff09</h2>
      <div className="grid gap-2">
        {displayChapters.map(ch => (
          <Link key={ch.id} href={"/read/" + novelId + "/" + ch.id}
            className="flex items-center justify-between px-4 py-3 rounded-lg bg-card-bg border border-card-border hover:border-accent/30 hover:bg-accent/5 transition-colors">
            <span className="text-sm"><span className="text-muted mr-2">\u7b2c {ch.chapter_number} \u7ae0</span>{ch.title}</span>
            <span className="text-xs text-muted">{new Date(ch.created_at).toLocaleDateString('zh-CN')}</span>
          </Link>
        ))}
      </div>
      {chapters.length > 20 && (
        <button onClick={() => setShowAll(!showAll)}
          className="mt-4 w-full py-2 flex items-center justify-center gap-1 text-sm text-accent hover:bg-accent/5 rounded-lg transition-colors">
          {showAll ? <>[\u6536\u8d77] <HiChevronUp /></> : <>[\u5c55\u5f00\u5168\u90e8 {chapters.length - 20} \u7ae0] <HiChevronDown /></>}
        </button>
      )}
    </div>
  );
}
