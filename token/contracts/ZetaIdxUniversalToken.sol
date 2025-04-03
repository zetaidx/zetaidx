// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@zetachain/standard-contracts/contracts/token/contracts/zetachain/UniversalToken.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

contract ZetaIdxUniversalToken is UniversalToken {
    struct TokenInfo {
        address token;
        uint256 ratio; // Percentage (1-100)
        string priceSymbol; // symbol used to query price info
        uint8 decimals; // token decimals
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
        uint256[] calldata ratios,
        string[] calldata priceSymbols
    ) external onlyOnce onlyOwner {
        if (tokens.length != ratios.length || tokens.length != priceSymbols.length || tokens.length == 0) revert InvalidInput();

        uint256 totalRatio;
        for (uint i = 0; i < tokens.length; i++) {
            if (tokens[i] == address(0) || ratios[i] == 0 || ratios[i] > 100) revert InvalidInput();
            uint8 decimals = IERC20Metadata(tokens[i]).decimals();
            basket.push(TokenInfo({
                token: tokens[i],
                ratio: ratios[i],
                priceSymbol: priceSymbols[i],
                decimals: decimals
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
            
            // Adjust for decimals difference
            if (tokenInfo.decimals < 18) {
                tokenAmount = tokenAmount / (10 ** (18 - tokenInfo.decimals));
            } else if (tokenInfo.decimals > 18) {
                tokenAmount = tokenAmount * (10 ** (tokenInfo.decimals - 18));
            }
            
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
            
            // Adjust for decimals difference
            if (tokenInfo.decimals < 18) {
                tokenAmount = tokenAmount / (10 ** (18 - tokenInfo.decimals));
            } else if (tokenInfo.decimals > 18) {
                tokenAmount = tokenAmount * (10 ** (tokenInfo.decimals - 18));
            }
            
            bool success = IERC20(tokenInfo.token).transfer(msg.sender, tokenAmount);
            if (!success) revert TransferFailed();
        }

        emit Unwrapped(msg.sender, amount);
    }

    // View functions for UI
    function getIndexComposition() external view returns (
        address[] memory tokens,
        uint256[] memory ratios,
        string[] memory priceSymbols,
        uint8[] memory decimals
    ) {
        tokens = new address[](basket.length);
        ratios = new uint256[](basket.length);
        priceSymbols = new string[](basket.length);
        decimals = new uint8[](basket.length);

        for (uint i = 0; i < basket.length; i++) {
            tokens[i] = basket[i].token;
            ratios[i] = basket[i].ratio;
            priceSymbols[i] = basket[i].priceSymbol;
            decimals[i] = basket[i].decimals;
        }
    }

    function getTokenInfo(uint256 index) external view returns (
        address token,
        uint256 ratio,
        string memory priceSymbol,
        uint8 decimals
    ) {
        TokenInfo memory t = basket[index];
        return (t.token, t.ratio, t.priceSymbol, t.decimals);
    }

    function basketLength() external view returns (uint256) {
        return basket.length;
    }
}
