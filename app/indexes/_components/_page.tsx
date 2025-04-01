"use client";

import { useState } from "react";
import { Grid2X2, List, Filter, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IndexGrid } from "./index-grid";
import { IndexList } from "./index-list";
import { mockIndexes } from "@/lib/mock-data";

const themes = ["All", "DeFi", "Meme", "Blue-Chip", "Gaming", "Layer 1"];
const sortOptions = ["TVL", "24h Volume", "7d Performance", "30d Performance"];

export default function IndexesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [theme, setTheme] = useState("All");
  const [sortBy, setSortBy] = useState("TVL");

  // Filter indexes by theme
  const filteredIndexes =
    theme === "All"
      ? mockIndexes
      : mockIndexes.filter((index) => index.theme === theme);

  return (
    <div className="container py-8 md:py-12">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Explore Index Tokens
        </h1>
        <p className="text-muted-foreground">
          Diversified exposure across crypto markets — backed by decentralized assets
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter className="h-3.5 w-3.5" />
                {theme}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Filter by Theme</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {themes.map((t) => (
                  <DropdownMenuItem key={t} onClick={() => setTheme(t)}>
                    {t}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ArrowUpDown className="h-3.5 w-3.5" />
                Sort: {sortBy}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {sortOptions.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => setSortBy(option)}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            className="h-8 w-8"
            onClick={() => setViewMode("grid")}
          >
            <Grid2X2 className="h-4 w-4" />
            <span className="sr-only">Grid view</span>
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            className="h-8 w-8 ml-1"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
            <span className="sr-only">List view</span>
          </Button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <IndexGrid indexes={filteredIndexes} />
      ) : (
        <IndexList indexes={filteredIndexes} />
      )}
    </div>
  );
}
