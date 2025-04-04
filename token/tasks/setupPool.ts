const { task } = require("hardhat/config");
const { parseEther } = require("ethers/lib/utils");
const ethers = require("ethers");

task("setupPool", "Set up Uniswap liquidity pool for index token")
  .addParam("indexToken", "Address of the index token")
  .addParam("wzeta", "Address of WZETA token")
  .addParam("factory", "Address of Uniswap factory")
  .addParam("router", "Address of Uniswap router")
  .addParam("wzetaAmount", "Amount of WZETA to add to pool")
  .addParam("indexAmount", "Amount of index token to add to pool")
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

    // Check balances
    const wzetaBalance = await wzeta.balanceOf(deployer.address);
    const indexBalance = await indexToken.balanceOf(deployer.address);

    // Get token amounts for liquidity
    const wzetaAmount = parseEther(taskArgs.wzetaAmount.toString());
    const indexAmount = parseEther(taskArgs.indexAmount.toString());

    // Check if we have enough balance
    if (wzetaBalance.lt(wzetaAmount)) {
      console.log("Insufficient WZETA balance. Please get more WZETA first.");
      return;
    }
    if (indexBalance.lt(indexAmount)) {
      console.log("Insufficient Index Token balance. Please wrap tokens first.");
      return;
    }

    // Check if pair exists
    const existingPair = await factory.getPair(wzeta.address, indexToken.address);
    if (existingPair === ethers.constants.AddressZero) {
      // Create pair if it doesn't exist
      const [pairToken0, pairToken1] =
        taskArgs.indexToken < taskArgs.wzeta
          ? [taskArgs.indexToken, taskArgs.wzeta]
          : [taskArgs.wzeta, taskArgs.indexToken];

      console.log("Creating new pair...");
      const createPairTx = await factory.createPair(pairToken0, pairToken1, {
        gasLimit: 5000000,
      });
      await createPairTx.wait();
      console.log("Pair created successfully");
    } else {
      console.log("Pair already exists at:", existingPair);
    }

    // Approve router to spend tokens
    console.log("Approving WZETA...");
    const wzetaApproveTx = await wzeta.approve(router.address, wzetaAmount, {
      gasLimit: 100000,
    });
    await wzetaApproveTx.wait();

    console.log("Approving Index Token...");
    const indexApproveTx = await indexToken.approve(
      router.address,
      indexAmount,
      {
        gasLimit: 100000,
      }
    );
    await indexApproveTx.wait();

    // Add liquidity
    console.log("Adding liquidity...");
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
    console.log("Liquidity added to pool at:", pairAddress);
  });
