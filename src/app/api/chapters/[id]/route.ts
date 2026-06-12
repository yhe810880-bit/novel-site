import { NextRequest, NextResponse } from 'next/server';
import { chapters as ch } from '@/lib/db';

export async function GET(request: NextRequest, { params }) {
  const { id } = await params;
  const chapter = await ch.getById(id);
  if (!chapter) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ chapter });
}

export async function PUT(request: NextRequest, { params }) {
  const { id } = await params;
  const body = await request.json();
  const chapter = await ch.update(id, body);
  return NextResponse.json({ chapter });
}

export async function DELETE(request: NextRequest, { params }) {
  const { id } = await params;
  await ch.delete(id);
  return NextResponse.json({ success: true });
}
