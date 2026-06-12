import { novels } from '@/lib/db';
import NovelCard from '@/components/NovelCard';
import SearchInput from '@/components/SearchInput';

export default async function HomePage() {
  const { novels: list } = await novels.list({ limit: 24 });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">书香阁</h1>
        <p className="text-muted mb-6">一个简洁优雅的个人小说阅读站</p>
        <div className="flex justify-center"><SearchInput /></div>
      </div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">{list?.length > 0 ? '最近更新' : '还没有小说'}</h2>
        {list?.length > 0 && <span className="text-sm text-muted">共 {list.length} 部</span>}
      </div>
      {list?.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {list.map(novel => <NovelCard key={novel.id} novel={novel} />)}
        </div>
      ) : (
        <div className="text-center py-20 text-muted">
          <p className="text-lg mb-4">还没有收录任何小说</p>
          <a href="/admin" className="text-accent hover:underline">前往管理后台添加</a>
        </div>
      )}
    </div>
  );
}
