import ChapterForm from '../ChapterForm';

export default async function NewChapterPage({ params }: { params: Promise<{ novelId: string }> }) {
  const { novelId } = await params;
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">添加章节</h1>
      <ChapterForm novelId={novelId} />
    </div>
  );
}
