"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { mockTokens } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { useAddressBalance } from "@/lib/alchemy/getAddressBalance";
import { TokenData } from "@/lib/alchemy/getAddressBalance";
import { useIndexComposition } from "@/lib/hooks/useIndexComposition";
import { useAggregatePrice } from "@/lib/prices";
import { ethers } from "ethers";
import { useUser } from "@account-kit/react";

export function UnwrapTab() {
  const {
    tokens,
    isLoading: isLoadingAddressBalance,
    error: errorAddressBalance,
  } = useAddressBalance();
  const user = useUser();
  const indexes = tokens.filter((token) => token.isIndex);
  const [selectedIndex, setSelectedIndex] = useState<TokenData>(indexes[0]);
  const { composition } = useIndexComposition(selectedIndex?.tokenAddress);
  const [amount, setAmount] = useState<number>(
    Number(selectedIndex?.amount) || 0
  );
  const {
    data: priceData,
    isLoading: isPriceLoading,
    error: priceError,
  } = useAggregatePrice({
    symbols: composition!.map((comp) => comp.token),
    ratios: composition!.map((comp) => comp.percentage),
    interval: "24h",
  });
  const totalUSDValue =
    ((priceData?.data[priceData?.data.length - 1].value || 0) * amount) /
    10 ** (selectedIndex?.decimals || 18);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const calculateOutputs = () => {
    return composition!.map((comp) => {
      const token = mockTokens.find((t) => t.symbol === comp.token) || mockTokens[0];
      const tokenAmount = (amount * comp.percentage) / 100;
      return {
        token,
        amount: tokenAmount.toString(),
      };
    });
  };

  const handleAmountChange = (value: string) => {
    const numValue = Number(value);
    if (isNaN(numValue) || numValue < 0) {
      setAmount(0);
      return;
    }
    setAmount(numValue);
  };

  const handleUnwrap = async () => {
    if (!user?.address) {
      setErrorMessage("Please connect your wallet first");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const unwrapAmount = ethers.utils.parseUnits(
        amount.toString(),
        selectedIndex?.decimals || 18
      );

      if (!selectedIndex?.tokenAddress) {
        throw new Error("Index token address not found");
      }

      const indexContract = new ethers.Contract(
        selectedIndex.tokenAddress,
        [
          "function balanceOf(address) view returns (uint256)",
          "function approve(address, uint256) returns (bool)",
          "function unwrap(uint256) returns (bool)",
        ],
        signer
      );

      const balance = await indexContract.balanceOf(user.address);
      if (balance.lt(unwrapAmount)) {
        throw new Error(
          `Insufficient balance. Required: ${ethers.utils.formatUnits(
            unwrapAmount,
            selectedIndex?.decimals || 18
          )}, Available: ${ethers.utils.formatUnits(
            balance,
            selectedIndex?.decimals || 18
          )}`
        );
      }

      console.log(
        `Approving ${ethers.utils.formatUnits(
          unwrapAmount,
          selectedIndex?.decimals || 18
        )} ${selectedIndex.symbol} for unwrap`
      );
      const approveTx = await indexContract.approve(
        selectedIndex.tokenAddress,
        unwrapAmount
      );
      await approveTx.wait();

      console.log(
        `Unwrapping ${ethers.utils.formatUnits(
          unwrapAmount,
          selectedIndex?.decimals || 18
        )} ${selectedIndex.symbol}`
      );
      const unwrapTx = await indexContract.unwrap(unwrapAmount, {
        gasLimit: 500000,
      });
      await unwrapTx.wait();

      setIsSuccess(true);
    } catch (error: any) {
      console.error("Unwrap error:", error);
      setErrorMessage(error.message || "Failed to unwrap tokens");
    } finally {
      setIsSubmitting(false);
    }
  };

  const outputs = calculateOutputs();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Unwrap Tokens</CardTitle>
        <CardDescription>
          Break an index token back into its constituent assets
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoadingAddressBalance ? (
          <div className="flex justify-center py-8">
            <div className="flex flex-col items-center">
              <svg
                className="animate-spin h-8 w-8 text-primary mb-2"
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
              <p className="text-sm text-muted-foreground">Loading tokens...</p>
            </div>
          </div>
        ) : errorAddressBalance ? (
          <div className="p-4 border border-red-200 bg-red-50 rounded-md text-red-600">
            <p className="font-medium">Error loading tokens</p>
            <p className="text-sm">
              {errorAddressBalance || "Please try again later"}
            </p>
          </div>
        ) : indexes.length === 0 ? (
          <div className="p-4 border border-amber-200 bg-amber-50 rounded-md text-amber-600">
            <p className="font-medium">No index tokens found</p>
            <p className="text-sm">
              You don't have any index tokens in your wallet to unwrap.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Index Token</label>
              <Select
                value={selectedIndex?.tokenAddress}
                onValueChange={(value) => {
                  const index = indexes.find((i) => i.tokenAddress === value);
                  if (index) setSelectedIndex(index);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an index" />
                </SelectTrigger>
                <SelectContent>
                  {indexes.map((index) => (
                    <SelectItem
                      key={index.tokenAddress}
                      value={index.tokenAddress}
                    >
                      {index.name} ({index.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Amount to Unwrap</label>
                <span className="text-sm text-muted-foreground">
                  Balance: {ethers.utils.formatUnits(
                    selectedIndex?.amount || 0,
                    selectedIndex?.decimals || 18
                  )} {selectedIndex?.symbol}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Slider
                    value={[amount]}
                    max={Number(selectedIndex?.amount || 0)}
                    step={0.01}
                    onValueChange={(values) => setAmount(values[0])}
                  />
                </div>
                <div className="w-20">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    className="w-full p-2 rounded-md border bg-transparent text-right"
                    min="0"
                    max={Number(selectedIndex?.amount || 0)}
                    step="0.01"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground hover:text-primary"
                  onClick={() => setAmount(Number(selectedIndex?.amount || 0))}
                >
                  MAX
                </Button>
              </div>
            </div>

            <Separator />

            {isPriceLoading ? (
              <div className="flex justify-center py-4">
                <p className="text-sm text-muted-foreground">
                  Loading price data...
                </p>
              </div>
            ) : priceError ? (
              <div className="p-3 border border-red-200 bg-red-50 rounded-md text-red-600 text-sm">
                Failed to load price data:{" "}
                {priceError.message || "Unknown error"}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">You will receive</h3>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>

                <div className="space-y-2">
                  {outputs.map((output, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-md border"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary flex items-center justify-center text-primary text-xs font-bold">
                          {output.token.symbol.substring(0, 2)}
                        </div>
                        <div className="font-medium">{output.token.symbol}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{output.amount}</div>
                        <div className="text-xs text-muted-foreground">
                          ≈ {formatCurrency(Number(output.amount) * 20)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between p-3 rounded-md bg-muted/30">
                  <span className="font-medium">Total Value</span>
                  <span className="font-bold">
                    {formatCurrency(totalUSDValue)}
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          size="lg"
          disabled={
            isLoadingAddressBalance ||
            isPriceLoading ||
            !!errorAddressBalance ||
            !!priceError ||
            indexes.length === 0 ||
            amount <= 0 ||
            isSubmitting ||
            isSuccess
          }
          onClick={handleUnwrap}
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
              Unwrapping...
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
              Unwrap Successful!
            </span>
          ) : (
            "Unwrap Tokens"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
