import { Network } from "alchemy-sdk";
import { createAlchemyClient } from "./client";

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
    const alchemy = createAlchemyClient(network);

    const metadata = await alchemy.core.getTokenMetadata(tokenAddress);
    // Ensure we return a complete TokenMetadata object
    return {
      name: metadata?.name || null,
      symbol: metadata?.symbol || null,
      decimals: metadata?.decimals || 18,
      logo: metadata?.logo || null,
    };
  } catch (err) {
    console.error(`Error fetching token metadata for ${network}:`, err);
    return {
      name: null,
      symbol: null,
      decimals: 18,
      logo: null,
    };
  }
}
