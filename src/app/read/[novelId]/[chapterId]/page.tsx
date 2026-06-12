import { novels, chapters as chs } from '@/lib/db';
import { notFound } from 'next/navigation';
import Reader from './Reader';

export default async function ReadPage({ params }) {
  const { novelId, chapterId } = await params;
  const novel = await novels.getById(novelId);
  if (!novel) notFound();
  const chapter = await chs.getById(chapterId);
  if (!chapter) notFound();
  const allChapters = await chs.listByNovel(novelId);
  const idx = allChapters.findIndex(c => c.id === chapterId);
  const prev = idx > 0 ? allChapters[idx-1] : null;
  const next = idx >= 0 && idx < allChapters.length-1 ? allChapters[idx+1] : null;

  return <Reader novelId={novelId} novelTitle={novel.title} chapter={chapter} prevChapter={prev} nextChapter={next} allChapters={allChapters} />;
}
