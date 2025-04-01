"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WalletConnect } from "./wallet-connect";
import { IndexHoldings } from "./index-holdings";
import { TokenHoldings } from "./token-holdings";
import { formatCurrency } from "@/lib/utils";

export default function DashboardPage() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  // Connect wallet handler
  const handleConnectWallet = () => {
    // Simulate wallet connection
    setIsWalletConnected(true);
    setWalletAddress("0x1234...5678");
  };

  // Disconnect wallet handler
  const handleDisconnectWallet = () => {
    setIsWalletConnected(false);
    setWalletAddress("");
  };

  // Calculate total portfolio value
  const calculateTotalValue = () => {
    // Simplified calculation
    return 2580.42;
  };

  return (
    <div className="container py-8 md:py-12">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          View and manage your index token holdings
        </p>
      </div>

      {!isWalletConnected ? (
        <WalletConnect onConnect={handleConnectWallet} />
      ) : (
        <div className="space-y-8">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Wallet Connected</CardTitle>
                  <CardDescription>
                    {walletAddress} | Ethereum Mainnet
                  </CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      Total Value
                    </div>
                    <div className="text-2xl font-bold">
                      {formatCurrency(calculateTotalValue())}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDisconnectWallet}
                  >
                    Disconnect
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Tabs defaultValue="indexes">
            <TabsList>
              <TabsTrigger value="indexes">Index Holdings</TabsTrigger>
              <TabsTrigger value="tokens">ERC-20 Assets</TabsTrigger>
            </TabsList>
            <TabsContent value="indexes">
              <IndexHoldings />
            </TabsContent>
            <TabsContent value="tokens">
              <TokenHoldings />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
