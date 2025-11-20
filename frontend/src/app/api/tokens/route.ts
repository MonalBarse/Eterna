import { NextResponse } from 'next/server';
import { generateMockTokens } from '@/lib/tokens'; // Fixed import name

export async function GET() {
  const data = generateMockTokens();
  return NextResponse.json(data);
}
