import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAddressBalance } from "@/lib/alchemy/getAddressBalance";
import { IndexCard, IndexTokenData } from "./IndexCard";
import { useEffect, useState } from "react";
import { getStaticIndexData } from "@/lib/indexes-data";

export function IndexHoldings() {
  const { tokens, isLoading, error } = useAddressBalance();
  const [indexTokensData, setIndexTokensData] = useState<IndexTokenData[]>([]);
  const [loadingIndexData, setLoadingIndexData] = useState(false);

  // Filter and enhance tokens with index data
  useEffect(() => {
    if (tokens.length === 0) return;

    setLoadingIndexData(true);

    const enhancedTokens: IndexTokenData[] = tokens
      .filter((token) => token.isIndex)
      .map((token) => {
        // Find matching index from our index data
        const indexData = getStaticIndexData().find(
          (idx) =>
            idx.address?.toLowerCase() === token.tokenAddress.toLowerCase()
        );

        // Return enhanced token with index data
        return {
          ...token,
          performance7d: indexData?.performance7d || 0,
          composition: indexData?.composition || [],
        };
      });

    setIndexTokensData(enhancedTokens);
    setLoadingIndexData(false);
  }, [tokens]);

  if (isLoading || loadingIndexData) {
    return (
      <div className="text-center py-12">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Loading index balances...</p>
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

  if (indexTokensData.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          You don't have any index tokens yet.
        </p>
        <Button asChild className="mt-4">
          <Link href="/indexes">Explore Indexes</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {indexTokensData.map((holding) => (
        <IndexCard key={holding.tokenAddress} holding={holding} />
      ))}
    </div>
  );
}
