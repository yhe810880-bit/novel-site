'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ChapterForm({ novelId, chapterId = undefined }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", chapter_number: 1 });

  useEffect(() => {
    if (chapterId) {
      fetch("/api/chapters/" + chapterId).then(r => r.json()).then(data => {
        if (data.chapter) setForm({ title: data.chapter.title, content: data.chapter.content, chapter_number: data.chapter.chapter_number });
      });
    } else {
      fetch("/api/chapters?novel_id=" + novelId).then(r => r.json()).then(data => {
        if (data.chapters?.length > 0) {
          const maxNum = Math.max(...data.chapters.map(c => c.chapter_number));
          setForm(prev => ({ ...prev, chapter_number: maxNum + 1 }));
        }
      });
    }
  }, [chapterId, novelId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) { toast.error("\u6807\u9898\u548c\u5185\u5bb9\u4e0d\u80fd\u4e3a\u7a7a"); return; }
    setLoading(true);
    try {
      const url = chapterId ? "/api/chapters/" + chapterId : "/api/chapters";
      const res = await fetch(url, { method: chapterId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, novel_id: novelId }) });
      if (res.ok) {
        toast.success(chapterId ? "\u5df2\u66f4\u65b0" : "\u5df2\u521b\u5efa");
        router.push("/admin/chapters/" + novelId); router.refresh();
      } else { const err = await res.json(); toast.error(err.error || "\u64cd\u4f5c\u5931\u8d25"); }
    } catch { toast.error("\u64cd\u4f5c\u5931\u8d25"); }
    finally { setLoading(false); }
  };

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">\u7ae0\u8282\u6807\u9898 *</label>
          <input name="title" value={form.title} onChange={handleChange} required className="w-full px-3 py-2 rounded-lg border border-card-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/30" placeholder="\u7b2c\u4e00\u7ae0\uff1a..." />
        </div>
        <div className="w-28">
          <label className="block text-sm font-medium mb-1">\u7ae0\u8282\u53f7</label>
          <input name="chapter_number" type="number" value={form.chapter_number} onChange={handleChange} min={1} className="w-full px-3 py-2 rounded-lg border border-card-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/30" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">\u6b63\u6587\u5185\u5bb9 *</label>
        <textarea name="content" value={form.content} onChange={handleChange} rows={20} required className="w-full px-3 py-2 rounded-lg border border-card-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/30 resize-y font-mono text-sm leading-relaxed" placeholder="\u5728\u6b64\u8f93\u5165\u5c0f\u8bf4\u6b63\u6587..." />
        <p className="text-xs text-muted mt-1">\u63d0\u793a\uff1a\u6bcf\u4e2a\u81ea\u7136\u6bb5\u7528\u6362\u884c\u5206\u9694\uff0c\u6bb5\u843d\u4e4b\u95f4\u7a7a\u4e00\u884c</p>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors font-medium disabled:opacity-50">{loading ? "\u4fdd\u5b58\u4e2d..." : chapterId ? "\u4fdd\u5b58\u4fee\u6539" : "\u521b\u5efa\u7ae0\u8282"}</button>
        <button type="button" onClick={() => router.back()} className="px-6 py-2 border border-card-border rounded-lg hover:bg-card-border transition-colors">\u53d6\u6d88</button>
      </div>
    </form>
  );
}
