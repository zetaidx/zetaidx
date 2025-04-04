import { useState, useEffect } from "react";
import { getIndexComposition } from "@/lib/indexes-data";
import type { TokenComposition } from "@/lib/types";

/**
 * Custom hook to fetch and manage index composition data
 * @param indexId The ID of the index to fetch composition for
 * @returns An object containing the composition data and loading state
 */
export function useIndexComposition(indexId: string) {
  const [composition, setComposition] = useState<TokenComposition[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchComposition() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getIndexComposition(indexId);
        setComposition(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch composition")
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchComposition();
  }, [indexId]);

  return { composition, isLoading, error };
}
