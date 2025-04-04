import { Network } from "alchemy-sdk";

export interface ChainConfig {
  network: Network;
  name: string;
  baseUrl: string;
  networkId: number;
}

export const supportedChains: ChainConfig[] = [
  {
    network: Network.ETH_MAINNET,
    name: "Ethereum",
    baseUrl: "https://eth-mainnet.g.alchemy.com",
    networkId: 1,
  },
  {
    network: Network.BASE_MAINNET,
    name: "Base",
    baseUrl: "https://base-mainnet.g.alchemy.com",
    networkId: 8453,
  },
];

export function getChainConfig(chainName: string): ChainConfig | undefined {
  return supportedChains.find(
    (chain) => chain.name.toLowerCase() === chainName.toLowerCase()
  );
}

export function getChainConfigByNetwork(
  network: Network
): ChainConfig | undefined {
  return supportedChains.find((chain) => chain.network === network);
}
