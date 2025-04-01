export interface Token {
  id: string
  name: string
  symbol: string
  price?: number
}

export interface TokenComposition {
  token: string
  percentage: number
}

export interface IndexToken {
  id: string
  name: string
  symbol: string
  description: string
  theme: string
  tvl: number
  volume24h: number
  performance7d: number
  performance30d: number
  composition: TokenComposition[]
}

