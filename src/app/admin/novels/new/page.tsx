import NovelForm from '../NovelForm';

export default function NewNovelPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">添加新小说</h1>
      <NovelForm />
    </div>
  );
}
