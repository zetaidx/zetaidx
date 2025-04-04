import { useQuery } from "@tanstack/react-query";

const PRICE_API_BASE_URL = "https://idx-prices.zetachain.io";

export interface PriceDataPoint {
  value: number;
  timestamp: Date;
}

export interface AggregatePriceResponse {
  data: PriceDataPoint[];
  interval: string;
  timestamp: Date;
}

export interface AggregatePnLResponse {
  pnl: number;
  firstValue: number;
  lastValue: number;
  firstTimestamp: Date;
  lastTimestamp: Date;
  timestamp: Date;
}

interface PriceQueryParams {
  symbols?: string[];
  ratios?: number[];
  interval: "24h" | "7d" | "30d";
}

interface RawPriceDataPoint {
  value: number;
  timestamp: string;
}

interface RawAggregatePriceResponse {
  data: RawPriceDataPoint[];
  interval: string;
  timestamp: string;
}

interface RawAggregatePnLResponse {
  pnl: number;
  firstValue: number;
  lastValue: number;
  firstTimestamp: string;
  lastTimestamp: string;
  timestamp: string;
}

const parseDate = (dateString: string): Date => {
  return new Date(dateString);
};

const parsePriceData = (
  data: RawAggregatePriceResponse
): AggregatePriceResponse => {
  return {
    ...data,
    timestamp: parseDate(data.timestamp),
    data: data.data.map((point) => ({
      ...point,
      timestamp: parseDate(point.timestamp),
    })),
  };
};

const parsePnLData = (data: RawAggregatePnLResponse): AggregatePnLResponse => {
  return {
    ...data,
    timestamp: parseDate(data.timestamp),
    firstTimestamp: parseDate(data.firstTimestamp),
    lastTimestamp: parseDate(data.lastTimestamp),
  };
};

/**
 * Validates price query parameters and throws descriptive errors if invalid
 * @throws {Error} If parameters are invalid
 */
const validatePriceQueryParams = ({
  symbols,
  ratios,
  interval,
}: PriceQueryParams): void => {
  if (!Array.isArray(symbols) || symbols.length === 0) {
    throw new Error("Symbols must be a non-empty array");
  }

  if (!Array.isArray(ratios) || ratios.length === 0) {
    throw new Error("Ratios must be a non-empty array");
  }

  if (ratios.some((ratio) => typeof ratio !== "number" || isNaN(ratio))) {
    throw new Error("All ratios must be valid numbers");
  }

  if (!["24h", "7d", "30d"].includes(interval)) {
    throw new Error('Interval must be one of: "24h", "7d", "30d"');
  }
};

const fetchAggregatePrice = async ({
  symbols,
  ratios,
  interval,
}: PriceQueryParams): Promise<AggregatePriceResponse> => {
  validatePriceQueryParams({ symbols, ratios, interval });

  const symbolsParam = symbols?.map((s) => encodeURIComponent(s)).join(",");
  const ratiosParam = ratios?.map((r) => encodeURIComponent(r)).join(",");
  const response = await fetch(
    `${PRICE_API_BASE_URL}/aggregate?symbols=${symbolsParam}&ratios=${ratiosParam}&interval=${encodeURIComponent(
      interval
    )}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch aggregate price");
  }
  const data = await response.json();
  return parsePriceData(data);
};

const fetchAggregatePnL = async ({
  symbols,
  ratios,
  interval,
}: PriceQueryParams): Promise<AggregatePnLResponse> => {
  validatePriceQueryParams({ symbols, ratios, interval });

  const symbolsParam = symbols?.map((s) => encodeURIComponent(s)).join(",");
  const ratiosParam = ratios?.map((r) => encodeURIComponent(r)).join(",");
  const response = await fetch(
    `${PRICE_API_BASE_URL}/aggregate/pnl?symbols=${symbolsParam}&ratios=${ratiosParam}&interval=${encodeURIComponent(
      interval
    )}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch aggregate PnL");
  }
  const data = await response.json();
  return parsePnLData(data);
};

/**
 * React Query hook for fetching aggregate price data
 * @param params Query parameters including symbols, ratios, and interval
 * @returns Query result containing price data
 * @throws {Error} If parameters are invalid (empty arrays, invalid numbers, etc.)
 */
export const useAggregatePrice = (params: PriceQueryParams) => {
  return useQuery({
    queryKey: ["aggregatePrice", params],
    queryFn: () => fetchAggregatePrice(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
    enabled: params.symbols?.length > 0 && params.ratios?.length > 0, // Prevent query when arrays are empty
  });
};

/**
 * React Query hook for fetching aggregate PnL data
 * @param params Query parameters including symbols, ratios, and interval
 * @returns Query result containing PnL data
 * @throws {Error} If parameters are invalid (empty arrays, invalid numbers, etc.)
 */
export const useAggregatePnL = (params: PriceQueryParams) => {
  return useQuery({
    queryKey: ["aggregatePnL", params],
    queryFn: () => fetchAggregatePnL(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
    enabled:
      (params.symbols?.length ?? 0) > 0 && (params.ratios?.length ?? 0) > 0, // Prevent query when arrays are empty
  });
};
