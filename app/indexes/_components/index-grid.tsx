import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { IndexCompositionChart } from "@/components/charts/index-composition-chart";
import { ArrowUpRight, TrendingUp, TrendingDown } from "lucide-react";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import type { IndexToken } from "@/lib/types";

interface IndexGridProps {
  indexes: IndexToken[];
}

export function IndexGrid({ indexes }: IndexGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {indexes.map((index) => (
        <Card key={index.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary flex items-center justify-center text-primary font-bold">
                  {index.symbol.substring(5, 7)}
                </div>
                <div>
                  <h3 className="font-semibold">{index.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {index.symbol}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div
                  className={`flex items-center text-sm font-medium ${
                    index.performance7d >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {index.performance7d >= 0 ? (
                    <TrendingUp className="h-3.5 w-3.5 mr-1" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5 mr-1" />
                  )}
                  {formatPercentage(index.performance7d)}
                </div>
                <p className="text-xs text-muted-foreground">7d</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {index.description}
            </p>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24">
                <IndexCompositionChart indexId={index.id} />
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground">TVL</p>
                  <p className="font-medium">{formatCurrency(index.tvl)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">24h Volume</p>
                  <p className="font-medium">
                    {formatCurrency(index.volume24h)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">30d</p>
                  <p
                    className={`font-medium ${
                      index.performance30d >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {formatPercentage(index.performance30d)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href={`/trade?index=${index.id}`}>
                View / Trade
                <ArrowUpRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
