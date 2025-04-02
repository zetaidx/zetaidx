"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "next-themes"
import { useState } from "react"
import { AlchemyAccountProvider } from "@account-kit/react"
import { config } from "@/config"
import dynamic from 'next/dynamic'

const ProvidersInner = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <AlchemyAccountProvider
        config={config}
        queryClient={queryClient}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </AlchemyAccountProvider>
    </QueryClientProvider>
  )
}

export const Providers = dynamic(
  () => Promise.resolve(ProvidersInner),
  { ssr: false }
) 