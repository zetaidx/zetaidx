"use client";
import { config, queryClient } from "@/config";
import { AlchemyClientState } from "@account-kit/core";
import { AlchemyAccountProvider } from "@account-kit/react";
import { QueryClientProvider } from "@tanstack/react-query";
import dynamic from 'next/dynamic';
import { PropsWithChildren } from "react";

const AlchemyProvidersInner = (
  props: PropsWithChildren<{ initialState?: AlchemyClientState }>
) => (
  <QueryClientProvider client={queryClient}>
    <AlchemyAccountProvider
      config={config}
      queryClient={queryClient}
      initialState={props.initialState}
    >
      {props.children}
    </AlchemyAccountProvider>
  </QueryClientProvider>
);

const AlchemyProviders = dynamic(
  () => Promise.resolve(AlchemyProvidersInner),
  { ssr: false }
);

export { AlchemyProviders };
