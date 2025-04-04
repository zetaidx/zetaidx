#!/bin/bash

set -e
set -o pipefail

# Cleanup function
cleanup() {
  echo -e "\n🛑 Stopping localnet..."
  pnpm exec hardhat localnet-stop
  rm -f contract.json
}

# Set up trap for cleanup on any exit
trap cleanup EXIT

pnpm exec hardhat localnet --exit-on-error --skip solana,sui & sleep 10
echo -e "\n🚀 Compiling contracts..."
pnpm exec hardhat compile --force --quiet

GATEWAY_ZETACHAIN=$(jq -r '.addresses[] | select(.type=="gatewayZEVM" and .chain=="zetachain") | .address' localnet.json)
UNISWAP_ROUTER=$(jq -r '.addresses[] | select(.type=="uniswapRouterInstance" and .chain=="zetachain") | .address' localnet.json)

CONTRACT_ZETACHAIN=$(pnpm exec hardhat token:deploy \
  --name ZetaIdxUniversalToken \
  --network localhost \
  --gateway "$GATEWAY_ZETACHAIN" \
  --uniswap-router "$UNISWAP_ROUTER" \
  --token-name "ZetaIdx" \
  --token-symbol "ZIDX" \
  --json | jq -r '.contractAddress')
echo -e "\n🚀 Deployed ZetaIdxUniversalToken contract on ZetaChain: $CONTRACT_ZETACHAIN"

# Write contract address to contract.json
echo "{}" | jq --arg addr "$CONTRACT_ZETACHAIN" '.address = $addr' > contract.json

# Deploy test tokens and capture their addresses
echo -e "\n🚀 Deploying test tokens..."
TOKEN_LIST=$(pnpm exec hardhat deployTestTokens --network localhost 2>&1 | tail -n 1)

# Get individual test token addresses
TEST_TOKEN1=$(echo $TOKEN_LIST | cut -d',' -f1)
TEST_TOKEN2=$(echo $TOKEN_LIST | cut -d',' -f2)
TEST_TOKEN3=$(echo $TOKEN_LIST | cut -d',' -f3)

# Initialize index with the deployed tokens
echo -e "\n🚀 Initializing index with deployed tokens..."
pnpm exec hardhat initializeIndex \
  --contract $CONTRACT_ZETACHAIN \
  --tokens "$TOKEN_LIST" \
  --ratios 50,30,20 \
  --price-symbols "BTC,ETH,DOGE" \
  --network localhost

# Get addresses from localnet.json
WZETA_ADDRESS=$(cat localnet.json | jq -r '.addresses[] | select(.type=="wzeta") | .address')
FACTORY_ADDRESS=$(cat localnet.json | jq -r '.addresses[] | select(.type=="uniswapFactoryInstance") | .address')
ROUTER_ADDRESS=$(cat localnet.json | jq -r '.addresses[] | select(.type=="uniswapRouterInstance") | .address')

# Wrap index tokens
pnpm exec hardhat wrap --network localhost --amount 100 --index-token $CONTRACT_ZETACHAIN

# Set up Uniswap liquidity pool
echo -e "\n🚀 Setting up Uniswap liquidity pool..."
pnpm exec hardhat setupPool \
  --network localhost \
  --index-token $CONTRACT_ZETACHAIN \
  --index-amount 100 \
  --wzeta $WZETA_ADDRESS \
  --wzeta-amount 100 \
  --factory $FACTORY_ADDRESS \
  --router $ROUTER_ADDRESS

# Only stop localnet if stop-after-setup argument is passed
if [ "$1" = "stop-after-setup" ]; then
  exit 0
else
  wait
fi
