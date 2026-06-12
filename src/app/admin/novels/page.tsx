import { novels } from '@/lib/db';
import Link from 'next/link';
import NovelActions from './NovelActions';

const statusMap = { ongoing: '连载中', completed: '已完结', hiatus: '暂停' };

export default async function AdminNovelsPage() {
  const { novels: list } = await novels.list({ limit: 999 });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">小说管理</h1>
        <Link href="/admin/novels/new" className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors text-sm font-medium">+ 添加小说</Link>
      </div>
      {list?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-card-border text-left text-muted">
                <th className="pb-3 font-medium">标题</th><th className="pb-3 font-medium hidden md:table-cell">作者</th>
                <th className="pb-3 font-medium hidden sm:table-cell">状态</th><th className="pb-3 font-medium hidden lg:table-cell">标签</th>
                <th className="pb-3 font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {list.map(novel => (
                <tr key={novel.id} className="border-b border-card-border/50">
                  <td className="py-3 pr-4"><Link href={'/novel/'+novel.id} className="font-medium hover:text-accent transition-colors">{novel.title}</Link></td>
                  <td className="py-3 pr-4 text-muted hidden md:table-cell">{novel.author || '-'}</td>
                  <td className="py-3 pr-4 hidden sm:table-cell">
                    <span className={'text-xs px-2 py-0.5 rounded-full '+(novel.status==='ongoing'?'bg-green-500/10 text-green-600 dark:text-green-400':novel.status==='completed'?'bg-blue-500/10 text-blue-600 dark:text-blue-400':'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400')}>{statusMap[novel.status]}</span>
                  </td>
                  <td className="py-3 pr-4 hidden lg:table-cell"><div className="flex flex-wrap gap-1">{(novel.tags||[]).slice(0,3).map(t => <span key={t} className="text-xs px-1.5 py-0.5 bg-accent/10 text-accent rounded">{t}</span>)}</div></td>
                  <td className="py-3"><NovelActions novelId={novel.id} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-20 text-muted"><p className="mb-4">还没有添加任何小说</p><Link href="/admin/novels/new" className="text-accent hover:underline">添加第一部小说</Link></div>
      )}
    </div>
  );
}
