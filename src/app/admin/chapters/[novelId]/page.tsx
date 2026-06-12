import { novels, chapters } from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ChapterActions from './ChapterActions';

export default async function AdminChaptersPage({ params }) {
  const { novelId } = await params;
  const novel = await novels.getById(novelId);
  if (!novel) notFound();
  const chs = await chapters.listByNovel(novelId);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/admin/novels" className="text-sm text-muted hover:text-accent">← 返回小说列表</Link>
          <h1 className="text-2xl font-bold mt-1">{novel.title} - 章节管理</h1>
        </div>
        <Link href={'/admin/chapters/'+novelId+'/new'} className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors text-sm font-medium">+ 添加章节</Link>
      </div>
      {chs?.length > 0 ? (
        <div className="space-y-2">
          {chs.map(ch => (
            <div key={ch.id} className="flex items-center justify-between p-3 rounded-lg bg-card-bg border border-card-border">
              <Link href={'/read/'+novelId+'/'+ch.id} className="text-sm hover:text-accent transition-colors">
                <span className="text-muted mr-2">第 {ch.chapter_number} 章</span>{ch.title}
              </Link>
              <ChapterActions novelId={novelId} chapterId={ch.id} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted"><p className="mb-4">还没有添加任何章节</p><Link href={'/admin/chapters/'+novelId+'/new'} className="text-accent hover:underline">添加第一章</Link></div>
      )}
    </div>
  );
}
