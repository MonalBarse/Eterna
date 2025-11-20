import { NextResponse } from 'next/server';
import { generateMockTokens } from '@/lib/tokens'; // Fixed import name

export async function GET() {
  // in a real app you’d hit a DB here
  const data = generateMockTokens();
  return NextResponse.json(data);
}