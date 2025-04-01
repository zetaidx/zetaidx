const { task } = require("hardhat/config");

task("deployTestTokens", "Deploys 3 test ERC20 tokens").setAction(
  async (_: any, hre: any) => {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying test tokens from:", deployer.address);

    const TestToken = await hre.ethers.getContractFactory("TestToken");

    const tokens = [
      { name: "Mock BTC", symbol: "mBTC" },
      { name: "Mock ETH", symbol: "mETH" },
      { name: "Mock DOGE", symbol: "mDOGE" },
    ];

    const addresses = [];
    for (const token of tokens) {
      const instance = await TestToken.deploy(
        token.name,
        token.symbol,
        hre.ethers.utils.parseEther("1000000")
      );
      await instance.deployed();
      console.log(`✅ ${token.symbol} deployed at:`, instance.address);
      addresses.push(instance.address);
    }

    console.log(addresses.join(","));
  }
);
