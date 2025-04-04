import Link from "next/link";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAddressBalance } from "@/lib/alchemy/getAddressBalance";
import { TokenCard } from "./TokenCard";

export function TokenHoldings() {
  const { tokens, isLoading, error } = useAddressBalance();

  const erc20Tokens = tokens.filter((token) => !token.isIndex);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Loading token balances...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (erc20Tokens.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No ERC-20 tokens found in this wallet.
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 text-sm font-medium">
        <div className="col-span-4">Token</div>
        <div className="col-span-3 text-right">Balance</div>
        <div className="col-span-3 text-right">Chain</div>
        <div className="col-span-2 text-right"></div>
      </div>

      {erc20Tokens.map((token) => (
        <TokenCard key={`${token.chain}-${token.tokenAddress}`} token={token} />
      ))}
    </div>
  );
}
