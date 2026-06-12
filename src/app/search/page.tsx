import { novels } from '@/lib/db';
import SearchInput from '@/components/SearchInput';
import NovelCard from '@/components/NovelCard';

export default async function SearchPage({ searchParams }) {
  const { q, tag, status } = await searchParams;
  const result = await novels.list({ search: q, tag, status });
  const statusLabel = s => s === "ongoing" ? '连载中' : s === "completed" ? '已完结' : '暂停';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">搜索小说</h1>
        <SearchInput initialQuery={q || ''} />
      </div>
      {q && <p className="text-muted mb-6">搜索 "{q}"{tag ? ' 标签:'+tag : ''}{status ? ' 状态:'+statusLabel(status) : ''}，找到 {result.total} 部小说</p>}
      {result.novels?.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {result.novels.map(novel => <NovelCard key={novel.id} novel={novel} />)}
        </div>
      ) : (
        <div className="text-center py-20 text-muted">{q || tag ? '没有找到匹配的小说' : '在上方搜索框输入关键词搜索'}</div>
      )}
    </div>
  );
}
