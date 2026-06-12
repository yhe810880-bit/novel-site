import { createClient } from '@libsql/client';
import path from 'path';
import fs from 'fs';

let db: ReturnType<typeof createClient>;
let dbInit: Promise<void>;

async function ensureDb() {
  if (!dbInit) {
    dbInit = (async () => {
      const tursoUrl = process.env.TURSO_DB_URL;
      const tursoToken = process.env.TURSO_DB_TOKEN;
      if (tursoUrl && tursoToken) {
        db = createClient({ url: tursoUrl, authToken: tursoToken });
      } else {
        const dataDir = path.join(process.cwd(), 'data');
        if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
        db = createClient({ url: 'file:' + path.join(dataDir, 'novels.db') });
      }
      await db.execute('PRAGMA journal_mode=WAL;');
      await db.execute('PRAGMA busy_timeout=5000;');
      const schemaPath = path.join(process.cwd(), 'data', 'schema.sql');
      const schema = fs.readFileSync(schemaPath, 'utf-8');
      const statements = schema.split(';').filter(s => s.trim());
      for (const stmt of statements) {
        await db.execute(stmt.trim() + ';');
      }
    })();
  }
  await dbInit;
  return db;
}

function fixTags(row) {
  if (!row) return row;
  const r = { ...row };
  try { r.tags = JSON.parse(r.tags); } catch { r.tags = []; }
  return r;
}

export const novels = {
  async list(opts: any = {}) {
    const d = await ensureDb();
    const conds = []; const params = [];
    if (opts.search) { conds.push('(title LIKE ? OR author LIKE ?)'); params.push('%' + opts.search + '%', '%' + opts.search + '%'); }
    if (opts.status) { conds.push('status = ?'); params.push(opts.status); }
    if (opts.tag) { conds.push('tags LIKE ?'); params.push('%"' + opts.tag + '"%'); }
    const where = conds.length ? 'WHERE ' + conds.join(' AND ') : '';
    const page = opts.page || 1; const limit = opts.limit || 50; const off = (page - 1) * limit;
    const cnt = await d.execute('SELECT COUNT(*) as c FROM novels ' + where, params);
    const total = Number(cnt.rows[0]?.c || 0);
    const res = await d.execute('SELECT * FROM novels ' + where + ' ORDER BY updated_at DESC LIMIT ? OFFSET ?', [...params, limit, off]);
    return { novels: res.rows.map(fixTags), total, page, limit };
  },
  async getById(id: any) {
    const d = await ensureDb();
    const res = await d.execute('SELECT * FROM novels WHERE id = ?', [id]);
    return fixTags(res.rows[0]) || null;
  },
  async create(data: any) {
    const d = await ensureDb();
    const id = crypto.randomUUID(); const now = new Date().toISOString();
    await d.execute('INSERT INTO novels (id,title,author,description,cover_url,tags,status,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?)',
      [id, data.title, data.author || '', data.description || '', data.cover_url || '', JSON.stringify(data.tags || []), data.status || 'ongoing', now, now]);
    const res = await d.execute('SELECT * FROM novels WHERE id = ?', [id]);
    return fixTags(res.rows[0]);
  },
  async update(id: any, data: any) {
    const d = await ensureDb();
    const fields = []; const params = [];
    for (const k of ['title','author','description','cover_url','status']) { if (data[k] !== undefined) { fields.push(k + '=?'); params.push(data[k]); } }
    if (data.tags !== undefined) { fields.push('tags=?'); params.push(JSON.stringify(data.tags.split(',').map(t => t.trim()).filter(Boolean))); }
    fields.push('updated_at=?'); params.push(new Date().toISOString()); params.push(id);
    await d.execute('UPDATE novels SET ' + fields.join(',') + ' WHERE id=?', params);
    const res = await d.execute('SELECT * FROM novels WHERE id = ?', [id]);
    return fixTags(res.rows[0]);
  },
  async delete(id: any) {
    const d = await ensureDb();
    await d.execute('DELETE FROM chapters WHERE novel_id=?', [id]);
    await d.execute('DELETE FROM novels WHERE id=?', [id]);
  }
};

export const chapters = {
  async listByNovel(novelId: any) {
    const d = await ensureDb();
    const res = await d.execute('SELECT id,title,chapter_number,created_at FROM chapters WHERE novel_id=? ORDER BY chapter_number ASC', [novelId]);
    return res.rows.map(r => ({ id: String(r.id), title: String(r.title), chapter_number: Number(r.chapter_number), created_at: String(r.created_at) }));
  },
  async getById(id: any) {
    const d = await ensureDb();
    const res = await d.execute('SELECT * FROM chapters WHERE id=?', [id]);
    const r = res.rows[0]; if (r) { r.id = String(r.id); r.novel_id = String(r.novel_id); }
    return r || null;
  },
  async create(data: any) {
    const d = await ensureDb();
    const id = crypto.randomUUID(); const now = new Date().toISOString();
    await d.execute('INSERT INTO chapters (id,novel_id,title,content,chapter_number,created_at,updated_at) VALUES (?,?,?,?,?,?,?)',
      [id, data.novel_id, data.title, data.content, data.chapter_number, now, now]);
    await d.execute('UPDATE novels SET updated_at=? WHERE id=?', [now, data.novel_id]);
    const res = await d.execute('SELECT * FROM chapters WHERE id=?', [id]);
    const r = res.rows[0]; if (r) { r.id = String(r.id); r.novel_id = String(r.novel_id); }
    return r;
  },
  async update(id: any, data: any) {
    const d = await ensureDb();
    const fields = []; const params = [];
    for (const k of ['title','content','chapter_number']) { if (data[k] !== undefined) { fields.push(k + '=?'); params.push(data[k]); } }
    fields.push('updated_at=?'); params.push(new Date().toISOString()); params.push(id);
    await d.execute('UPDATE chapters SET ' + fields.join(',') + ' WHERE id=?', params);
    const res = await d.execute('SELECT * FROM chapters WHERE id=?', [id]);
    const r = res.rows[0]; if (r) { r.id = String(r.id); r.novel_id = String(r.novel_id); }
    return r;
  },
  async delete(id: any) {
    const d = await ensureDb();
    await d.execute('DELETE FROM chapters WHERE id=?', [id]);
  }
};
