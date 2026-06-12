import { novels, chapters } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ChapterList from './ChapterList';

const statusMap = { ongoing: '连载中', completed: '已完结', hiatus: '暂停' };
const statusColors = { ongoing: 'text-green-600 dark:text-green-400', completed: 'text-blue-600 dark:text-blue-400', hiatus: 'text-yellow-600 dark:text-yellow-400' };

export default async function NovelDetailPage({ params }) {
  const { id } = await params;
  const novel = await novels.getById(id);
  if (!novel) notFound();
  const chs = await chapters.listByNovel(id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6 mb-10">
        <div className="w-48 h-64 shrink-0 mx-auto md:mx-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-xl overflow-hidden shadow-md">
          {novel.cover_url ? <img src={novel.cover_url} alt={novel.title} className="w-full h-full object-cover" />
          : <div className="w-full h-full flex items-center justify-center"><span className="text-5xl font-bold text-gray-400 dark:text-gray-500">{novel.title.slice(0, 4)}</span></div>}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{novel.title}</h1>
          <p className="text-muted mb-1">作者：{novel.author || '未知'}</p>
          <p className="text-sm mb-3">状态：<span className={statusColors[novel.status]}>{statusMap[novel.status]}</span></p>
          {novel.tags?.length > 0 && <div className="flex flex-wrap gap-2 mb-4">
            {novel.tags.map(tag => <Link key={tag} href={'/search?tag='+encodeURIComponent(tag)} className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full hover:bg-accent/20 transition-colors">{tag}</Link>)}
          </div>}
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{novel.description || '暂无简介'}</p>
        </div>
      </div>
      <ChapterList novelId={novel.id} chapters={chs} />
    </div>
  );
}
