"use client";

import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { mockTokens } from "@/lib/mock-data";
import { getStaticIndexData } from "@/lib/indexes-data";
import type { IndexToken, Token } from "@/lib/types";
import { ethers } from "ethers";
import { useUser } from "@account-kit/react";

interface TokenInputRowProps {
  token: Token;
  amount: string;
  percentage: number;
  onAmountChange: (amount: string) => void;
  onRemove: () => void;
  isRemovable: boolean;
}

function TokenInputRow({
  token,
  amount,
  percentage,
  onAmountChange,
  onRemove,
  isRemovable,
}: TokenInputRowProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 flex items-center gap-2 p-3 rounded-md border">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary flex items-center justify-center text-primary text-xs font-bold">
          {token.symbol.substring(0, 2)}
        </div>
        <div className="flex-1">
          <div className="font-medium">{token.symbol}</div>
          <div className="text-xs text-muted-foreground">
            Proportion: {percentage}%
          </div>
        </div>
        <input
          type="text"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          placeholder="0.0"
          className="w-24 bg-transparent text-right focus:outline-none"
        />
      </div>
      {isRemovable && (
        <Button variant="ghost" size="icon" onClick={onRemove}>
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

export function WrapTab() {
  const indexes = getStaticIndexData();
  const user = useUser();

  const [selectedIndex, setSelectedIndex] = useState<IndexToken>(indexes[0]);
  const [desiredAmount, setDesiredAmount] = useState<string>("");
  const [tokenInputs, setTokenInputs] = useState<
    { token: Token; amount: string }[]
  >([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Initialize token inputs when index changes
  useEffect(() => {
    const inputs =
      selectedIndex.composition?.map((comp) => {
        // Find the token from mock data using symbol
        const token = mockTokens.find((t) => t.symbol === comp.token);
        return {
          token,
          amount: "",
        };
      }) || [];
    setTokenInputs(inputs);
  }, [selectedIndex]);

  // Calculate required token amounts based on desired index token amount
  const calculateRequiredAmounts = (amount: string) => {
    const numAmount = Number.parseFloat(amount) || 0;
    if (numAmount <= 0) {
      setTokenInputs(tokenInputs.map((input) => ({ ...input, amount: "" })));
      return;
    }

    const baseValue = numAmount;
    const newInputs = tokenInputs.map((input, index) => {
      const percentage = selectedIndex.composition?.[index].percentage || 0;
      const requiredValue = (baseValue * percentage) / 100;
      return { ...input, amount: requiredValue.toString() };
    });
    setTokenInputs(newInputs);
  };

  // Handle desired amount change
  const handleDesiredAmountChange = (amount: string) => {
    setDesiredAmount(amount);
    calculateRequiredAmounts(amount);
  };

  // Helper function to adjust amounts for decimals
  const adjustForDecimals = (amount: ethers.BigNumber, decimals: number) => {
    if (decimals < 18) {
      return amount.div(ethers.BigNumber.from(10).pow(18 - decimals));
    } else if (decimals > 18) {
      return amount.mul(ethers.BigNumber.from(10).pow(decimals - 18));
    }
    return amount;
  };

  // Handle wrap action
  const handleWrap = async () => {
    if (!user?.address) {
      setErrorMessage("Please connect your wallet first");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // Get provider from window.ethereum
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Convert desired amount to big number (in wei)
      const amount = ethers.utils.parseUnits(desiredAmount, 18);

      // Get token contracts from the composition
      for (const comp of selectedIndex.composition || []) {
        if (!comp || !comp.address) {
          throw new Error(`Missing token address for ${comp?.token}`);
        }

        // Calculate amount needed for this token
        const tokenPercentage = comp.percentage;
        const tokenAmount = amount.mul(tokenPercentage).div(100);

        // Get token contract
        const tokenContract = new ethers.Contract(
          comp.address,
          [
            "function balanceOf(address) view returns (uint256)",
            "function approve(address, uint256) returns (bool)",
            "function allowance(address, address) view returns (uint256)",
            "function decimals() view returns (uint8)",
          ],
          signer
        );

        // Get token decimals once
        const decimals = await tokenContract.decimals();
        
        // Adjust amount for decimals
        const adjustedAmount = adjustForDecimals(tokenAmount, decimals);

        // Check user balance
        const balance = await tokenContract.balanceOf(user.address);
        if (balance.lt(adjustedAmount)) {
          throw new Error(
            `Insufficient balance for ${
              comp.token
            }. Required: ${ethers.utils.formatUnits(
              adjustedAmount,
              decimals
            )}, Available: ${ethers.utils.formatUnits(balance, decimals)}`
          );
        }

        // Check current allowance
        const currentAllowance = await tokenContract.allowance(
          user.address,
          selectedIndex.address
        );

        // Only approve if current allowance is less than required amount
        if (currentAllowance.lt(adjustedAmount)) {
          console.log(
            `Approving ${ethers.utils.formatUnits(adjustedAmount, decimals)} ${comp.token}`
          );
          const approveTx = await tokenContract.approve(
            selectedIndex.address,
            adjustedAmount
          );
          await approveTx.wait();
        } else {
          console.log(
            `Sufficient allowance for ${comp.token}: ${ethers.utils.formatUnits(
              currentAllowance,
              decimals
            )}`
          );
        }
      }

      // Get index token contract and call wrap
      if (!selectedIndex.address) {
        throw new Error("Index token address not found");
      }

      const indexContract = new ethers.Contract(
        selectedIndex.address,
        ["function wrap(uint256) returns (bool)"],
        signer
      );

      // Execute wrap
      const wrapTx = await indexContract.wrap(amount, { gasLimit: 500000 });
      await wrapTx.wait();

      // Success
      setIsSuccess(true);
    } catch (error: any) {
      console.error("Wrap error:", error);
      setErrorMessage(error.message || "Failed to wrap tokens");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if form is valid
  const isFormValid = Number.parseFloat(desiredAmount) > 0 && !!user?.address;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wrap Tokens</CardTitle>
        <CardDescription>
          Create new index tokens by depositing the underlying assets in the
          correct proportions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Index Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Index</label>
          <Select
            value={selectedIndex.id}
            onValueChange={(value) => {
              const index = indexes.find((i) => i.id === value);
              if (index) setSelectedIndex(index);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an index" />
            </SelectTrigger>
            <SelectContent>
              {indexes.map((index) => (
                <SelectItem key={index.id} value={index.id}>
                  {index.name} ({index.symbol})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Desired Output Amount */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Desired Index Token Amount
          </label>
          <div className="flex items-center gap-2 p-3 rounded-md border">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary flex items-center justify-center text-primary text-xs font-bold">
              {selectedIndex.symbol?.substring(0, 2)}
            </div>
            <div className="flex-1">
              <div className="font-medium">{selectedIndex.symbol}</div>
              <div className="text-xs text-muted-foreground">
                {selectedIndex.name}
              </div>
            </div>
            <input
              type="text"
              value={desiredAmount}
              onChange={(e) => handleDesiredAmountChange(e.target.value)}
              placeholder="0.0"
              className="w-24 bg-transparent text-right focus:outline-none"
            />
          </div>
        </div>

        {/* Required Token Inputs */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">Required Token Amounts</h3>
          </div>

          <div className="space-y-3">
            {tokenInputs.map((input, index) => (
              <TokenInputRow
                key={index}
                token={input.token}
                amount={input.amount}
                percentage={selectedIndex.composition?.[index].percentage || 0}
                onAmountChange={() => {}}
                onRemove={() => {}}
                isRemovable={false}
              />
            ))}
          </div>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="text-red-500 text-sm">{errorMessage}</div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          size="lg"
          disabled={!isFormValid || isSubmitting || isSuccess}
          onClick={handleWrap}
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
              Wrapping...
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
              Wrap Successful!
            </span>
          ) : (
            "Wrap Tokens"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
