const { task } = require("hardhat/config");
const { parseEther } = require("ethers/lib/utils");

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
    const [tokens, ratios] = await indexToken.getIndexComposition();

    // Calculate amount to wrap
    const wrapAmount = parseEther(taskArgs.amount);

    // Check balances and approve each token with correct amount
    for (let i = 0; i < tokens.length; i++) {
      const token = await hre.ethers.getContractAt("IERC20", tokens[i]);
      const tokenAmount = wrapAmount.mul(ratios[i]).div(100);
      
      // Check if user has sufficient balance
      const balance = await token.balanceOf(deployer.address);
      if (balance.lt(tokenAmount)) {
        throw new Error(`Insufficient balance for token ${tokens[i]}. Required: ${tokenAmount.toString()}, Available: ${balance.toString()}`);
      }
      
      console.log(`Approving ${tokenAmount.toString()} tokens for ${tokens[i]}`);
      await token.approve(taskArgs.indexToken, tokenAmount);
    }

    // Wrap tokens
    console.log(`Wrapping ${wrapAmount.toString()} tokens...`);
    const wrapTx = await indexToken.wrap(wrapAmount, { gasLimit: 500000});
    await wrapTx.wait();
    console.log("Wrap successful!");
  }); 