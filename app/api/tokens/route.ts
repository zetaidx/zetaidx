import { NextRequest, NextResponse } from "next/server";
import { getAddressBalance } from "@/lib/alchemy/getAddressBalance";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json(
      { error: "Wallet address is required" },
      { status: 400 }
    );
  }

  try {
    const tokens = await getAddressBalance(address);
    return NextResponse.json(tokens);
  } catch (error) {
    console.error("Error fetching token balances:", error);
    return NextResponse.json(
      { error: "Failed to fetch token balances" },
      { status: 500 }
    );
  }
}
