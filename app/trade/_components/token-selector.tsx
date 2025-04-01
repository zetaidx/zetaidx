"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import type { IndexToken, Token } from "@/lib/types"

interface TokenSelectorProps {
  tokens: Token[]
  selectedToken: Token | IndexToken | null
  onSelectToken: (token: any) => void
  type: "from" | "to"
  indexTokens?: IndexToken[]
}

export function TokenSelector({ tokens, selectedToken, onSelectToken, type, indexTokens }: TokenSelectorProps) {
  const [open, setOpen] = useState(false)

  // Combine regular tokens and index tokens for the "to" selector
  const allTokens = type === "to" && indexTokens ? [...tokens, ...indexTokens] : tokens

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 rounded-md border px-3 py-2 hover:bg-accent">
          {selectedToken ? (
            <>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/20 to-primary flex items-center justify-center text-primary text-xs font-bold">
                {selectedToken.symbol.substring(0, 2)}
              </div>
              <span>{selectedToken.symbol}</span>
            </>
          ) : (
            <span>Select token</span>
          )}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search token..." />
          <CommandList>
            <CommandEmpty>No tokens found.</CommandEmpty>
            <CommandGroup>
              {allTokens.map((token) => (
                <CommandItem
                  key={token.id}
                  value={token.symbol}
                  onSelect={() => {
                    onSelectToken(token)
                    setOpen(false)
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/20 to-primary flex items-center justify-center text-primary text-xs font-bold">
                      {token.symbol.substring(0, 2)}
                    </div>
                    <span>{token.symbol}</span>
                  </div>
                  <Check
                    className={cn("ml-auto h-4 w-4", selectedToken?.id === token.id ? "opacity-100" : "opacity-0")}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

