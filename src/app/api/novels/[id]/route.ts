import { NextRequest, NextResponse } from 'next/server';
import { novels, chapters } from '@/lib/db';

export async function GET(request: NextRequest, { params }) {
  const { id } = await params;
  const novel = await novels.getById(id);
  if (!novel) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const chs = await chapters.listByNovel(id);
  return NextResponse.json({ novel, chapters: chs });
}

export async function PUT(request: NextRequest, { params }) {
  const { id } = await params;
  const body = await request.json();
  const novel = await novels.update(id, body);
  return NextResponse.json({ novel });
}

export async function DELETE(request: NextRequest, { params }) {
  const { id } = await params;
  await novels.delete(id);
  return NextResponse.json({ success: true });
}
