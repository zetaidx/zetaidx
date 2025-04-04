import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TokenData } from "@/lib/alchemy/getAddressBalance";

interface TokenCardProps {
  token: TokenData;
}

export function TokenCard({ token }: TokenCardProps) {
  return (
    <div className="grid grid-cols-12 gap-4 p-4 border-t items-center">
      <div className="col-span-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary flex items-center justify-center text-primary text-xs font-bold">
            {token.symbol ? token.symbol.substring(0, 2) : "??"}
          </div>
          <div>
            <div className="font-medium">{token.name || "Unknown Token"}</div>
            <div className="text-sm text-muted-foreground">
              {token.symbol || token.tokenAddress.substring(0, 8)}
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-3 text-right">{token.amount}</div>
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
  );
}
