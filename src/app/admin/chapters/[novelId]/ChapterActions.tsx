'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { HiPencil, HiTrash } from 'react-icons/hi';

export default function ChapterActions({ novelId, chapterId }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("\u786e\u5b9a\u8981\u5220\u9664\u8fd9\u4e2a\u7ae0\u8282\u5417\uff1f")) return;
    const res = await fetch("/api/chapters/" + chapterId, { method: 'DELETE' });
    if (res.ok) { toast.success("\u5df2\u5220\u9664"); router.refresh(); }
    else { toast.error("\u5220\u9664\u5931\u8d25"); }
  };

  return (
    <div className="flex items-center gap-2">
      <Link href={"/admin/chapters/" + novelId + "/" + chapterId + "/edit"} className="p-1.5 rounded hover:bg-card-border transition-colors" title="\u7f16\u8f91">
        <HiPencil className="w-4 h-4" />
      </Link>
      <button onClick={handleDelete} className="p-1.5 rounded hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 transition-colors" title="\u5220\u9664">
        <HiTrash className="w-4 h-4" />
      </button>
    </div>
  );
}
