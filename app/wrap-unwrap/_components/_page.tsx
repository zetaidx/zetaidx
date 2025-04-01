"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WrapTab } from "./wrap-tab";
import { UnwrapTab } from "./unwrap-tab";

export default function WrapUnwrapPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Wrap & Unwrap</h1>
        <p className="text-muted-foreground">
          Create new index tokens by depositing the underlying assets, or break
          an index token back into its constituents
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Tabs defaultValue="wrap" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="wrap">Wrap</TabsTrigger>
            <TabsTrigger value="unwrap">Unwrap</TabsTrigger>
          </TabsList>
          <TabsContent value="wrap">
            <WrapTab />
          </TabsContent>
          <TabsContent value="unwrap">
            <UnwrapTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
