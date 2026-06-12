'use client';

import Link from 'next/link';
import { Novel } from '@/lib/types';

const statusMap: Record<string, string> = {
  ongoing: '连载中',
  completed: '已完结',
  hiatus: '暂停',
};

const statusColors: Record<string, string> = {
  ongoing: 'bg-green-500',
  completed: 'bg-blue-500',
  hiatus: 'bg-yellow-500',
};

export default function NovelCard({ novel }: { novel: Novel }) {
  return (
    <Link
      href={'/novel/' + novel.id}
      className='group block bg-card-bg border border-card-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1'
    >
      <div className='aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 relative overflow-hidden'>
        {novel.cover_url ? (
          <img src={novel.cover_url} alt={novel.title} className='w-full h-full object-cover' loading='lazy' />
        ) : (
          <div className='w-full h-full flex items-center justify-center p-4'>
            <span className='text-4xl font-bold text-gray-400 dark:text-gray-500 text-center break-all line-clamp-3'>
              {novel.title.slice(0, 6)}
            </span>
          </div>
        )}
        <span className={'absolute top-2 right-2 ' + statusColors[novel.status] + ' text-white text-xs px-2 py-0.5 rounded-full'}>
          {statusMap[novel.status] || novel.status}
        </span>
      </div>
      <div className='p-3'>
        <h3 className='font-semibold text-sm line-clamp-1 group-hover:text-accent transition-colors'>{novel.title}</h3>
        <p className='text-xs text-muted mt-1 line-clamp-1'>{novel.author || '未知作者'}</p>
        {novel.tags && novel.tags.length > 0 && (
          <div className='flex flex-wrap gap-1 mt-2'>
            {novel.tags.slice(0, 3).map(tag => (
              <span key={tag} className='text-xs px-1.5 py-0.5 bg-accent/10 text-accent rounded'>{tag}</span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
