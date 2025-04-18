"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { TokenComposition } from "@/lib/types";
import { useIndexComposition } from "@/lib/hooks/useIndexComposition";
import { Skeleton } from "@/components/ui/skeleton";

interface IndexCompositionChartProps {
  composition?: TokenComposition[];
  indexId?: string;
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

export function IndexCompositionChart({
  composition: propComposition,
  indexId,
}: IndexCompositionChartProps) {
  // If indexId is provided, fetch composition using our hook
  const {
    composition: fetchedComposition,
    isLoading,
    error,
  } = indexId
    ? useIndexComposition(indexId)
    : { composition: undefined, isLoading: false, error: null };

  // Use prop composition if provided, otherwise use fetched composition
  const composition = propComposition || fetchedComposition || [];

  // Show loading state
  if (isLoading) {
    return <Skeleton className="w-full h-full rounded-full" />;
  }

  // Show error state
  if (error && !propComposition) {
    return (
      <div className="text-destructive text-xs">Failed to load composition</div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={composition}
          cx="50%"
          cy="50%"
          innerRadius={25}
          outerRadius={40}
          paddingAngle={2}
          dataKey="percentage"
        >
          {composition.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="bg-background border rounded-md shadow-md p-2 text-xs">
                  <p className="font-medium">{data.token}</p>
                  <p>{data.percentage}%</p>
                </div>
              );
            }
            return null;
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
