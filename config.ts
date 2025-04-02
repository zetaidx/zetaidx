import { AlchemyAccountsUIConfig, createConfig } from "@account-kit/react";
import { alchemy } from "@account-kit/infra";
import { QueryClient } from "@tanstack/react-query";

const uiConfig: AlchemyAccountsUIConfig = {
  illustrationStyle: "filled",
  auth: {
    sections: [
      [{ type: "email" }],
      [
        { type: "social", authProviderId: "google", mode: "popup" },
        { type: "social", authProviderId: "facebook", mode: "popup" },
      ],
      [
        {
          type: "external_wallets",
          walletConnect: {
            projectId: process.env
              .NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
          },
        },
      ],
    ],
    addPasskeyOnSignup: false,
  },
};

export const config = createConfig(
  {
    // if you don't want to leak api keys, you can proxy to a backend and set the rpcUrl instead here
    // get this from the app config you create at https://dashboard.alchemy.com/accounts?utm_source=demo_alchemy_com&utm_medium=referral&utm_campaign=demo_to_dashboard
    transport: alchemy({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
    }),
    chain: {
      id: 7001,
      name: "ZetaChain Athens",
      nativeCurrency: {
        name: "Zeta",
        symbol: "ZETA",
        decimals: 18,
      },
      rpcUrls: {
        default: {
          http: [process.env.NEXT_PUBLIC_ZETA_RPC_URL as string],
        },
        alchemy: {
          http: [process.env.NEXT_PUBLIC_ZETA_RPC_URL as string],
        },
      },
    },
    ssr: true, // set to false if you're not using server-side rendering
    enablePopupOauth: true,
  },
  uiConfig
);

export const queryClient = new QueryClient();
