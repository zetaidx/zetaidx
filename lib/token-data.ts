import type { IndexToken, Token, TokenComposition } from "./types";
import { getContractConfig } from "./config";
import { createPublicClient, http, getContract } from "viem";
import { getChainConfig } from "./config";

// ABI fragment for getIndexComposition function
const indexTokenAbi = [
  {
    inputs: [],
    name: "getIndexComposition",
    outputs: [
      {
        internalType: "address[]",
        name: "tokens",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ratios",
        type: "uint256[]",
      },
      {
        internalType: "string[]",
        name: "priceSymbols",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export const tokens: Token[] = [
  {
    id: "usdc",
    name: "USD Coin",
    symbol: "USDC",
    price: 1.0,
    type: "stablecoin",
  },
  {
    id: "usdt",
    name: "Tether",
    symbol: "USDT",
    price: 1.0,
    type: "stablecoin",
  },
  {
    id: "dai",
    name: "Dai",
    symbol: "DAI",
    price: 1.0,
    type: "stablecoin",
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    price: 2000.0,
    type: "token",
  },
  {
    id: "doge",
    name: "Dogecoin",
    symbol: "DOGE",
    price: 0.1,
    type: "token",
  },
  {
    id: "shib",
    name: "Shiba Inu",
    symbol: "SHIB",
    price: 0.00001,
    type: "token",
  },
  {
    id: "aave",
    name: "Aave",
    symbol: "AAVE",
    price: 80.0,
    type: "token",
  },
  {
    id: "uni",
    name: "Uniswap",
    symbol: "UNI",
    price: 5.0,
    type: "token",
  },
  {
    id: "comp",
    name: "Compound",
    symbol: "COMP",
    price: 40.0,
    type: "token",
  },
  {
    id: "link",
    name: "Chainlink",
    symbol: "LINK",
    price: 10.0,
    type: "token",
  },
];

export const indexes: IndexToken[] = [
  {
    id: "zidx-blue",
    address: process.env
      .NEXT_PUBLIC_INDEX_TOKEN_ADDRESS_ZIDX_BLUE as `0x${string}`,
    name: "Blue Chip",
    symbol: "ZIDX-BLUE",
    type: "token",
    description: "Major cryptocurrencies with established market presence",
    theme: "Blue-Chip",
    tvl: 8750000,
    volume24h: 1250000,
    performance7d: 2.1,
    performance30d: 12.3,
  },
];

/**
 * Fetches the composition of an index token from the blockchain
 * @param indexAddress The address of the index token contract
 * @returns An array of TokenComposition objects
 */
export async function fetchIndexComposition(
  indexAddress: `0x${string}`
): Promise<TokenComposition[]> {
  try {
    // Create a public client
    const chain = getChainConfig();
    const publicClient = createPublicClient({
      chain,
      transport: http(),
    });

    // Call the getIndexComposition function
    const result = (await publicClient.readContract({
      address: indexAddress,
      abi: indexTokenAbi,
      functionName: "getIndexComposition",
    })) as [string[], bigint[], string[]];

    // Map the returned data to TokenComposition objects
    const [tokens, ratios, symbols] = result;
    const composition: TokenComposition[] = ratios.map(
      (ratio: bigint, index: number) => ({
        token: symbols[index],
        percentage: Number(ratio),
      })
    );

    return composition;
  } catch (error) {
    console.error("Error fetching index composition:", error);
    // Return empty array or fallback to mock data if fetch fails
    return [];
  }
}

/**
 * Gets real-time index composition or falls back to mock data
 * @param indexId The ID of the index to fetch composition for
 * @returns The composition of the index
 */
export async function getIndexComposition(
  indexId: string
): Promise<TokenComposition[]> {
  const indexData = indexes.find((index) => index.id === indexId);

  if (!indexData?.address) {
    return indexData?.composition || [];
  }

  try {
    const composition = await fetchIndexComposition(indexData.address);
    return composition.length > 0 ? composition : indexData.composition;
  } catch (error) {
    console.error("Error in getIndexComposition:", error);
    return indexData.composition;
  }
}
