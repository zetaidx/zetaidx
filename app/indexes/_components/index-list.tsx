import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import { formatCurrency, formatPercentage } from "@/lib/utils"
import type { IndexToken } from "@/lib/types"

interface IndexListProps {
  indexes: IndexToken[]
}

export function IndexList({ indexes }: IndexListProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 text-sm font-medium">
        <div className="col-span-4">Index</div>
        <div className="col-span-2 text-right">TVL</div>
        <div className="col-span-2 text-right">24h Volume</div>
        <div className="col-span-1 text-right">7d</div>
        <div className="col-span-1 text-right">30d</div>
        <div className="col-span-2 text-right"></div>
      </div>
      {indexes.map((index) => (
        <div key={index.id} className="grid grid-cols-12 gap-4 p-4 border-t items-center">
          <div className="col-span-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary flex items-center justify-center text-primary font-bold">
                {index.symbol.substring(5, 7)}
              </div>
              <div>
                <div className="font-medium">{index.name}</div>
                <div className="text-sm text-muted-foreground">{index.symbol}</div>
              </div>
            </div>
          </div>
          <div className="col-span-2 text-right">{formatCurrency(index.tvl)}</div>
          <div className="col-span-2 text-right">{formatCurrency(index.volume24h)}</div>
          <div
            className={`col-span-1 text-right font-medium ${index.performance7d >= 0 ? "text-green-500" : "text-red-500"}`}
          >
            {formatPercentage(index.performance7d)}
          </div>
          <div
            className={`col-span-1 text-right font-medium ${index.performance30d >= 0 ? "text-green-500" : "text-red-500"}`}
          >
            {formatPercentage(index.performance30d)}
          </div>
          <div className="col-span-2 text-right">
            <Button asChild size="sm">
              <Link href={`/trade?index=${index.id}`}>
                View / Trade
                <ArrowUpRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

