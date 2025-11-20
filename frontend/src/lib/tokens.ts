// src/lib/tokens.ts
export type TokenColor = 'green' | 'red';

export interface Token {
  id: number;
  name: string;
  ticker: string;
  address: string;
  mc: number;     // Market Cap in K
  vol: number;    // Volume in K
  price: number;
  tx: number;     // Transactions
  color: TokenColor;
  progress: string; // e.g. "0/1"
  imgColor: string; // tailwind class for placeholder bg
}

export const MOCK_TOKENS: Token[] = [
  {
    id: 1,
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
    name: 'CATCOIN',
    ticker: 'CATCOIN',
    address: 'XyZ9...cat1',
    mc: 12.5,
    vol: 0.9,
    price: 0.0001,
    tx: 3,
    color: 'red',
    progress: '6/10',
    imgColor: 'bg-pink-400',
  },
];
