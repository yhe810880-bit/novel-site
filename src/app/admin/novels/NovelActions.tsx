'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { HiPencil, HiTrash, HiDocumentText } from 'react-icons/hi';

export default function NovelActions({ novelId }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("\u786e\u5b9a\u8981\u5220\u9664\u8fd9\u90e8\u5c0f\u8bf4\u5417\uff1f\u6240\u6709\u7ae0\u8282\u4e5f\u5c06\u88ab\u5220\u9664\u3002")) return;
    const res = await fetch("/api/novels/" + novelId, { method: 'DELETE' });
    if (res.ok) { toast.success("\u5df2\u5220\u9664"); router.refresh(); }
    else { toast.error("\u5220\u9664\u5931\u8d25"); }
  };

  return (
    <div className="flex items-center gap-2">
      <Link href={"/admin/novels/" + novelId + "/edit"} className="p-1.5 rounded hover:bg-card-border transition-colors" title="\u7f16\u8f91">
        <HiPencil className="w-4 h-4" />
      </Link>
      <Link href={"/admin/chapters/" + novelId} className="p-1.5 rounded hover:bg-card-border transition-colors" title="\u7ba1\u7406\u7ae0\u8282">
        <HiDocumentText className="w-4 h-4" />
      </Link>
      <button onClick={handleDelete} className="p-1.5 rounded hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 transition-colors" title="\u5220\u9664">
        <HiTrash className="w-4 h-4" />
      </button>
    </div>
  );
}
