import type { IndexToken, Token } from "./types"

export const mockTokens: Token[] = [
  {
    id: "usdc",
    name: "USD Coin",
    symbol: "USDC",
    price: 1.0,
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    price: 2000.0,
  },
  {
    id: "doge",
    name: "Dogecoin",
    symbol: "DOGE",
    price: 0.1,
  },
  {
    id: "shib",
    name: "Shiba Inu",
    symbol: "SHIB",
    price: 0.00001,
  },
  {
    id: "aave",
    name: "Aave",
    symbol: "AAVE",
    price: 80.0,
  },
  {
    id: "uni",
    name: "Uniswap",
    symbol: "UNI",
    price: 5.0,
  },
  {
    id: "comp",
    name: "Compound",
    symbol: "COMP",
    price: 40.0,
  },
  {
    id: "link",
    name: "Chainlink",
    symbol: "LINK",
    price: 10.0,
  },
]

export const mockIndexes: IndexToken[] = [
  {
    id: "zidx-meme",
    name: "Meme Basket",
    symbol: "ZIDX-MEME",
    description: "Top-performing meme tokens bundled in one index",
    theme: "Meme",
    tvl: 1250000,
    volume24h: 350000,
    performance7d: 12.4,
    performance30d: 28.7,
    composition: [
      { token: "DOGE", percentage: 50 },
      { token: "SHIB", percentage: 50 },
    ],
  },
  {
    id: "zidx-defi",
    name: "DeFi Index",
    symbol: "ZIDX-DEFI",
    description: "Exposure to decentralized finance protocols",
    theme: "DeFi",
    tvl: 3500000,
    volume24h: 750000,
    performance7d: -3.2,
    performance30d: 5.8,
    composition: [
      { token: "AAVE", percentage: 30 },
      { token: "UNI", percentage: 40 },
      { token: "COMP", percentage: 30 },
    ],
  },
  {
    id: "zidx-blue",
    name: "Blue Chip",
    symbol: "ZIDX-BLUE",
    description: "Major cryptocurrencies with established market presence",
    theme: "Blue-Chip",
    tvl: 8750000,
    volume24h: 1250000,
    performance7d: 2.1,
    performance30d: 12.3,
    composition: [
      { token: "ETH", percentage: 60 },
      { token: "LINK", percentage: 40 },
    ],
  },
  {
    id: "zidx-equal",
    name: "Equal Weight",
    symbol: "ZIDX-EQUAL",
    description: "Equal allocation across major crypto assets",
    theme: "Blue-Chip",
    tvl: 4250000,
    volume24h: 850000,
    performance7d: 1.8,
    performance30d: 9.5,
    composition: [
      { token: "ETH", percentage: 25 },
      { token: "LINK", percentage: 25 },
      { token: "AAVE", percentage: 25 },
      { token: "UNI", percentage: 25 },
    ],
  },
]

