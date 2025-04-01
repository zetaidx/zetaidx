"use client"
import Link from "next/link"
import { ExternalLink, Github, Twitter, MessageSquare, FileText, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// FAQ data
const faqs = [
  {
    question: "How are index token prices determined?",
    answer:
      "Index token prices are determined by the value of the underlying assets in the index. Each index token represents a proportional claim on the basket of assets held in the index's reserve. The price is calculated based on the Net Asset Value (NAV) of these underlying tokens, and can be influenced by market demand and liquidity.",
  },
  {
    question: "What happens during rebalancing?",
    answer:
      "Rebalancing is the process of adjusting the composition of an index to maintain its target allocations. When an index rebalances, it may sell tokens that have become overweight and buy tokens that have become underweight. This ensures the index maintains its intended strategy and exposure. Rebalancing typically occurs on a regular schedule (monthly or quarterly) or when allocations deviate significantly from targets.",
  },
  {
    question: "Are there fees for wrapping or unwrapping?",
    answer:
      "Yes, there are small fees associated with wrapping and unwrapping index tokens. When wrapping, a fee of 0.3% is charged on the value of assets being deposited. When unwrapping, a fee of 0.2% is charged on the value of the index token being redeemed. These fees help maintain the protocol and incentivize liquidity providers.",
  },
  {
    question: "Which wallets are supported?",
    answer:
      "Zetaidx supports most major Ethereum-compatible wallets including MetaMask, WalletConnect, Coinbase Wallet, and Trust Wallet. Any wallet that supports ERC-20 tokens and can connect to decentralized applications should work with our platform.",
  },
  {
    question: "How is liquidity provided for index tokens?",
    answer:
      "Liquidity for index tokens is provided through decentralized exchanges and dedicated liquidity pools. The protocol incentivizes liquidity providers by sharing a portion of the trading fees. Additionally, the wrap and unwrap functionality creates a price floor and ceiling, as users can always create or redeem index tokens based on the value of the underlying assets.",
  },
]

export default function InfoPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">About Zetaidx</h1>
        <p className="text-muted-foreground">Learn more about the Zetaidx platform and how it works</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
          {/* About Section */}
          <Card>
            <CardHeader>
              <CardTitle>What is Zetaidx?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Zetaidx is a cross-chain index token platform built on ZetaChain that enables users to gain diversified
                exposure to various crypto markets through a single token. Each index token represents a basket of
                underlying assets, carefully selected and weighted to provide optimal exposure to specific market
                segments or themes.
              </p>
              <p>
                Our platform supports various index strategies, including market-cap weighted indexes, equal-weighted
                portfolios, and thematic collections (e.g., meme coins, DeFi protocols, or Layer 1 blockchains). By
                holding a single Zetaidx token, you gain exposure to multiple assets without the complexity of managing
                them individually.
              </p>
              <p>
                Zetaidx tokens are fully backed by reserves of the underlying assets, ensuring that each index token
                maintains its value relative to its components. Users can trade index tokens on decentralized exchanges,
                or wrap and unwrap them to convert between the index token and its constituent assets.
              </p>
              <p>
                The platform leverages ZetaChain's cross-chain capabilities to include assets from multiple blockchains
                in a single index, providing truly diversified exposure across the crypto ecosystem.
              </p>
            </CardContent>
          </Card>

          {/* FAQs Section */}
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Disclaimer Section */}
          <Card>
            <CardHeader>
              <CardTitle>Disclaimers & Legal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground space-y-2 max-h-40 overflow-y-auto pr-2">
                <p>
                  The information provided on this platform is for general informational purposes only and does not
                  constitute financial advice. Cryptocurrency investments are volatile and high-risk. The value of index
                  tokens can fluctuate significantly, and past performance is not indicative of future results.
                </p>
                <p>
                  Users should conduct their own research and consult with a qualified financial advisor before making
                  any investment decisions. Zetaidx does not guarantee the accuracy of information provided on the
                  platform or the performance of any index tokens.
                </p>
                <p>
                  By using this platform, you acknowledge and accept the inherent risks associated with cryptocurrency
                  investments and decentralized finance. Zetaidx is not responsible for any losses incurred through the
                  use of the platform.
                </p>
                <p>
                  Smart contracts used by Zetaidx have been audited, but this does not guarantee they are free from
                  vulnerabilities or bugs. Users should exercise caution and never invest more than they can afford to
                  lose.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
              <CardDescription>Resources and community links</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  <FileText className="mr-2 h-4 w-4" />
                  Documentation
                  <ExternalLink className="ml-auto h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  <Shield className="mr-2 h-4 w-4" />
                  Audit Reports
                  <ExternalLink className="ml-auto h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                  <ExternalLink className="ml-auto h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  <Twitter className="mr-2 h-4 w-4" />
                  Twitter
                  <ExternalLink className="ml-auto h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Discord
                  <ExternalLink className="ml-auto h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
              <CardDescription>New to Zetaidx? Start here</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" asChild>
                <Link href="/indexes">Explore Indexes</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/info">Learn More</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

