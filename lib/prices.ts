import { useQuery } from '@tanstack/react-query';

const PRICE_API_BASE_URL = 'https://zetaidx-price-worker.zetachain.workers.dev';

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
}

const parseDate = (dateString: string): Date => {
  return new Date(dateString);
};

const parsePriceData = (data: any): AggregatePriceResponse => {
  return {
    ...data,
    timestamp: parseDate(data.timestamp),
    data: data.data.map((point: any) => ({
      ...point,
      timestamp: parseDate(point.timestamp),
    })),
  };
};

const parsePnLData = (data: any): AggregatePnLResponse => {
  return {
    ...data,
    timestamp: parseDate(data.timestamp),
    firstTimestamp: parseDate(data.firstTimestamp),
    lastTimestamp: parseDate(data.lastTimestamp),
  };
};

const fetchAggregatePrice = async ({ symbols, ratios }: PriceQueryParams): Promise<AggregatePriceResponse> => {
  const symbolsParam = symbols.join(',');
  const ratiosParam = ratios.join(',');
  const response = await fetch(
    `${PRICE_API_BASE_URL}/aggregate?symbols=${symbolsParam}&ratios=${ratiosParam}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch aggregate price');
  }
  const data = await response.json();
  return parsePriceData(data);
};

const fetchAggregatePnL = async ({ symbols, ratios }: PriceQueryParams): Promise<AggregatePnLResponse> => {
  const symbolsParam = symbols.join(',');
  const ratiosParam = ratios.join(',');
  const response = await fetch(
    `${PRICE_API_BASE_URL}/aggregate/pnl?symbols=${symbolsParam}&ratios=${ratiosParam}`
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
    staleTime: 1000 * 60, // 1 minute
    refetchInterval: 1000 * 60, // Refetch every minute
  });
};

export const useAggregatePnL = (params: PriceQueryParams) => {
  return useQuery({
    queryKey: ['aggregatePnL', params],
    queryFn: () => fetchAggregatePnL(params),
    staleTime: 1000 * 60, // 1 minute
    refetchInterval: 1000 * 60, // Refetch every minute
  });
};
