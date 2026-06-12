'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { HiSearch } from 'react-icons/hi';

export default function SearchInput({ initialQuery = '' }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push("/search?q=" + encodeURIComponent(trimmed));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="搜索小说标题、作者..."
        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-card-border bg-card-bg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all text-sm"
      />
      <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
    </form>
  );
}
