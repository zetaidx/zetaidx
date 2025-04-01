import Link from "next/link"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { IndexCompositionChart } from "@/components/charts/index-composition-chart"
import { formatCurrency, formatPercentage } from "@/lib/utils"

// Mock holdings data
const holdings = [
  {
    id: "zidx-meme",
    name: "Meme Basket",
    symbol: "ZIDX-MEME",
    amount: 2.5,
    value: 125.75,
    performance7d: 12.4,
    composition: [
      { token: "DOGE", percentage: 50 },
      { token: "SHIB", percentage: 50 },
    ],
  },
  {
    id: "zidx-defi",
    name: "DeFi Index",
    symbol: "ZIDX-DEFI",
    amount: 1.2,
    value: 240.36,
    performance7d: -3.2,
    composition: [
      { token: "AAVE", percentage: 30 },
      { token: "UNI", percentage: 40 },
      { token: "COMP", percentage: 30 },
    ],
  },
]

export function IndexHoldings() {
  if (holdings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">You don't have any index tokens yet.</p>
        <Button asChild className="mt-4">
          <Link href="/indexes">Explore Indexes</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {holdings.map((holding) => (
        <Card key={holding.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <CardTitle className="text-lg">{holding.name}</CardTitle>
              <div
                className={`flex items-center text-sm font-medium ${holding.performance7d >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {holding.performance7d >= 0 ? (
                  <TrendingUp className="h-3.5 w-3.5 mr-1" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5 mr-1" />
                )}
                {formatPercentage(holding.performance7d)}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">{holding.symbol}</div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-20 h-20 cursor-help">
                      <IndexCompositionChart composition={holding.composition} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Composition</div>
                      {holding.composition.map((item) => (
                        <div key={item.token} className="flex justify-between gap-4 text-xs">
                          <span>{item.token}</span>
                          <span>{item.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div className="flex-1 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Amount</span>
                  <span>{holding.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Value</span>
                  <span className="font-medium">{formatCurrency(holding.value)}</span>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/trade?index=${holding.id}`}>Trade</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/wrap-unwrap?index=${holding.id}&tab=unwrap`}>Unwrap</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

