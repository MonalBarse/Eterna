// src/lib/tokens.ts

export type ColumnType = 'new' | 'final' | 'migrated';

export interface TokenMetric {
  value: string;
  color: 'green' | 'red' | 'blue' | 'slate';
  label?: string;
}

export interface Token {
  id: string;
  column: ColumnType;
  name: string;
  ticker: string;
  address: string;
  imgUrl: string; // Placeholder for character images

  // Time & Status
  createdAgo: number; // in seconds, will auto-increment
  badges: string[]; // ['DS', 'Bonding: 99.8%']

  // Core Metrics
  mc: number;     // Market Cap
  vol: number;    // Volume
  txCount: number;
  price: number;

  // Micro-metrics (The small badges/pills)
  holders: number;
  buyPressure: number; // 0-100, determines the bar width
  change1m: number;    // % change
  change5m: number;    // % change

  // Visual State
  isHot: boolean; // Adds a fire icon or distinct border
}

// --- NAMES COMPONENT GENERATOR ---
const PREFIXES = ['Elon', 'Doge', 'Pepe', 'Moon', 'Safe', 'Baby', 'Super', 'Mega', 'Chad', 'Ape', 'Cat', 'Inu'];
const SUFFIXES = ['AI', 'GPT', 'Moon', 'Rocket', 'Finance', 'Swap', 'Coin', 'DAO', 'Gem', 'Bet', 'Lab', 'Base'];

// Helper to generate random float
const rand = (min: number, max: number) => Math.random() * (max - min) + min;
const randInt = (min: number, max: number) => Math.floor(rand(min, max));
const choice = <T>(arr: T[]): T => arr[randInt(0, arr.length)];

export function generateMockTokens(count: number = 300): { [key in ColumnType]: Token[] } {
  const tokens: Token[] = [];

  for (let i = 0; i < count; i++) {
    const isNew = i < 100;
    const isFinal = i >= 100 && i < 200;
    const column: ColumnType = isNew ? 'new' : isFinal ? 'final' : 'migrated';

    // Realistic MC distribution based on column
    const baseMc = isNew ? 5000 : isFinal ? 50000 : 500000;
    const mc = baseMc * rand(0.5, 5);

    tokens.push({
      id: `token-${i}`,
      column,
      name: `${choice(PREFIXES)}${choice(SUFFIXES)}`,
      ticker: choice(SUFFIXES).toUpperCase(),
      address: Math.random().toString(36).substring(2, 8) + '...pump',
      imgUrl: `/avatars/${randInt(1, 10)}.png`, // You'll need placeholder images

      createdAgo: isNew ? randInt(0, 120) : randInt(300, 86400),
      badges: Math.random() > 0.7 ? ['DS', 'Bonding: 98%'] : [],

      mc,
      vol: mc * rand(0.1, 0.5),
      txCount: randInt(5, 5000),
      price: rand(0.0000001, 0.01),

      holders: randInt(10, 1000),
      buyPressure: rand(20, 90),
      change1m: rand(-10, 20),
      change5m: rand(-30, 50),

      isHot: Math.random() > 0.9,
    });
  }

  return {
    new: tokens.filter(t => t.column === 'new').sort((a, b) => a.createdAgo - b.createdAgo),
    final: tokens.filter(t => t.column === 'final').sort((a, b) => b.mc - a.mc),
    migrated: tokens.filter(t => t.column === 'migrated').sort((a, b) => b.mc - a.mc),
  };
}