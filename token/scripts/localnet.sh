#!/bin/bash

set -e
set -x
set -o pipefail

npx hardhat localnet --exit-on-error --skip solana,sui & sleep 25
echo -e "\n🚀 Compiling contracts..."
npx hardhat compile --force --quiet

GATEWAY_ZETACHAIN=$(jq -r '.addresses[] | select(.type=="gatewayZEVM" and .chain=="zetachain") | .address' localnet.json)
UNISWAP_ROUTER=$(jq -r '.addresses[] | select(.type=="uniswapRouterInstance" and .chain=="zetachain") | .address' localnet.json)

CONTRACT_ZETACHAIN=$(npx hardhat token:deploy --name ZetaIdxUniversalToken --network localhost --gateway "$GATEWAY_ZETACHAIN" --uniswap-router "$UNISWAP_ROUTER" --json | jq -r '.contractAddress')
echo -e "\n🚀 Deployed ZetaIdxUniversalToken contract on ZetaChain: $CONTRACT_ZETACHAIN"

# Deploy test tokens and capture their addresses
echo -e "\n🚀 Deploying test tokens..."
TOKEN_LIST=$(npx hardhat deployTestTokens --network localhost 2>&1 | tail -n 1)

# Initialize index with the deployed tokens
echo -e "\n🚀 Initializing index with deployed tokens..."
npx hardhat initializeIndex \
  --contract $CONTRACT_ZETACHAIN \
  --tokens "$TOKEN_LIST" \
  --ratios 50,30,20 \
  --network localhost

# Only stop localnet if setup-only argument is passed
if [ "$1" = "setup-only" ]; then
    npx hardhat localnet-stop
fi