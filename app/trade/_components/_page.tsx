"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SwapPanel from "./swap-panel";
import { PriceChart } from "./price-chart";
import { mockIndexes } from "@/lib/mock-data";
import type { IndexToken } from "@/lib/types";

export default function TradePage() {
  const searchParams = useSearchParams();
  const indexId = searchParams.get("index");

  const [selectedIndex, setSelectedIndex] = useState<IndexToken | null>(null);

  useEffect(() => {
    if (indexId) {
      const index = mockIndexes.find((i) => i.id === indexId) || null;
      setSelectedIndex(index);
    }
  }, [indexId]);

  return (
    <div className="container py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <SwapPanel selectedIndex={selectedIndex} />
        </div>
        <div>
          <PriceChart selectedIndex={selectedIndex} />
        </div>
      </div>
    </div>
  );
}
