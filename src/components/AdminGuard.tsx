'use client';

import { useState, useEffect } from 'react';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('admin_token');
    if (token === 'authenticated') {
      setAuthed(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        sessionStorage.setItem('admin_token', 'authenticated');
        setAuthed(true);
      } else {
        setError('密码错误');
      }
    } catch {
      setError('验证失败');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="max-w-sm mx-auto mt-20 p-6 bg-card-bg border border-card-border rounded-xl">
        <h1 className="text-xl font-bold text-center mb-6">管理后台</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">请输入管理密码</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-card-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/30"
              placeholder="输入密码"
              autoFocus
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors font-medium"
          >
            进入管理
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}
