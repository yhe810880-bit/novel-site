import NovelForm from '../../NovelForm';

export default async function EditNovelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">编辑小说</h1>
      <NovelForm novelId={id} />
    </div>
  );
}
