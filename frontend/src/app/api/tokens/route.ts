// src/app/api/tokens/route.ts
import { NextResponse } from 'next/server';
import { getMockTokensByColumn } from '@/lib/tokens';

export async function GET() {
  // in a real app you’d hit a DB here
  const data = getMockTokensByColumn();
  return NextResponse.json(data);
}
