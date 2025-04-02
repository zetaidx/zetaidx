"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Indexes", href: "/indexes" },
  { name: "Trade", href: "/trade" },
  { name: "Wrap/Unwrap", href: "/wrap-unwrap" },
  { name: "Info", href: "/info" },
];

export default function Header() {
  const pathname = usePathname();
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              ZetaIdx
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {signerStatus.isInitializing ? (
            <span className="text-sm">Loading...</span>
          ) : user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm md:inline">
                {user.email ??
                  `${user.address.substring(0, 6)}...${user.address.substring(
                    user.address.length - 4
                  )}`}
              </span>
              <Button variant="outline" size="sm" onClick={() => logout()}>
                Log out
              </Button>
            </div>
          ) : (
            <Button variant="default" size="sm" onClick={openAuthModal}>
              Login
            </Button>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
