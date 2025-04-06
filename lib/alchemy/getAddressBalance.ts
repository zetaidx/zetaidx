"use client";

import { TokenBalancesResponse } from "alchemy-sdk";
import { createAlchemyClient } from "./client";
import { getTokenMetadata } from "./getTokenMetadata";
import { supportedChains, ChainConfig } from "./supportedChains";
import { getStaticIndexData } from "../indexes-data";
import { useEffect, useState } from "react";
import { useUser } from "@account-kit/react";

// Type for normalized token results
export interface TokenData {
  tokenAddress: string;
  name: string | null;
  symbol: string | null;
  amount: string;
  decimals: number;
  chain: string;
  isIndex: boolean;
}

/**
 * Get token balances for an address across all supported chains
 * @param address The address to get balances for
 * @returns Array of token balance data from all chains
 */
export async function getAddressBalance(address: string): Promise<TokenData[]> {
  try {
    // Fetch balances from all supported chains in parallel
    const chainPromises = supportedChains.map(async (chainConfig) => {
      try {
        return await getAddressBalanceForChain(address, chainConfig);
      } catch (error) {
        console.error(`Error fetching tokens for ${chainConfig.name}:`, error);
        return [];
      }
    });

    // Wait for all requests to complete and flatten the results
    const results = await Promise.all(chainPromises);
    return results.flat();
  } catch (error) {
    console.error("Error getting address tokens:", error);
    return [];
  }
}

/**
 * Fetch token balances for an address using Alchemy API
 * @param address The address to get balances for
 * @param chainConfig The chain configuration
 * @returns Array of token balance data
 */
async function getAddressBalanceForChain(
  address: string,
  chainConfig: ChainConfig
): Promise<TokenData[]> {
  const { network, name: chainName } = chainConfig;
  const alchemy = createAlchemyClient(network);

  // Use direct fetch for token balances as a fallback if needed
  let tokenBalances: TokenBalancesResponse;
  try {
    tokenBalances = await alchemy.core.getTokenBalances(address);

    // Get metadata for all tokens with balance > 0
    const tokensWithBalances = tokenBalances.tokenBalances.filter(
      (token) => token.tokenBalance && BigInt(token.tokenBalance) > BigInt(0)
    );

    if (tokensWithBalances.length === 0) {
      return [];
    }

    const tokenMetadataResults = await Promise.all(
      tokensWithBalances.map((token) =>
        getTokenMetadata(token.contractAddress, network)
      )
    );

    // Get metadata for found tokens
    const tokenData = tokensWithBalances.map((token, index) => {
      const metadata = tokenMetadataResults[index];
      const decimals = metadata.decimals || 18;
      const balanceBigInt = BigInt(token.tokenBalance || "0");
      const balanceNumber = Number(balanceBigInt) / Math.pow(10, decimals);
      const balanceFormatted = balanceNumber.toLocaleString("en-US", {
        maximumSignificantDigits: decimals,
        minimumSignificantDigits: 1,
      });
      const isIndex = getStaticIndexData().some(
        (t) => t.address?.toLowerCase() === token.contractAddress.toLowerCase()
      );
      // Generate URL for logo (placeholder if no logo available)
      return {
        tokenAddress: token.contractAddress,
        name: metadata.name,
        symbol: metadata.symbol,
        amount: balanceFormatted,
        decimals: decimals,
        chain: chainName,
        isIndex,
      };
    });
    return tokenData;
  } catch (error) {
    console.error(`Error fetching tokens for ${chainName}:`, error);
    return [];
  }
}

/**
 * React hook to fetch token balances for a given address
 * @param address The wallet address to fetch balances for
 * @returns Object containing tokens, loading state, and error state
 */
export function useAddressBalance() {
  const user = useUser();
  const address = user?.address;
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!address) {
      setIsLoading(false);
      return;
    }

    async function fetchTokens() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getAddressBalance(address as string);
        setTokens(response);
      } catch (err) {
        console.error("Error fetching token balances:", err);
        setError("Error loading token balances. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchTokens();
  }, [address]);

  return { tokens, isLoading, error };
}
