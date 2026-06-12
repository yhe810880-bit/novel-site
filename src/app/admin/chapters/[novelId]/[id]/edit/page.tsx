import ChapterForm from '../../ChapterForm';

export default async function EditChapterPage({ params }: { params: Promise<{ novelId: string; id: string }> }) {
  const { novelId, id } = await params;
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">编辑章节</h1>
      <ChapterForm novelId={novelId} chapterId={id} />
    </div>
  );
}
