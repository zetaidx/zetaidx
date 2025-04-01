"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import type { IndexToken, Token } from "@/lib/types";

interface TokenSelectorProps {
  tokens: (Token | IndexToken)[];
  selectedToken: Token | IndexToken | null;
  onSelectToken: (token: Token | IndexToken) => void;
  type: "from" | "to";
}

export function TokenSelector({
  tokens,
  selectedToken,
  onSelectToken,
  type,
}: TokenSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 rounded-md border px-3 py-2 hover:bg-accent">
          {selectedToken ? (
            <>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/20 to-primary flex items-center justify-center text-primary text-xs font-bold">
                {selectedToken.symbol.substring(0, 2)}
              </div>
              <div className="flex flex-col items-start">
                <span>{selectedToken.symbol}</span>
                {"description" in selectedToken && (
                  <span className="text-xs text-muted-foreground">
                    {selectedToken.description}
                  </span>
                )}
              </div>
            </>
          ) : (
            <span>Select token</span>
          )}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search token..." />
          <CommandList>
            <CommandEmpty>No tokens found.</CommandEmpty>
            <CommandGroup>
              {tokens.map((token) => (
                <CommandItem
                  key={token.id}
                  value={token.symbol}
                  onSelect={() => {
                    onSelectToken(token);
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/20 to-primary flex items-center justify-center text-primary text-xs font-bold">
                      {token.symbol.substring(0, 2)}
                    </div>
                    <div className="flex flex-col items-start">
                      <span>{token.symbol}</span>
                      {"description" in token && (
                        <span className="text-xs text-muted-foreground">
                          {token.description}
                        </span>
                      )}
                      {"tvl" in token && (
                        <span className="text-xs text-muted-foreground">
                          TVL: ${(token.tvl / 1000000).toFixed(1)}M
                        </span>
                      )}
                    </div>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedToken?.id === token.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
