import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";

import { ZetaIdxUniversalToken } from "../typechain-types";
import { TestToken } from "../typechain-types";

describe("ZetaIdxUniversalToken", function () {
  let indexToken: ZetaIdxUniversalToken;
  let testTokens: TestToken[];
  let owner: SignerWithAddress;
  let user: SignerWithAddress;
  let gateway: string;
  let uniswapRouter: string;

  const TOKEN_NAMES = ["Test BTC", "Test ETH", "Test DOGE"];
  const TOKEN_SYMBOLS = ["tBTC", "tETH", "tDOGE"];
  const INITIAL_SUPPLY = ethers.utils.parseEther("1000000");
  const RATIOS = [50, 30, 20]; // 50% BTC, 30% ETH, 20% DOGE
  const GAS_LIMIT = 1000000;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    // Deploy test tokens
    testTokens = [];
    for (let i = 0; i < TOKEN_NAMES.length; i++) {
      const TestToken = await ethers.getContractFactory("TestToken");
      const token = await TestToken.deploy(
        TOKEN_NAMES[i],
        TOKEN_SYMBOLS[i],
        INITIAL_SUPPLY
      );
      testTokens.push(token);
    }

    // Deploy index token using upgrades
    const ZetaIdxUniversalToken = await ethers.getContractFactory(
      "ZetaIdxUniversalToken"
    );
    gateway = "0x0000000000000000000000000000000000000001"; // Mock gateway
    uniswapRouter = "0x0000000000000000000000000000000000000002"; // Mock router
    indexToken = (await upgrades.deployProxy(
      ZetaIdxUniversalToken,
      [
        owner.address, // initialOwner
        "ZetaIdx", // name
        "ZIDX", // symbol
        gateway, // gatewayAddress
        GAS_LIMIT, // gas
        uniswapRouter, // uniswapRouterAddress
      ],
      {
        initializer: "initialize",
      }
    )) as ZetaIdxUniversalToken;

    // Initialize index
    await indexToken.initializeIndex(
      testTokens.map((t) => t.address),
      RATIOS
    );

    // Transfer some test tokens to user
    for (const token of testTokens) {
      await token.transfer(user.address, ethers.utils.parseEther("1000"));
    }
  });

  describe("Initialization", function () {
    it("should initialize with correct tokens and ratios", async function () {
      for (let i = 0; i < testTokens.length; i++) {
        const [token, ratio] = await indexToken.getTokenInfo(i);
        expect(token).to.equal(testTokens[i].address);
        expect(ratio).to.equal(RATIOS[i]);
      }
    });

    it("should not allow initialization twice", async function () {
      await expect(
        indexToken.initializeIndex(
          testTokens.map((t) => t.address),
          RATIOS
        )
      ).to.be.revertedWithCustomError(indexToken, "AlreadyInitialized");
    });

    it("should not allow initialization with invalid ratios", async function () {
      // Deploy a new instance for this test
      const ZetaIdxUniversalToken = await ethers.getContractFactory(
        "ZetaIdxUniversalToken"
      );
      const newIndexToken = (await upgrades.deployProxy(
        ZetaIdxUniversalToken,
        [
          owner.address, // initialOwner
          "ZetaIdx", // name
          "ZIDX", // symbol
          gateway, // gatewayAddress
          GAS_LIMIT, // gas
          uniswapRouter, // uniswapRouterAddress
        ],
        {
          initializer: "initialize",
        }
      )) as ZetaIdxUniversalToken;

      const invalidRatios = [40, 30, 20]; // Sums to 90, not 100
      await expect(
        newIndexToken.initializeIndex(
          testTokens.map((t) => t.address),
          invalidRatios
        )
      ).to.be.revertedWithCustomError(newIndexToken, "InvalidRatio");
    });
  });

  describe("Wrap", function () {
    it("should wrap tokens correctly", async function () {
      const wrapAmount = ethers.utils.parseEther("100");

      // Check initial balance is 0
      expect(await indexToken.balanceOf(user.address)).to.equal(0);

      // Check contract has no underlying tokens
      for (const token of testTokens) {
        expect(await token.balanceOf(indexToken.address)).to.equal(0);
      }

      // Approve tokens
      for (let i = 0; i < testTokens.length; i++) {
        const tokenAmount = wrapAmount.mul(RATIOS[i]).div(100);
        await testTokens[i]
          .connect(user)
          .approve(indexToken.address, tokenAmount);
      }

      // Wrap tokens
      await indexToken.connect(user).wrap(wrapAmount);

      // Check user received index tokens
      expect(await indexToken.balanceOf(user.address)).to.equal(wrapAmount);

      // Check contract received underlying tokens
      for (let i = 0; i < testTokens.length; i++) {
        const tokenAmount = wrapAmount.mul(RATIOS[i]).div(100);
        expect(await testTokens[i].balanceOf(indexToken.address)).to.equal(
          tokenAmount
        );
      }
    });

    it("should not allow wrap before initialization", async function () {
      const newIndexToken = (await upgrades.deployProxy(
        await ethers.getContractFactory("ZetaIdxUniversalToken"),
        [
          owner.address, // initialOwner
          "ZetaIdx", // name
          "ZIDX", // symbol
          gateway, // gatewayAddress
          GAS_LIMIT, // gas
          uniswapRouter, // uniswapRouterAddress
        ],
        {
          initializer: "initialize",
        }
      )) as ZetaIdxUniversalToken;

      await expect(
        newIndexToken.connect(user).wrap(ethers.utils.parseEther("100"))
      ).to.be.revertedWithCustomError(newIndexToken, "NotInitialized");
    });
  });

  describe("Unwrap", function () {
    beforeEach(async function () {
      // First wrap some tokens
      const wrapAmount = ethers.utils.parseEther("100");

      // Approve tokens
      for (let i = 0; i < testTokens.length; i++) {
        const tokenAmount = wrapAmount.mul(RATIOS[i]).div(100);
        await testTokens[i]
          .connect(user)
          .approve(indexToken.address, tokenAmount);
      }

      // Wrap tokens
      await indexToken.connect(user).wrap(wrapAmount);
    });

    it("should unwrap tokens correctly", async function () {
      const unwrapAmount = ethers.utils.parseEther("50");
      const wrapAmount = ethers.utils.parseEther("100");

      // Check initial balances
      expect(await indexToken.balanceOf(user.address)).to.equal(wrapAmount);
      for (let i = 0; i < testTokens.length; i++) {
        const tokenAmount = wrapAmount.mul(RATIOS[i]).div(100);
        expect(await testTokens[i].balanceOf(indexToken.address)).to.equal(
          tokenAmount
        );
      }

      // Approve index tokens for unwrap
      await indexToken.connect(user).approve(indexToken.address, unwrapAmount);

      // Unwrap tokens
      await indexToken.connect(user).unwrap(unwrapAmount);

      // Check user's index token balance decreased
      expect(await indexToken.balanceOf(user.address)).to.equal(
        wrapAmount.sub(unwrapAmount)
      );

      // Check user received underlying tokens
      for (let i = 0; i < testTokens.length; i++) {
        const tokenAmount = unwrapAmount.mul(RATIOS[i]).div(100);
        expect(await testTokens[i].balanceOf(user.address)).to.equal(
          ethers.utils.parseEther("1000").sub(tokenAmount)
        );
      }
    });

    it("should not allow unwrap without sufficient balance", async function () {
      const tooMuch = ethers.utils.parseEther("1000");
      await expect(
        indexToken.connect(user).unwrap(tooMuch)
      ).to.be.revertedWithCustomError(indexToken, "ERC20InsufficientBalance");
    });
  });
});
