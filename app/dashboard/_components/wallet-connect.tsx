"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet } from "lucide-react"

interface WalletConnectProps {
  onConnect: () => void
}

export function WalletConnect({ onConnect }: WalletConnectProps) {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Connect Wallet</CardTitle>
        <CardDescription>Connect your wallet to view your index token holdings</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center py-6">
        <Wallet className="h-16 w-16 text-muted-foreground" />
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onConnect}>
          Connect Wallet
        </Button>
      </CardFooter>
    </Card>
  )
}

