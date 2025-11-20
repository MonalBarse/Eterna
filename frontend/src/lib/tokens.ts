// src/lib/tokens.ts
export type ColumnType = 'new' | 'final' | 'migrated';

export interface Token {
  id: number;
  column: ColumnType;
  name: string;
  ticker: string;
  address: string;
  mc: number;
  vol: number;
  price: number;
  tx: number;
  color: 'green' | 'red';
  progress: string;
  imgColor: string;
}

export const MOCK_TOKENS: Token[] = [
  {
    id: 1,
    column: 'new',
    name: 'PUMP',
    ticker: 'PUMP Token',
    address: 'H2ha...pump',
    mc: 4.38,
    vol: 0.521,
    price: 0.023,
    tx: 5,
    color: 'green',
    progress: '0/1',
    imgColor: 'bg-emerald-500',
  },
  {
    id: 2,
    column: 'final',
    name: 'ZINO',
    ticker: 'ZinoSolCoin',
    address: 'A9B1...L9W',
    mc: 65.64,
    vol: 1.8,
    price: 0.00329,
    tx: 12,
    color: 'red',
    progress: '1/1',
    imgColor: 'bg-blue-600',
  },
  {
    id: 3,
    column: 'migrated',
    name: 'DOGGCOIN',
    ticker: 'DOGGCOIN',
    address: 'QenP...q4ms',
    mc: 41.7,
    vol: 1.4,
    price: 0.00004,
    tx: 8,
    color: 'green',
    progress: '0/10',
    imgColor: 'bg-yellow-400',
  },
  {
    id: 4,
    column: 'new',
    name: 'MOONSHOT',
    ticker: 'MOON Token',
    address: 'M00N...SHOT',
    mc: 12.5,
    vol: 0.9,
    price: 0.015,
    tx: 3,
    color: 'green',
    progress: '0/5',
    imgColor: 'bg-purple-500',
  },
  {
    id: 5,
    column: 'final',
    name: 'STARLINK',
    ticker: 'STAR Token',
    address: 'STAR...LINK',
    mc: 89.3,
    vol: 2.3,
    price: 0.045,
    tx: 15,
    color: 'red',
    progress: '2/2',
    imgColor: 'bg-pink-500',
  },
];

export function getMockTokensByColumn() {
  return {
    new: MOCK_TOKENS.filter((t) => t.column === 'new'),
    final: MOCK_TOKENS.filter((t) => t.column === 'final'),
    migrated: MOCK_TOKENS.filter((t) => t.column === 'migrated'),
  };
}
