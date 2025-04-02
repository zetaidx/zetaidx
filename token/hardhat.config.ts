import "@nomicfoundation/hardhat-toolbox";
import "@zetachain/standard-contracts/tasks/token";
import "@zetachain/localnet/tasks";
import "@zetachain/toolkit/tasks";
import "@nomiclabs/hardhat-ethers";
import "@openzeppelin/hardhat-upgrades";
import "./tasks";

import { getHardhatConfig } from "@zetachain/toolkit/client";
import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";

dotenv.config();

const config: HardhatUserConfig = {
  ...getHardhatConfig({ accounts: [process.env.PRIVATE_KEY] }),
  networks: {
    hardhat: {
      accounts: {
        mnemonic: "test test test test test test test test test test test junk",
      },
      chainId: 1337,
    },
  },
  solidity: {
    compilers: [
      {
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
        version: "0.8.26",
      },
    ],
  },
};

export default config;
