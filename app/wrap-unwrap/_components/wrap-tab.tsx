"use client"

import { useState } from "react"
import { Plus, Trash2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { mockIndexes, mockTokens } from "@/lib/mock-data"
import type { IndexToken, Token } from "@/lib/types"

interface TokenInputRowProps {
  token: Token
  amount: string
  percentage: number
  onAmountChange: (amount: string) => void
  onRemove: () => void
  isRemovable: boolean
}

function TokenInputRow({ token, amount, percentage, onAmountChange, onRemove, isRemovable }: TokenInputRowProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 flex items-center gap-2 p-3 rounded-md border">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary flex items-center justify-center text-primary text-xs font-bold">
          {token.symbol.substring(0, 2)}
        </div>
        <div className="flex-1">
          <div className="font-medium">{token.symbol}</div>
          <div className="text-xs text-muted-foreground">Proportion: {percentage}%</div>
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
  )
}

export function WrapTab() {
  const [selectedIndex, setSelectedIndex] = useState<IndexToken>(mockIndexes[0])
  const [tokenInputs, setTokenInputs] = useState<{ token: Token; amount: string }[]>([
    { token: mockTokens[0], amount: "" },
    { token: mockTokens[1], amount: "" },
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Calculate the expected output based on inputs
  const calculateOutput = () => {
    const totalValue = tokenInputs.reduce((sum, input) => {
      const amount = Number.parseFloat(input.amount) || 0
      return sum + amount
    }, 0)

    // Simplified calculation - in reality would depend on index composition and prices
    return totalValue > 0 ? (totalValue * 0.05).toFixed(6) : "0"
  }

  // Add a new token input row
  const addTokenInput = () => {
    const availableTokens = mockTokens.filter((token) => !tokenInputs.some((input) => input.token.id === token.id))

    if (availableTokens.length > 0) {
      setTokenInputs([...tokenInputs, { token: availableTokens[0], amount: "" }])
    }
  }

  // Remove a token input row
  const removeTokenInput = (index: number) => {
    if (tokenInputs.length > 1) {
      const newInputs = [...tokenInputs]
      newInputs.splice(index, 1)
      setTokenInputs(newInputs)
    }
  }

  // Update amount for a token input
  const updateAmount = (index: number, amount: string) => {
    const newInputs = [...tokenInputs]
    newInputs[index].amount = amount
    setTokenInputs(newInputs)
  }

  // Handle wrap action
  const handleWrap = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset after success
      setTimeout(() => {
        setIsSuccess(false)
        setTokenInputs(tokenInputs.map((input) => ({ ...input, amount: "" })))
      }, 3000)
    }, 2000)
  }

  // Check if form is valid
  const isFormValid = tokenInputs.some((input) => Number.parseFloat(input.amount) > 0)

  // Calculate percentages for token composition
  const totalTokens = tokenInputs.length
  const percentagePerToken = Math.floor(100 / totalTokens)
  const remainingPercentage = 100 - percentagePerToken * totalTokens

  const getPercentage = (index: number) => {
    return index === 0 ? percentagePerToken + remainingPercentage : percentagePerToken
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wrap Tokens</CardTitle>
        <CardDescription>
          Create new index tokens by depositing the underlying assets in the correct proportions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Index Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Index</label>
          <Select
            value={selectedIndex.id}
            onValueChange={(value) => {
              const index = mockIndexes.find((i) => i.id === value)
              if (index) setSelectedIndex(index)
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

        {/* Token Inputs */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">Input Tokens</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={addTokenInput}
              disabled={tokenInputs.length >= mockTokens.length}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Token
            </Button>
          </div>

          <div className="space-y-3">
            {tokenInputs.map((input, index) => (
              <TokenInputRow
                key={index}
                token={input.token}
                amount={input.amount}
                percentage={getPercentage(index)}
                onAmountChange={(amount) => updateAmount(index, amount)}
                onRemove={() => removeTokenInput(index)}
                isRemovable={tokenInputs.length > 1}
              />
            ))}
          </div>
        </div>

        {/* Output Estimate */}
        <div className="p-4 bg-muted/30 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">You will receive</span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary flex items-center justify-center text-primary text-xs font-bold">
                {selectedIndex.symbol.substring(5, 7)}
              </div>
              <div>
                <div className="font-medium">{selectedIndex.symbol}</div>
                <div className="text-xs text-muted-foreground">{selectedIndex.name}</div>
              </div>
            </div>
            <div className="text-xl font-bold">{calculateOutput()}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" size="lg" disabled={!isFormValid || isSubmitting || isSuccess} onClick={handleWrap}>
          {isSubmitting ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Wrap Successful!
            </span>
          ) : (
            "Wrap Tokens"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

