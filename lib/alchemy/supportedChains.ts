import { Network } from "alchemy-sdk";

export interface ChainConfig {
  network: Network;
  name: string;
  baseUrl: string;
  networkId: number;
}

export const supportedChains: ChainConfig[] = [
  {
    network: Network.ZETACHAIN_TESTNET,
    name: "ZetaChain Athens",
    baseUrl: "https://zetachain-athens-rpc.publicnode.com",
    networkId: 7001,
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
