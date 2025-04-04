import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { getAddressBalance, TokenData } from "@/lib/alchemy/getAddressBalance";
import { useUser } from "@account-kit/react";

export function TokenHoldings() {
  const user = useUser();
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.address) {
      setIsLoading(false);
      return;
    }

    async function fetchTokens() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getAddressBalance(user.address);
        setTokens(response);
      } catch (err) {
        console.error("Error fetching token balances:", err);
        setError("Error loading token balances. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchTokens();
  }, [user?.address]);

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

  if (tokens.length === 0) {
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

      {tokens.map((token) => (
        <div
          key={`${token.chain}-${token.tokenAddress}`}
          className="grid grid-cols-12 gap-4 p-4 border-t items-center"
        >
          <div className="col-span-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary flex items-center justify-center text-primary text-xs font-bold">
                {token.symbol ? token.symbol.substring(0, 2) : "??"}
              </div>
              <div>
                <div className="font-medium">
                  {token.name || "Unknown Token"}
                </div>
                <div className="text-sm text-muted-foreground">
                  {token.symbol || token.tokenAddress.substring(0, 8)}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3 text-right">{token.balance}</div>
          <div className="col-span-3 text-right text-muted-foreground">
            {token.chain}
          </div>
          <div className="col-span-2 text-right">
            <Button variant="ghost" size="sm" asChild>
              <Link
                href={`/wrap-unwrap?token=${token.tokenAddress}&chain=${token.chain}`}
              >
                <Plus className="h-4 w-4 mr-1" />
                Wrap
              </Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
