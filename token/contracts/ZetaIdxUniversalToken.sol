// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@zetachain/standard-contracts/contracts/token/contracts/zetachain/UniversalToken.sol";

contract ZetaIdxUniversalToken is UniversalToken {
    struct TokenInfo {
        address token;
        uint256 ratio; // Percentage (1-100)
    }

    TokenInfo[] public basket;
    uint256 public constant TOTAL_RATIO = 100; // 100%
    bool public indexInitialized;

    error AlreadyInitialized();
    error InvalidInput();
    error InvalidRatio();

    modifier onlyOnce() {
        if (indexInitialized) revert AlreadyInitialized();
        _;
        indexInitialized = true;
    }

    function initializeIndex(
        address[] calldata tokens,
        uint256[] calldata ratios
    ) external onlyOnce onlyOwner {
        if (tokens.length != ratios.length || tokens.length == 0) revert InvalidInput();

        uint256 totalRatio;
        for (uint i = 0; i < tokens.length; i++) {
            if (tokens[i] == address(0) || ratios[i] == 0 || ratios[i] > 100) revert InvalidInput();
            basket.push(TokenInfo(tokens[i], ratios[i]));
            totalRatio += ratios[i];
        }

        if (totalRatio != TOTAL_RATIO) revert InvalidRatio();
    }

    function getTokenInfo(uint256 index) external view returns (address token, uint256 ratio) {
        TokenInfo memory t = basket[index];
        return (t.token, t.ratio);
    }

    function basketLength() external view returns (uint256) {
        return basket.length;
    }
}
