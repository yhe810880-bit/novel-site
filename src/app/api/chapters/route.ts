import { NextRequest, NextResponse } from 'next/server';
import { chapters as ch } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const novelId = searchParams.get('novel_id');
  if (!novelId) return NextResponse.json({ error: 'novel_id required' }, { status: 400 });
  const list = await ch.listByNovel(novelId);
  return NextResponse.json({ chapters: list });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const chapter = await ch.create(body);
  return NextResponse.json({ chapter });
}
