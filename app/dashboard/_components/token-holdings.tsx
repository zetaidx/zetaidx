import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"

// Mock token holdings data
const tokenHoldings = [
  {
    id: "usdc",
    name: "USD Coin",
    symbol: "USDC",
    amount: 1250.75,
    value: 1250.75,
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    amount: 0.42,
    value: 840.0,
  },
  {
    id: "doge",
    name: "Dogecoin",
    symbol: "DOGE",
    amount: 1200,
    value: 120.0,
  },
  {
    id: "link",
    name: "Chainlink",
    symbol: "LINK",
    amount: 25,
    value: 250.0,
  },
]

export function TokenHoldings() {
  if (tokenHoldings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">You don't have any ERC-20 tokens yet.</p>
      </div>
    )
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 text-sm font-medium">
        <div className="col-span-4">Token</div>
        <div className="col-span-3 text-right">Amount</div>
        <div className="col-span-3 text-right">Value</div>
        <div className="col-span-2 text-right"></div>
      </div>

      {tokenHoldings.map((token) => (
        <div key={token.id} className="grid grid-cols-12 gap-4 p-4 border-t items-center">
          <div className="col-span-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary flex items-center justify-center text-primary text-xs font-bold">
                {token.symbol.substring(0, 2)}
              </div>
              <div>
                <div className="font-medium">{token.name}</div>
                <div className="text-sm text-muted-foreground">{token.symbol}</div>
              </div>
            </div>
          </div>
          <div className="col-span-3 text-right">{token.amount}</div>
          <div className="col-span-3 text-right font-medium">{formatCurrency(token.value)}</div>
          <div className="col-span-2 text-right">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/wrap-unwrap?token=${token.id}`}>
                <Plus className="h-4 w-4 mr-1" />
                Wrap
              </Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

