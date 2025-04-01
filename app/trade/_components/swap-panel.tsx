"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, ArrowDown, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { TokenSelector } from "./token-selector";
import { mockTokens, mockIndexes } from "@/lib/mock-data";
import type { IndexToken, Token } from "@/lib/types";

interface SwapPanelProps {
  selectedIndex: IndexToken | null;
}

export default function SwapPanel({ selectedIndex }: SwapPanelProps) {
  const [isStablecoinToIndex, setIsStablecoinToIndex] = useState<boolean>(true);
  const [fromToken, setFromToken] = useState<Token | IndexToken | null>(null);
  const [toToken, setToToken] = useState<Token | IndexToken | null>(null);
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [slippage, setSlippage] = useState<number>(0.5);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Filter tokens based on trade direction
  const stablecoins = mockTokens.filter((t) => t.type === "stablecoin");
  const indexTokens = mockIndexes;

  // Set initial tokens based on direction
  useEffect(() => {
    if (isStablecoinToIndex) {
      setFromToken(stablecoins[0]);
      setToToken(selectedIndex || indexTokens[0]);
    } else {
      setFromToken(selectedIndex || indexTokens[0]);
      setToToken(stablecoins[0]);
    }
  }, [isStablecoinToIndex, selectedIndex]);

  // Calculate to amount based on from amount (simplified)
  const calculateToAmount = (amount: string) => {
    if (!amount || !fromToken || !toToken) return "";
    const numAmount = Number.parseFloat(amount);
    if (isNaN(numAmount)) return "";

    // Simplified price calculation
    const exchangeRate = isStablecoinToIndex ? 0.05 : 20; // 1 USDC = 0.05 Index tokens or vice versa
    return (numAmount * exchangeRate).toFixed(6);
  };

  // Update to amount when from amount changes
  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    setToAmount(calculateToAmount(value));
  };

  // Handle swap direction toggle
  const handleDirectionToggle = () => {
    setIsStablecoinToIndex(!isStablecoinToIndex);
    // Swap tokens
    const tempFrom = fromToken;
    setFromToken(toToken);
    setToToken(tempFrom);
    // Swap amounts
    const tempFromAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempFromAmount);
  };

  // Handle swap
  const handleSwap = () => {
    if (!fromAmount || !toAmount || !fromToken || !toToken) return;

    setIsSubmitting(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setFromAmount("");
        setToAmount("");
      }, 3000);
    }, 2000);
  };

  // Check if liquidity is low (for demo purposes)
  const isLiquidityLow = toToken && "tvl" in toToken && toToken.tvl < 500000;

  // Calculate price impact (for demo purposes)
  const priceImpact = fromAmount
    ? Number.parseFloat(fromAmount) > 10000
      ? 2.5
      : 0.2
    : 0;

  // Determine if price impact is high
  const isHighImpact = priceImpact > 1.0;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Swap Tokens</CardTitle>
        <CardDescription>
          Exchange tokens for Zetaidx index tokens
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Trade Direction Toggle */}
        <div className="flex items-center justify-between p-2 rounded-md border">
          <span className="text-sm font-medium">Trade Direction</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {isStablecoinToIndex
                ? "Stablecoin → Index"
                : "Index → Stablecoin"}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDirectionToggle}
              className="h-8 w-8"
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* From Token */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>From</span>
            <span>Balance: 1,000 {fromToken?.symbol}</span>
          </div>
          <div className="flex items-center space-x-2 p-4 rounded-md border">
            <TokenSelector
              tokens={isStablecoinToIndex ? stablecoins : indexTokens}
              selectedToken={fromToken}
              onSelectToken={setFromToken}
              type="from"
            />
            <input
              type="text"
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
              placeholder="0.0"
              className="flex-1 bg-transparent text-right text-xl focus:outline-none"
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground hover:text-primary"
            onClick={() => handleFromAmountChange("1000")}
          >
            MAX
          </Button>
        </div>

        {/* Swap Direction Indicator */}
        <div className="flex justify-center">
          <div className="bg-muted rounded-full p-2">
            <ArrowDown className="h-4 w-4" />
          </div>
        </div>

        {/* To Token */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>To (Estimated)</span>
            <span>
              Balance: {toToken ? `0 ${toToken.symbol}` : "Select a token"}
            </span>
          </div>
          <div className="flex items-center space-x-2 p-4 rounded-md border">
            <TokenSelector
              tokens={isStablecoinToIndex ? indexTokens : stablecoins}
              selectedToken={toToken}
              onSelectToken={setToToken}
              type="to"
            />
            <input
              type="text"
              value={toAmount}
              readOnly
              placeholder="0.0"
              className="flex-1 bg-transparent text-right text-xl focus:outline-none"
            />
          </div>
        </div>

        {/* Exchange Rate */}
        {fromAmount && toAmount && fromToken && toToken && (
          <div className="text-sm text-muted-foreground">
            1 {toToken.symbol} ={" "}
            {(
              Number.parseFloat(fromAmount) / Number.parseFloat(toAmount)
            ).toFixed(2)}{" "}
            {fromToken.symbol}
          </div>
        )}

        {/* Liquidity Warning */}
        {isLiquidityLow && toToken && (
          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Low pool liquidity for {toToken.symbol} may impact pricing.
            </AlertDescription>
          </Alert>
        )}

        {/* Price Impact Warning */}
        {isHighImpact && fromAmount && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              High price impact: {priceImpact.toFixed(2)}%. Consider reducing
              your trade size.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        {/* Transaction Details */}
        <div className="w-full space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Price Impact</span>
            <span className={priceImpact > 1 ? "text-destructive" : ""}>
              {priceImpact.toFixed(2)}%
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Slippage Tolerance</span>
            <span>{slippage}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Minimum Received</span>
            <span>
              {toAmount
                ? (Number.parseFloat(toAmount) * (1 - slippage / 100)).toFixed(
                    6
                  )
                : "0"}{" "}
              {toToken?.symbol}
            </span>
          </div>
        </div>

        <Separator />

        {/* Swap Button */}
        <Button
          className="w-full"
          size="lg"
          disabled={
            !fromAmount ||
            !toAmount ||
            isSubmitting ||
            isSuccess ||
            !fromToken ||
            !toToken
          }
          onClick={handleSwap}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : isSuccess ? (
            <span className="flex items-center">
              <svg
                className="h-4 w-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              Swap Successful!
            </span>
          ) : (
            "Swap"
          )}
        </Button>

        {/* Error Message */}
        {error && <div className="text-sm text-destructive mt-2">{error}</div>}
      </CardFooter>
    </Card>
  );
}
