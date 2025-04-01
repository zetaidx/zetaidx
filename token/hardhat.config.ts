import "@nomicfoundation/hardhat-toolbox";
import { HardhatUserConfig } from "hardhat/config";
import * as dotenv from "dotenv";

import "@zetachain/standard-contracts/tasks/token";
import "@zetachain/localnet/tasks";
import "@zetachain/toolkit/tasks";
import { getHardhatConfig } from "@zetachain/toolkit/client";

import "@nomiclabs/hardhat-ethers";
import "@openzeppelin/hardhat-upgrades";
import "./tasks";

dotenv.config();

const config: HardhatUserConfig = {
  ...getHardhatConfig({ accounts: [process.env.PRIVATE_KEY] }),
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
  networks: {
    hardhat: {
      chainId: 1337,
      accounts: {
        mnemonic: "test test test test test test test test test test test junk",
      },
    },
  },
};

export default config;
