const { task } = require("hardhat/config");
const { parseEther, formatEther } = require("ethers/lib/utils");

task("setupPool", "Set up Uniswap liquidity pool for index token")
  .addParam("indexToken", "Address of the index token")
  .addParam("wzeta", "Address of WZETA token")
  .addParam("factory", "Address of Uniswap factory")
  .addParam("router", "Address of Uniswap router")
  .addParam("testToken1", "Address of first test token")
  .addParam("testToken2", "Address of second test token")
  .addParam("testToken3", "Address of third test token")
  .setAction(async (taskArgs: any, hre: any) => {
    const [deployer] = await hre.ethers.getSigners();

    const indexToken = await hre.ethers.getContractAt(
      "ZetaIdxUniversalToken",
      taskArgs.indexToken
    );
    const wzeta = await hre.ethers.getContractAt("IWZETA", taskArgs.wzeta);
    const factory = await hre.ethers.getContractAt(
      "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol:IUniswapV2Factory",
      taskArgs.factory
    );
    const router = await hre.ethers.getContractAt(
      "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol:IUniswapV2Router02",
      taskArgs.router
    );

    // Get test token contracts
    const token1 = await hre.ethers.getContractAt(
      "TestToken",
      taskArgs.testToken1
    );
    const token2 = await hre.ethers.getContractAt(
      "TestToken",
      taskArgs.testToken2
    );
    const token3 = await hre.ethers.getContractAt(
      "TestToken",
      taskArgs.testToken3
    );

    // Check balances
    const wzetaBalance = await wzeta.balanceOf(deployer.address);
    const indexBalance = await indexToken.balanceOf(deployer.address);

    // Get token amounts for liquidity
    const wzetaAmount = parseEther("100"); // 100 WZETA
    const indexAmount = parseEther("100"); // 100 index tokens

    // Wrap some tokens if needed
    if (indexBalance.lt(indexAmount)) {
      const wrapAmount = parseEther("100"); // Wrap 100 tokens

      // Get ratios from the contract
      const token1Basket = await indexToken.basket(0);
      const token2Basket = await indexToken.basket(1);
      const token3Basket = await indexToken.basket(2);

      // Extract token info from basket - the ratio is at index 1
      const token1Ratio = token1Basket[1];
      const token2Ratio = token2Basket[1];
      const token3Ratio = token3Basket[1];

      // Calculate amounts based on ratios (ratios are percentages 1-100)
      const token1Amount = wrapAmount.mul(token1Ratio).div(100);
      const token2Amount = wrapAmount.mul(token2Ratio).div(100);
      const token3Amount = wrapAmount.mul(token3Ratio).div(100);

      // Approve test tokens with correct amounts
      await token1.approve(taskArgs.indexToken, token1Amount, {
        gasLimit: 100000,
      });
      await token2.approve(taskArgs.indexToken, token2Amount, {
        gasLimit: 100000,
      });
      await token3.approve(taskArgs.indexToken, token3Amount, {
        gasLimit: 100000,
      });

      const wrapTx = await indexToken.wrap(wrapAmount, {
        gasLimit: 500000,
      });
      await wrapTx.wait();
    }

    // Check if we have enough balance
    if (wzetaBalance.lt(wzetaAmount)) {
      console.log("Insufficient WZETA balance");
      return;
    }
    const finalIndexBalance = await indexToken.balanceOf(deployer.address);
    if (finalIndexBalance.lt(indexAmount)) {
      console.log("Insufficient Index Token balance");
      return;
    }

    // Create pair first
    const [pairToken0, pairToken1] =
      taskArgs.indexToken < taskArgs.wzeta
        ? [taskArgs.indexToken, taskArgs.wzeta]
        : [taskArgs.wzeta, taskArgs.indexToken];

    const createPairTx = await factory.createPair(pairToken0, pairToken1, {
      gasLimit: 5000000,
    });
    await createPairTx.wait();

    // Approve router to spend tokens
    const wzetaApproveTx = await wzeta.approve(router.address, wzetaAmount, {
      gasLimit: 100000,
    });
    await wzetaApproveTx.wait();

    const indexApproveTx = await indexToken.approve(
      router.address,
      indexAmount,
      {
        gasLimit: 100000,
      }
    );
    await indexApproveTx.wait();

    // Add liquidity
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from now
    const addLiquidityTx = await router.addLiquidity(
      wzeta.address,
      indexToken.address,
      wzetaAmount,
      indexAmount,
      wzetaAmount.mul(90).div(100), // 10% slippage
      indexAmount.mul(90).div(100), // 10% slippage
      deployer.address,
      deadline,
      {
        gasLimit: 500000,
      }
    );
    await addLiquidityTx.wait();

    // Get pool address
    const pairAddress = await factory.getPair(
      wzeta.address,
      indexToken.address
    );
    console.log("Pool created at:", pairAddress);
  });
