import Link from "next/link";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IndexCompositionChart } from "@/components/charts/index-composition-chart";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import { TokenData } from "@/lib/alchemy/getAddressBalance";
import { TokenComposition } from "@/lib/types";
import { useAggregatePnL, useAggregatePrice } from "@/lib/prices";
import { useIndexComposition } from "@/lib/indexes-data";

// Extended type that includes the additional properties needed for index tokens
export interface IndexTokenData extends TokenData {
  performance7d: number;
  composition: TokenComposition[];
}

interface IndexCardProps {
  holding: IndexTokenData;
}

export function IndexCard({ holding }: IndexCardProps) {
  const {
    composition,
    isLoading: isCompositionLoading,
    error: compositionError,
  } = useIndexComposition(holding.tokenAddress as `0x${string}`);
  const {
    data: priceData,
    isLoading: isPriceLoading,
    error: priceError,
  } = useAggregatePrice({
    symbols: composition.map((item) => item.token),
    ratios: composition.map((item) => item.percentage),
    interval: "24h",
  });

  const {
    data: pnlData,
    isLoading: isPnlLoading,
    error: pnlError,
  } = useAggregatePnL({
    symbols: composition.map((item) => item.token),
    ratios: composition.map((item) => item.percentage),
    interval: "7d",
  });

  const performance7d = pnlData?.pnl || 0;
  const value =
    (priceData?.data[priceData?.data.length - 1]?.value || 0) *
    Number(holding.amount);

  if (compositionError || priceError || pnlError) {
    return (
      <div>
        Error:{" "}
        {(compositionError as string) ||
          (priceError?.message as string) ||
          (pnlError?.message as string)}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="text-lg">{holding.name}</CardTitle>
          <div
            className={`flex items-center text-sm font-medium ${
              performance7d >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {performance7d >= 0 ? (
              <TrendingUp className="h-3.5 w-3.5 mr-1" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5 mr-1" />
            )}
            {formatPercentage(performance7d)}
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
                  <IndexCompositionChart composition={composition} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="space-y-1">
                  <div className="text-sm font-medium">Composition</div>
                  {composition.map((item) => (
                    <div
                      key={item.token}
                      className="flex justify-between gap-4 text-xs"
                    >
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
              <span className="font-medium">{formatCurrency(value)}</span>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/trade?index=${holding.tokenAddress}`}>Trade</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link
                  href={`/wrap-unwrap?index=${holding.tokenAddress}&tab=unwrap`}
                >
                  Unwrap
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
