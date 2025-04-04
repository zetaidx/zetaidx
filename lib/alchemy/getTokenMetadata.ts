import { Network } from "alchemy-sdk";
import { callAlchemyApi } from "./client";

export interface TokenMetadata {
  name: string | null;
  symbol: string | null;
  decimals: number;
  logo: string | null;
}

/**
 * Fetch token metadata from Alchemy
 * @param tokenAddress The contract address of the token
 * @param network The network to fetch metadata from
 * @returns Token metadata including name, symbol, decimals, and logo
 */
export async function getTokenMetadata(
  tokenAddress: string,
  network: Network
): Promise<TokenMetadata> {
  try {
    // Use direct fetch for token metadata
    const metadata = (await callAlchemyApi(
      network,
      "alchemy_getTokenMetadata",
      [tokenAddress]
    )) as Partial<TokenMetadata>;
    // Ensure we return a complete TokenMetadata object
    return {
      name: metadata?.name || null,
      symbol: metadata?.symbol || null,
      decimals: metadata?.decimals || 18,
      logo: metadata?.logo || null,
    };
  } catch (err) {
    // Fallback to minimal metadata if fetch fails
    console.error(`Error fetching token metadata for ${network}:`, err);
    return {
      name: null,
      symbol: null,
      decimals: 18,
      logo: null,
    };
  }
}

/**
 * Generate placeholder logo URL for tokens that don't have a logo
 * @param symbol Token symbol or contract address
 * @returns URL to a placeholder logo
 */
export function getTokenLogoUrl(
  symbol: string | null,
  tokenAddress: string
): string {
  return symbol
    ? `https://api.dicebear.com/6.x/shapes/svg?seed=${symbol}`
    : `https://api.dicebear.com/6.x/shapes/svg?seed=${tokenAddress}`;
}
