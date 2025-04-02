// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@zetachain/standard-contracts/contracts/token/contracts/zetachain/UniversalToken.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

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
    error NotInitialized();

    event Wrapped(address indexed user, uint256 amount);
    event Unwrapped(address indexed user, uint256 amount);

    modifier onlyOnce() {
        if (indexInitialized) revert AlreadyInitialized();
        _;
        indexInitialized = true;
    }

    modifier whenInitialized() {
        if (!indexInitialized) revert NotInitialized();
        _;
    }

    function initializeIndex(
        address[] calldata tokens,
        uint256[] calldata ratios
    ) external onlyOnce onlyOwner {
        if (tokens.length != ratios.length || tokens.length == 0) revert InvalidInput();

        uint256 totalRatio;
        for (uint i = 0; i < tokens.length; i++) {
            if (tokens[i] == address(0) || ratios[i] == 0 || ratios[i] > 100) revert InvalidInput();
            basket.push(TokenInfo({
                token: tokens[i],
                ratio: ratios[i]
            }));
            totalRatio += ratios[i];
        }

        if (totalRatio != TOTAL_RATIO) revert InvalidRatio();
    }

    function wrap(uint256 amount) external whenInitialized {
        require(amount > 0, "Amount must be greater than 0");
        require(basket.length > 0, "Index not initialized");
        require(!paused(), "Token is paused");
        
        // Transfer tokens from user
        for (uint256 i = 0; i < basket.length; i++) {
            TokenInfo memory tokenInfo = basket[i];
            uint256 tokenAmount = (amount * tokenInfo.ratio) / TOTAL_RATIO;
            IERC20(tokenInfo.token).transferFrom(msg.sender, address(this), tokenAmount);
        }

        // Mint index tokens to user
        _mint(msg.sender, amount);
        emit Wrapped(msg.sender, amount);
    }

    function unwrap(uint256 amount) external whenInitialized {
        // Burn user's index tokens
        _burn(msg.sender, amount);

        // Transfer underlying tokens back to user
        for (uint i = 0; i < basket.length; i++) {
            TokenInfo memory tokenInfo = basket[i];
            uint256 tokenAmount = (amount * tokenInfo.ratio) / TOTAL_RATIO;
            
            bool success = IERC20(tokenInfo.token).transfer(msg.sender, tokenAmount);
            if (!success) revert TransferFailed();
        }

        emit Unwrapped(msg.sender, amount);
    }

    // View functions for UI
    function getIndexComposition() external view returns (
        address[] memory tokens,
        uint256[] memory ratios
    ) {
        tokens = new address[](basket.length);
        ratios = new uint256[](basket.length);

        for (uint i = 0; i < basket.length; i++) {
            tokens[i] = basket[i].token;
            ratios[i] = basket[i].ratio;
        }
    }

    function getTokenInfo(uint256 index) external view returns (
        address token,
        uint256 ratio
    ) {
        TokenInfo memory t = basket[index];
        return (t.token, t.ratio);
    }

    function basketLength() external view returns (uint256) {
        return basket.length;
    }
}
