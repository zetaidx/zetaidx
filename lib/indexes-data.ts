import type { IndexToken, Token, TokenComposition } from "./types";
import { getContractConfig } from "./config";
import { createPublicClient, http, getContract } from "viem";
import { getChainConfig } from "./config";
import { useState } from "react";
import { useEffect } from "react";

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
    return composition.length > 0 ? composition : indexData.composition!;
  } catch (error) {
    console.error("Error in getIndexComposition:", error);
    return indexData.composition!;
  }
}

export const useIndexComposition = (address: `0x${string}`) => {
  const [composition, setComposition] = useState<TokenComposition[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const id = indexes.find(
      (index) => index.address?.toLowerCase() === address.toLowerCase()
    )?.id;
    getIndexComposition(id as string)
      .then((data) => {
        setComposition(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching index composition:", err);
        setError("Failed to load index composition");
        setIsLoading(false);
      });
  }, [address]);

  return { composition, isLoading, error };
};
