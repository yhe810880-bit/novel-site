'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function NovelForm({ novelId = undefined }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: "", author: "", description: "", cover_url: "", tags: "", status: "ongoing" });

  useEffect(() => {
    if (novelId) {
      fetch("/api/novels/" + novelId).then(r => r.json()).then(data => {
        if (data.novel) {
          setForm({
            title: data.novel.title, author: data.novel.author, description: data.novel.description,
            cover_url: data.novel.cover_url, tags: (data.novel.tags || []).join(", "), status: data.novel.status,
          });
        }
      });
    }
  }, [novelId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = novelId ? "/api/novels/" + novelId : "/api/novels";
      const res = await fetch(url, { method: novelId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) {
        toast.success(novelId ? "\u5df2\u66f4\u65b0" : "\u5df2\u521b\u5efa");
        router.push("/admin/novels"); router.refresh();
      } else {
        const err = await res.json(); toast.error(err.error || "\u64cd\u4f5c\u5931\u8d25");
      }
    } catch { toast.error("\u64cd\u4f5c\u5931\u8d25"); }
    finally { setLoading(false); }
  };

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <div><label className="block text-sm font-medium mb-1">\u5c0f\u8bf4\u6807\u9898 *</label><input name="title" value={form.title} onChange={handleChange} required className="w-full px-3 py-2 rounded-lg border border-card-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/30" placeholder="\u8f93\u5165\u5c0f\u8bf4\u6807\u9898" /></div>
      <div><label className="block text-sm font-medium mb-1">\u4f5c\u8005</label><input name="author" value={form.author} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-card-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/30" placeholder="\u4f5c\u8005\u540d" /></div>
      <div><label className="block text-sm font-medium mb-1">\u5c01\u9762\u56fe\u7247 URL</label><input name="cover_url" value={form.cover_url} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-card-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/30" placeholder="https://..." /></div>
      <div><label className="block text-sm font-medium mb-1">\u6807\u7b7e\uff08\u9017\u53f7\u5206\u9694\uff09</label><input name="tags" value={form.tags} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-card-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/30" placeholder="\u7384\u5e7b, \u4ed9\u4fa0, \u90fd\u5e02" /></div>
      <div><label className="block text-sm font-medium mb-1">\u72b6\u6001</label>
        <select name="status" value={form.status} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-card-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/30">
          <option value="ongoing">\u8fde\u8f7d\u4e2d</option><option value="completed">\u5df2\u5b8c\u7ed3</option><option value="hiatus">\u6682\u505c</option>
        </select>
      </div>
      <div><label className="block text-sm font-medium mb-1">\u7b80\u4ecb</label><textarea name="description" value={form.description} onChange={handleChange} rows={5} className="w-full px-3 py-2 rounded-lg border border-card-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/30 resize-y" placeholder="\u5c0f\u8bf4\u7b80\u4ecb..." /></div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors font-medium disabled:opacity-50">{loading ? "\u4fdd\u5b58\u4e2d..." : novelId ? "\u4fdd\u5b58\u4fee\u6539" : "\u521b\u5efa\u5c0f\u8bf4"}</button>
        <button type="button" onClick={() => router.back()} className="px-6 py-2 border border-card-border rounded-lg hover:bg-card-border transition-colors">\u53d6\u6d88</button>
      </div>
    </form>
  );
}
