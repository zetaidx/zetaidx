"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import type { IndexToken } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { useAggregatePrice } from "@/lib/prices";

interface PriceChartProps {
  selectedIndex: IndexToken | null;
}

export function PriceChart({ selectedIndex }: PriceChartProps) {
  const [timeframe, setTimeframe] = useState<"24h" | "7d" | "30d">("7d");

  const { data: priceData, isLoading } = useAggregatePrice({
    symbols: selectedIndex
      ? selectedIndex.composition?.map((c) => c.token)
      : [],
    ratios: selectedIndex
      ? selectedIndex.composition?.map((c) => c.percentage / 100)
      : [],
    interval: timeframe,
  });

  if (!selectedIndex) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Price Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground">
            Select an index to view price data
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>{selectedIndex.name}</CardTitle>
            <Tabs
              defaultValue="7d"
              value={timeframe}
              onValueChange={(value) => setTimeframe(value as any)}
            >
              <TabsList>
                <TabsTrigger value="24h">24h</TabsTrigger>
                <TabsTrigger value="7d">7d</TabsTrigger>
                <TabsTrigger value="30d">30d</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-24 mt-2" />
          </div>
          <div className="h-[300px]">
            <Skeleton className="h-full w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!priceData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{selectedIndex.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground">No price data available</div>
        </CardContent>
      </Card>
    );
  }

  const data = priceData.data.map((point) => ({
    date: point.timestamp,
    price: point.value,
  }));

  const priceChange = data[data.length - 1].price - data[0].price;
  const priceChangePercent = (priceChange / data[0].price) * 100;
  const isPriceUp = priceChange >= 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>{selectedIndex.name}</CardTitle>
          <Tabs
            defaultValue="7d"
            value={timeframe}
            onValueChange={(value) => setTimeframe(value as any)}
          >
            <TabsList>
              <TabsTrigger value="24h">24h</TabsTrigger>
              <TabsTrigger value="7d">7d</TabsTrigger>
              <TabsTrigger value="30d">30d</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="text-2xl font-bold">
            {formatCurrency(data[data.length - 1].price)}
          </div>
          <div
            className={`text-sm font-medium ${
              isPriceUp ? "text-green-500" : "text-red-500"
            }`}
          >
            {isPriceUp ? "+" : ""}
            {priceChangePercent.toFixed(2)}% ({isPriceUp ? "+" : ""}
            {formatCurrency(priceChange)})
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => {
                  if (timeframe === "24h") {
                    const date = new Date(value);
                    return `${date.getHours().toString().padStart(2, "0")}:00`;
                  }
                  return new Date(value).toLocaleDateString();
                }}
              />
              <YAxis
                domain={["auto", "auto"]}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value.toFixed(0)}`}
              />
              <Tooltip
                formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
                labelFormatter={(label) =>
                  `Date: ${new Date(label).toLocaleString()}`
                }
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  border: "none",
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke={isPriceUp ? "#10b981" : "#ef4444"}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
