import { useQuery } from '@tanstack/react-query';

const PRICE_API_BASE_URL = 'https://idx-prices.zetachain.io';

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
  symbols: string[];
  ratios: number[];
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

const parsePriceData = (data: RawAggregatePriceResponse): AggregatePriceResponse => {
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

const fetchAggregatePrice = async ({ symbols, ratios, interval }: PriceQueryParams): Promise<AggregatePriceResponse> => {
  const symbolsParam = symbols.map(s => encodeURIComponent(s)).join(',');
  const ratiosParam = ratios.map(r => encodeURIComponent(r)).join(',');
  const response = await fetch(
    `${PRICE_API_BASE_URL}/aggregate?symbols=${symbolsParam}&ratios=${ratiosParam}&interval=${encodeURIComponent(interval)}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch aggregate price');
  }
  const data = await response.json();
  return parsePriceData(data);
};

const fetchAggregatePnL = async ({ symbols, ratios, interval }: PriceQueryParams): Promise<AggregatePnLResponse> => {
  const symbolsParam = symbols.map(s => encodeURIComponent(s)).join(',');
  const ratiosParam = ratios.map(r => encodeURIComponent(r)).join(',');
  const response = await fetch(
    `${PRICE_API_BASE_URL}/aggregate/pnl?symbols=${symbolsParam}&ratios=${ratiosParam}&interval=${encodeURIComponent(interval)}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch aggregate PnL');
  }
  const data = await response.json();
  return parsePnLData(data);
};

export const useAggregatePrice = (params: PriceQueryParams) => {
  return useQuery({
    queryKey: ['aggregatePrice', params],
    queryFn: () => fetchAggregatePrice(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
  });
};

export const useAggregatePnL = (params: PriceQueryParams) => {
  return useQuery({
    queryKey: ['aggregatePnL', params],
    queryFn: () => fetchAggregatePnL(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
  });
};
