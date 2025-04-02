const { task } = require("hardhat/config");

task("initializeIndex", "Initializes the index basket")
  .addParam("contract", "The deployed contract address")
  .addParam("tokens", "Comma-separated list of token addresses")
  .addParam("ratios", "Comma-separated list of ratios")
  .addParam("priceSymbols", "Comma-separated list of token symbols")
  .setAction(async (taskArgs: any, hre: any) => {
    const contractAddr = taskArgs.contract;
    const tokens = taskArgs.tokens.split(",");
    const ratios = taskArgs.ratios.split(",").map((r: any) => BigInt(r));
    const priceSymbols = taskArgs.priceSymbols.split(",");

    const contract = await hre.ethers.getContractAt(
      "ZetaIdxUniversalToken",
      contractAddr
    );

    const tx = await contract.initializeIndex(tokens, ratios, priceSymbols);
    console.log("initializeIndex tx:", tx.hash);
    await tx.wait();
    console.log("✅ Index initialized successfully.");

    const length = await contract.basketLength();
    console.log(`📦 Basket contains ${length} tokens:`);

    for (let i = 0; i < length; i++) {
      const [token, ratio, priceSymbol] = await contract.getTokenInfo(i);
      console.log(
        `- Token ${i}: ${token} (Ratio: ${ratio.toString()}, Price Symbol: ${priceSymbol})`
      );
    }
  });
