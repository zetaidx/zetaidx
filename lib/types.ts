export interface Token {
  id: string;
  name: string;
  symbol: string;
  price?: number;
  type: "stablecoin" | "token";
}

export interface TokenComposition {
  token: string;
  percentage: number;
  address?: `0x${string}`;
}

export interface IndexToken extends Token {
  description: string;
  theme: string;
  tvl: number;
  volume24h: number;
  performance7d: number;
  performance30d: number;
  composition?: TokenComposition[];
  address?: `0x${string}`;
}
