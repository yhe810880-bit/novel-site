import { novels, chapters } from '@/lib/db';
import Link from 'next/link';
import { HiBookOpen, HiDocumentText, HiPencil, HiPlus } from 'react-icons/hi';

export default async function AdminDashboard() {
  const { novels: list, total } = await novels.list({ limit: 1 });
  const allNovels = (await novels.list({ limit: 999 })).novels;
  const novelCount = total;
  const chapterCount = 0; // We'll get this from the first novel for display
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">管理后台</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="p-6 bg-card-bg border border-card-border rounded-xl">
          <HiBookOpen className="w-8 h-8 text-accent mb-2" />
          <p className="text-3xl font-bold">{novelCount}</p>
          <p className="text-sm text-muted">小说总数</p>
        </div>
        <div className="p-6 bg-card-bg border border-card-border rounded-xl">
          <HiDocumentText className="w-8 h-8 text-blue-500 mb-2" />
          <p className="text-3xl font-bold">-</p>
          <p className="text-sm text-muted">章节总数</p>
        </div>
        <div className="p-6 bg-card-bg border border-card-border rounded-xl">
          <HiPencil className="w-8 h-8 text-green-500 mb-2" />
          <p className="text-3xl font-bold">{allNovels.length}</p>
          <p className="text-sm text-muted">最近更新</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <Link href="/admin/novels/new" className="flex items-center gap-4 p-4 bg-card-bg border border-card-border rounded-xl hover:border-accent/30 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center"><HiPlus className="w-5 h-5 text-accent" /></div>
          <div><p className="font-medium">添加新小说</p><p className="text-sm text-muted">创建一部新的小说</p></div>
        </Link>
        <Link href="/admin/novels" className="flex items-center gap-4 p-4 bg-card-bg border border-card-border rounded-xl hover:border-accent/30 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center"><HiBookOpen className="w-5 h-5 text-blue-500" /></div>
          <div><p className="font-medium">管理小说</p><p className="text-sm text-muted">编辑或删除已有小说</p></div>
        </Link>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-4">最新小说</h2>
        {allNovels.length > 0 ? (
          <div className="space-y-2">
            {allNovels.slice(0, 5).map(novel => (
              <Link key={novel.id} href={'/admin/chapters/'+novel.id} className="flex items-center justify-between p-3 rounded-lg bg-card-bg border border-card-border hover:border-accent/30 transition-colors">
                <span className="text-sm font-medium">{novel.title}</span>
                <span className="text-xs text-muted">管理章节 →</span>
              </Link>
            ))}
          </div>
        ) : <p className="text-muted text-sm">还没有小说，去添加一本吧</p>}
      </div>
    </div>
  );
}
