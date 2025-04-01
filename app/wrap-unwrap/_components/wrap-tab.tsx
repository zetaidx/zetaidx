"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, ArrowRight } from "lucide-react";
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
import { mockIndexes, mockTokens } from "@/lib/mock-data";
import type { IndexToken, Token } from "@/lib/types";

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
  const [selectedIndex, setSelectedIndex] = useState<IndexToken>(
    mockIndexes[0]
  );
  const [desiredAmount, setDesiredAmount] = useState<string>("");
  const [tokenInputs, setTokenInputs] = useState<
    { token: Token; amount: string }[]
  >([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Initialize token inputs when index changes
  useEffect(() => {
    const inputs = selectedIndex.composition.map((comp) => ({
      token: mockTokens.find((t) => t.symbol === comp.token) || mockTokens[0],
      amount: "",
    }));
    setTokenInputs(inputs);
  }, [selectedIndex]);

  // Calculate required token amounts based on desired index token amount
  const calculateRequiredAmounts = (amount: string) => {
    const numAmount = Number.parseFloat(amount) || 0;
    if (numAmount <= 0) {
      setTokenInputs(tokenInputs.map((input) => ({ ...input, amount: "" })));
      return;
    }

    // Simplified calculation - in reality would use actual token prices and ratios
    const baseValue = numAmount * 20; // Assuming 1 index token = $20 worth of assets
    const newInputs = tokenInputs.map((input, index) => {
      const percentage = selectedIndex.composition[index].percentage;
      const requiredValue = (baseValue * percentage) / 100;
      const tokenAmount = input.token.price
        ? (requiredValue / input.token.price).toFixed(6)
        : "0";
      return { ...input, amount: tokenAmount };
    });
    setTokenInputs(newInputs);
  };

  // Handle desired amount change
  const handleDesiredAmountChange = (amount: string) => {
    setDesiredAmount(amount);
    calculateRequiredAmounts(amount);
  };

  // Handle wrap action
  const handleWrap = () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset after success
      setTimeout(() => {
        setIsSuccess(false);
        setDesiredAmount("");
        setTokenInputs(tokenInputs.map((input) => ({ ...input, amount: "" })));
      }, 3000);
    }, 2000);
  };

  // Check if form is valid
  const isFormValid = Number.parseFloat(desiredAmount) > 0;

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
              const index = mockIndexes.find((i) => i.id === value);
              if (index) setSelectedIndex(index);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an index" />
            </SelectTrigger>
            <SelectContent>
              {mockIndexes.map((index) => (
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
              {selectedIndex.symbol.substring(5, 7)}
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
                percentage={selectedIndex.composition[index].percentage}
                onAmountChange={() => {}}
                onRemove={() => {}}
                isRemovable={false}
              />
            ))}
          </div>
        </div>
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
