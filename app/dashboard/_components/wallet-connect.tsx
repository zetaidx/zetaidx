"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthModal, useLogout, useSignerStatus } from "@account-kit/react";
import { Wallet } from "lucide-react";

export function WalletConnect() {
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Connect Wallet</CardTitle>
        <CardDescription>
          Connect your wallet to view your index token holdings
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center py-6">
        <Wallet className="h-16 w-16 text-muted-foreground" />
      </CardContent>
      <CardFooter>
        {signerStatus.isInitializing ? (
          <span className="text-sm">Loading...</span>
        ) : (
          <Button
            variant="default"
            size="sm"
            onClick={openAuthModal}
            className="w-full"
          >
            Login
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
