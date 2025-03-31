#!/bin/bash

set -e
set -x
set -o pipefail

npx hardhat localnet --exit-on-error & sleep 25
echo -e "\n🚀 Compiling contracts..."
npx hardhat compile --force --quiet

GATEWAY_ZETACHAIN=$(jq -r '.addresses[] | select(.type=="gatewayZEVM" and .chain=="zetachain") | .address' localnet.json)
UNISWAP_ROUTER=$(jq -r '.addresses[] | select(.type=="uniswapRouterInstance" and .chain=="zetachain") | .address' localnet.json)

CONTRACT_ZETACHAIN=$(npx hardhat token:deploy --name ZetaIdxUniversalToken --network localhost --gateway "$GATEWAY_ZETACHAIN" --uniswap-router "$UNISWAP_ROUTER" --json | jq -r '.contractAddress')
echo -e "\n🚀 Deployed ZetaIdxUniversalToken contract on ZetaChain: $CONTRACT_ZETACHAIN"


npx hardhat localnet-stop