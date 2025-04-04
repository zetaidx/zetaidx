import { Chain } from "viem";

export interface ContractConfig {
  indexToken: string;
  uniswapFactory: string;
  uniswapRouter: string;
}

export const getChainConfig = (): Chain => {
  const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "7001");
  const chainName = process.env.NEXT_PUBLIC_CHAIN_NAME || "ZetaChain Athens";
  const rpcUrl = process.env.NEXT_PUBLIC_ZETA_RPC_URL;

  if (!rpcUrl) {
    throw new Error(
      "NEXT_PUBLIC_ZETA_RPC_URL environment variable is required"
    );
  }

  return {
    id: chainId,
    name: chainName,
    nativeCurrency: {
      name: "Zeta",
      symbol: "ZETA",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: [rpcUrl],
      },
      alchemy: {
        http: [rpcUrl],
      },
    },
  };
};

export const getContractConfig = (): ContractConfig => {
  const indexToken = process.env.NEXT_PUBLIC_INDEX_TOKEN_ADDRESS;
  const uniswapFactory = process.env.NEXT_PUBLIC_UNISWAP_FACTORY_ADDRESS;
  const uniswapRouter = process.env.NEXT_PUBLIC_UNISWAP_ROUTER_ADDRESS;

  if (!indexToken || !uniswapFactory || !uniswapRouter) {
    throw new Error(
      "Missing required contract address environment variables. Please check your .env file."
    );
  }

  return {
    indexToken,
    uniswapFactory,
    uniswapRouter,
  };
};
