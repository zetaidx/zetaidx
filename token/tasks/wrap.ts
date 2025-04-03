const { task } = require("hardhat/config");
const { parseEther } = require("ethers/lib/utils");
const ethers = require("ethers");

task("wrap", "Wrap tokens to create index tokens")
  .addParam("indexToken", "Address of the index token")
  .addParam("amount", "Amount of index tokens to create")
  .setAction(async (taskArgs: any, hre: any) => {
    const [deployer] = await hre.ethers.getSigners();

    const indexToken = await hre.ethers.getContractAt(
      "ZetaIdxUniversalToken",
      taskArgs.indexToken
    );

    // Get basket info to know which tokens we need to approve
    const [tokens, ratios, , decimals] = await indexToken.getIndexComposition();

    // Calculate amount to wrap
    const wrapAmount = parseEther(taskArgs.amount);

    // Helper function to adjust amounts for decimals
    const adjustForDecimals = (amount: any, tokenDecimals: number) => {
      if (tokenDecimals < 18) {
        return amount.div(ethers.BigNumber.from(10).pow(18 - tokenDecimals));
      } else if (tokenDecimals > 18) {
        return amount.mul(ethers.BigNumber.from(10).pow(tokenDecimals - 18));
      }
      return amount;
    };

    // Check balances and approve each token with correct amount
    for (let i = 0; i < tokens.length; i++) {
      const token = await hre.ethers.getContractAt("IERC20", tokens[i]);
      const tokenAmount = wrapAmount.mul(ratios[i]).div(100);
      const adjustedAmount = adjustForDecimals(tokenAmount, decimals[i]);
      
      // Check if user has sufficient balance
      const balance = await token.balanceOf(deployer.address);
      if (balance.lt(adjustedAmount)) {
        throw new Error(`Insufficient balance for token ${tokens[i]}. Required: ${adjustedAmount.toString()}, Available: ${balance.toString()}`);
      }
      
      console.log(`Approving ${adjustedAmount.toString()} tokens for ${tokens[i]}`);
      await token.approve(taskArgs.indexToken, adjustedAmount);
    }

    // Execute wrap
    const wrapTx = await indexToken.wrap(wrapAmount);
    await wrapTx.wait();
    console.log(`Successfully wrapped ${taskArgs.amount} index tokens`);
  }); 