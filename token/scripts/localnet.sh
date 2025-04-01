#!/bin/bash

set -e
set -o pipefail

# Cleanup function
cleanup() {
    echo -e "\n🛑 Stopping localnet..."
    npx hardhat localnet-stop
    rm -f contract.json
}

# Set up trap for cleanup on any exit
trap cleanup EXIT

npx hardhat localnet --exit-on-error --skip solana,sui & sleep 10
echo -e "\n🚀 Compiling contracts..."
npx hardhat compile --force --quiet

GATEWAY_ZETACHAIN=$(jq -r '.addresses[] | select(.type=="gatewayZEVM" and .chain=="zetachain") | .address' localnet.json)
UNISWAP_ROUTER=$(jq -r '.addresses[] | select(.type=="uniswapRouterInstance" and .chain=="zetachain") | .address' localnet.json)

CONTRACT_ZETACHAIN=$(npx hardhat token:deploy --name ZetaIdxUniversalToken --network localhost --gateway "$GATEWAY_ZETACHAIN" --uniswap-router "$UNISWAP_ROUTER" --json | jq -r '.contractAddress')
echo -e "\n🚀 Deployed ZetaIdxUniversalToken contract on ZetaChain: $CONTRACT_ZETACHAIN"

# Write contract address to contract.json
echo "{}" | jq --arg addr "$CONTRACT_ZETACHAIN" '.address = $addr' > contract.json

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

# Only stop localnet if stop-after-setup argument is passed
if [ "$1" = "stop-after-setup" ]; then
    exit 0
else
    wait
fi
