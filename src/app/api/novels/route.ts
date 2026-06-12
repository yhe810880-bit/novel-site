import { NextRequest, NextResponse } from 'next/server';
import { novels } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const result = await novels.list({
    search: searchParams.get('q') || undefined,
    status: searchParams.get('status') || undefined,
    tag: searchParams.get('tag') || undefined,
    page: parseInt(searchParams.get('page') || '1'),
  });
  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const novel = await novels.create(body);
  return NextResponse.json({ novel });
}
