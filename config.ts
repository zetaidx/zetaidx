import { AlchemyAccountsUIConfig, createConfig } from "@account-kit/react";
import { alchemy } from "@account-kit/infra";
import { QueryClient } from "@tanstack/react-query";
import { getChainConfig } from "./lib/config";

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
    chain: getChainConfig(),
    ssr: true, // set to false if you're not using server-side rendering
    enablePopupOauth: true,
  },
  uiConfig
);

export const queryClient = new QueryClient();
