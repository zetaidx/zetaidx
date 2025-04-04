import { Alchemy, Network } from "alchemy-sdk";
import { supportedChains } from "./supportedChains";

// Create an Alchemy client for a specific network
export function createAlchemyClient(network: Network): Alchemy {
  // Configure Alchemy SDK for the given network
  const settings = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network,
  };

  return new Alchemy(settings);
}

// Get an Alchemy client for each supported chain
export function getAlchemyClients(): Alchemy[] {
  return supportedChains.map((chain) => createAlchemyClient(chain.network));
}

// Get base URL for direct API calls
export function getAlchemyBaseUrl(network: Network): string {
  const chain = supportedChains.find((c) => c.network === network);
  if (!chain) {
    throw new Error(`Unsupported network: ${network}`);
  }
  return chain.baseUrl;
}

// Direct API call to Alchemy
export async function callAlchemyApi(
  network: Network,
  method: string,
  params: unknown[]
): Promise<unknown> {
  const baseUrl = getAlchemyBaseUrl(network);
  const apiKey = process.env.ALCHEMY_API_KEY;

  const response = await fetch(`${baseUrl}/v2/${apiKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: new Date().getTime(),
      method,
      params,
    }),
  });

  if (!response.ok) {
    throw new Error(`Alchemy API error for ${network}: ${response.status}`);
  }

  const data = await response.json();
  return data.result;
}
