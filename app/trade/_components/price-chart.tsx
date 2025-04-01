"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { IndexToken } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"

interface PriceChartProps {
  selectedIndex: IndexToken | null
}

// Mock price data
const generatePriceData = (days: number, volatility: number, trend: number) => {
  const data = []
  let price = 100 + Math.random() * 20

  for (let i = 0; i < days; i++) {
    price = price * (1 + (Math.random() - 0.5) * volatility + trend)
    data.push({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      price: price,
    })
  }

  return data
}

const priceData24h = generatePriceData(24, 0.02, 0.001)
const priceData7d = generatePriceData(7, 0.05, 0.002)
const priceData30d = generatePriceData(30, 0.08, 0.005)

export function PriceChart({ selectedIndex }: PriceChartProps) {
  const [timeframe, setTimeframe] = useState<"24h" | "7d" | "30d">("7d")

  const data = timeframe === "24h" ? priceData24h : timeframe === "7d" ? priceData7d : priceData30d

  const priceChange = data[data.length - 1].price - data[0].price
  const priceChangePercent = (priceChange / data[0].price) * 100
  const isPriceUp = priceChange >= 0

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>{selectedIndex ? selectedIndex.name : "Price Chart"}</CardTitle>
          <Tabs defaultValue="7d" value={timeframe} onValueChange={(value) => setTimeframe(value as any)}>
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
          <div className="text-2xl font-bold">{formatCurrency(data[data.length - 1].price)}</div>
          <div className={`text-sm font-medium ${isPriceUp ? "text-green-500" : "text-red-500"}`}>
            {isPriceUp ? "+" : ""}
            {priceChangePercent.toFixed(2)}% ({isPriceUp ? "+" : ""}
            {formatCurrency(priceChange)})
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => {
                  if (timeframe === "24h") {
                    return new Date(value).getHours() + "h"
                  }
                  return value
                }}
              />
              <YAxis
                domain={["auto", "auto"]}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value.toFixed(0)}`}
              />
              <Tooltip
                formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
                labelFormatter={(label) => `Date: ${label}`}
                contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", border: "none" }}
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
  )
}

