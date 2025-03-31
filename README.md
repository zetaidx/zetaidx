# zetaidx

zetaidx is an index token which is comprised of several ZRC20/ERC20 assets. You could have several different fund types like market cap weighted (btc 50%/eth 25%/etc) or total market (where every crypto is equally weighted) or meme coin only.

## Requirements

### Universal Token

It should use be a ZetaChain [universal token](https://www.zetachain.com/docs/developers/standards/token/) to allow trading on other networks.

### ERC20

It should be ERC20 compatible for easy use in wallets.

### Arbitrary ERC20s

Each deployment of the contract should accept any number of ERC20s and their ratios. This will make it easy to test and demo in testnet as we can just deploy some mock ERC20s that have unlimited minting.

Anyone should be able to deploy an instance of this contract with whatever ratio they want. The ratios will be fixed in the v1 deployment.

### Wrap/Unwrap

The main functions we need to implement on the contract are `wrap` and `unwrap`.

`wrap` will take custody of the ERC20 assets at the ratio specified from the user and mint our token.

`unwrap` will return those assets to the user.

### Liquidity

Most users would not want to take the time to do deposits on all networks and wrap/unwrap tokens. We should also consider deploy liquidity pools which allow easy onboarding. Pricing this swap will be challenging especially with low volume.