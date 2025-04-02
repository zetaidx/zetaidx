import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ZetaIdxUniversalToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const zetaIdxUniversalTokenAbi = [
  { type: 'error', inputs: [], name: 'AdditionsOverflow' },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  { type: 'error', inputs: [], name: 'AlreadyInitialized' },
  { type: 'error', inputs: [], name: 'ApproveFailed' },
  { type: 'error', inputs: [], name: 'CantBeIdenticalAddresses' },
  { type: 'error', inputs: [], name: 'CantBeZeroAddress' },
  {
    type: 'error',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1967InvalidImplementation',
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  { type: 'error', inputs: [], name: 'FailedCall' },
  { type: 'error', inputs: [], name: 'IdenticalAddresses' },
  { type: 'error', inputs: [], name: 'InsufficientInputAmount' },
  { type: 'error', inputs: [], name: 'InsufficientLiquidity' },
  { type: 'error', inputs: [], name: 'InvalidAddress' },
  { type: 'error', inputs: [], name: 'InvalidGasLimit' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'InvalidInput' },
  { type: 'error', inputs: [], name: 'InvalidPath' },
  { type: 'error', inputs: [], name: 'InvalidPathLength' },
  { type: 'error', inputs: [], name: 'InvalidRatio' },
  { type: 'error', inputs: [], name: 'MultiplicationsOverflow' },
  { type: 'error', inputs: [], name: 'NotInitialized' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'TransferFailed' },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID',
  },
  { type: 'error', inputs: [], name: 'Unauthorized' },
  { type: 'error', inputs: [], name: 'ZeroAddress' },
  { type: 'error', inputs: [], name: 'ZeroMsgValue' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'zrc20',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'contractAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'SetConnected',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'universalAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'SetUniversal',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TokenMinted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'destination',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'receiver',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TokenTransfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'receiver',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TokenTransferReceived',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TokenTransferReverted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'destination',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TokenTransferToDestination',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Unwrapped',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Wrapped',
  },
  {
    type: 'function',
    inputs: [],
    name: 'TOTAL_RATIO',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'basket',
    outputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'ratio', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'basketLength',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'value', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burnFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'connected',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'gasLimitAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'gateway',
    outputs: [
      { name: '', internalType: 'contract GatewayZEVM', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getIndexComposition',
    outputs: [
      { name: 'tokens', internalType: 'address[]', type: 'address[]' },
      { name: 'ratios', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'getTokenInfo',
    outputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'ratio', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'indexInitialized',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'initialOwner', internalType: 'address', type: 'address' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'symbol', internalType: 'string', type: 'string' },
      {
        name: 'gatewayAddress',
        internalType: 'address payable',
        type: 'address',
      },
      { name: 'gas', internalType: 'uint256', type: 'uint256' },
      {
        name: 'uniswapRouterAddress',
        internalType: 'address',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokens', internalType: 'address[]', type: 'address[]' },
      { name: 'ratios', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'initializeIndex',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isUniversal',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'context',
        internalType: 'struct MessageContext',
        type: 'tuple',
        components: [
          { name: 'origin', internalType: 'bytes', type: 'bytes' },
          { name: 'sender', internalType: 'address', type: 'address' },
          { name: 'chainID', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'zrc20', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'message', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onCall',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'context',
        internalType: 'struct RevertContext',
        type: 'tuple',
        components: [
          { name: 'sender', internalType: 'address', type: 'address' },
          { name: 'asset', internalType: 'address', type: 'address' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
          { name: 'revertMessage', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'onRevert',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'zrc20', internalType: 'address', type: 'address' },
      { name: 'contractAddress', internalType: 'address', type: 'address' },
    ],
    name: 'setConnected',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'gas', internalType: 'uint256', type: 'uint256' }],
    name: 'setGasLimit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'gatewayAddress', internalType: 'address', type: 'address' },
    ],
    name: 'setGateway',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'destination', internalType: 'address', type: 'address' },
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferCrossChain',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'uniswapRouter',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'unwrap',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'wrap',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__
 */
export const useReadZetaIdxUniversalToken = /*#__PURE__*/ createUseReadContract(
  { abi: zetaIdxUniversalTokenAbi },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"TOTAL_RATIO"`
 */
export const useReadZetaIdxUniversalTokenTotalRatio =
  /*#__PURE__*/ createUseReadContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'TOTAL_RATIO',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 */
export const useReadZetaIdxUniversalTokenUpgradeInterfaceVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'UPGRADE_INTERFACE_VERSION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadZetaIdxUniversalTokenAllowance =
  /*#__PURE__*/ createUseReadContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'allowance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadZetaIdxUniversalTokenBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"basket"`
 */
export const useReadZetaIdxUniversalTokenBasket =
  /*#__PURE__*/ createUseReadContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'basket',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"basketLength"`
 */
export const useReadZetaIdxUniversalTokenBasketLength =
  /*#__PURE__*/ createUseReadContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'basketLength',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"connected"`
 */
export const useReadZetaIdxUniversalTokenConnected =
  /*#__PURE__*/ createUseReadContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'connected',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadZetaIdxUniversalTokenDecimals =
  /*#__PURE__*/ createUseReadContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'decimals',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"gasLimitAmount"`
 */
export const useReadZetaIdxUniversalTokenGasLimitAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'gasLimitAmount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"gateway"`
 */
export const useReadZetaIdxUniversalTokenGateway =
  /*#__PURE__*/ createUseReadContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'gateway',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"getIndexComposition"`
 */
export const useReadZetaIdxUniversalTokenGetIndexComposition =
  /*#__PURE__*/ createUseReadContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'getIndexComposition',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"getTokenInfo"`
 */
export const useReadZetaIdxUniversalTokenGetTokenInfo =
  /*#__PURE__*/ createUseReadContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'getTokenInfo',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"indexInitialized"`
 */
export const useReadZetaIdxUniversalTokenIndexInitialized =
  /*#__PURE__*/ createUseReadContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'indexInitialized',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"isUniversal"`
 */
export const useReadZetaIdxUniversalTokenIsUniversal =
  /*#__PURE__*/ createUseReadContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'isUniversal',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"name"`
 */
export const useReadZetaIdxUniversalTokenName =
  /*#__PURE__*/ createUseReadContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'name',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"owner"`
 */
export const useReadZetaIdxUniversalTokenOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'owner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"paused"`
 */
export const useReadZetaIdxUniversalTokenPaused =
  /*#__PURE__*/ createUseReadContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'paused',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"proxiableUUID"`
 */
export const useReadZetaIdxUniversalTokenProxiableUuid =
  /*#__PURE__*/ createUseReadContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'proxiableUUID',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadZetaIdxUniversalTokenSymbol =
  /*#__PURE__*/ createUseReadContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'symbol',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadZetaIdxUniversalTokenTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"uniswapRouter"`
 */
export const useReadZetaIdxUniversalTokenUniswapRouter =
  /*#__PURE__*/ createUseReadContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'uniswapRouter',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__
 */
export const useWriteZetaIdxUniversalToken =
  /*#__PURE__*/ createUseWriteContract({ abi: zetaIdxUniversalTokenAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteZetaIdxUniversalTokenApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteZetaIdxUniversalTokenBurn =
  /*#__PURE__*/ createUseWriteContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'burn',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"burnFrom"`
 */
export const useWriteZetaIdxUniversalTokenBurnFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'burnFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteZetaIdxUniversalTokenInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"initializeIndex"`
 */
export const useWriteZetaIdxUniversalTokenInitializeIndex =
  /*#__PURE__*/ createUseWriteContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'initializeIndex',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteZetaIdxUniversalTokenMint =
  /*#__PURE__*/ createUseWriteContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"onCall"`
 */
export const useWriteZetaIdxUniversalTokenOnCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'onCall',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"onRevert"`
 */
export const useWriteZetaIdxUniversalTokenOnRevert =
  /*#__PURE__*/ createUseWriteContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'onRevert',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteZetaIdxUniversalTokenPause =
  /*#__PURE__*/ createUseWriteContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'pause',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteZetaIdxUniversalTokenRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"setConnected"`
 */
export const useWriteZetaIdxUniversalTokenSetConnected =
  /*#__PURE__*/ createUseWriteContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'setConnected',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"setGasLimit"`
 */
export const useWriteZetaIdxUniversalTokenSetGasLimit =
  /*#__PURE__*/ createUseWriteContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'setGasLimit',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"setGateway"`
 */
export const useWriteZetaIdxUniversalTokenSetGateway =
  /*#__PURE__*/ createUseWriteContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'setGateway',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteZetaIdxUniversalTokenTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"transferCrossChain"`
 */
export const useWriteZetaIdxUniversalTokenTransferCrossChain =
  /*#__PURE__*/ createUseWriteContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'transferCrossChain',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteZetaIdxUniversalTokenTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteZetaIdxUniversalTokenTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteZetaIdxUniversalTokenUnpause =
  /*#__PURE__*/ createUseWriteContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'unpause',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"unwrap"`
 */
export const useWriteZetaIdxUniversalTokenUnwrap =
  /*#__PURE__*/ createUseWriteContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'unwrap',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useWriteZetaIdxUniversalTokenUpgradeToAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"wrap"`
 */
export const useWriteZetaIdxUniversalTokenWrap =
  /*#__PURE__*/ createUseWriteContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'wrap',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__
 */
export const useSimulateZetaIdxUniversalToken =
  /*#__PURE__*/ createUseSimulateContract({ abi: zetaIdxUniversalTokenAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateZetaIdxUniversalTokenApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateZetaIdxUniversalTokenBurn =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'burn',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"burnFrom"`
 */
export const useSimulateZetaIdxUniversalTokenBurnFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'burnFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateZetaIdxUniversalTokenInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"initializeIndex"`
 */
export const useSimulateZetaIdxUniversalTokenInitializeIndex =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'initializeIndex',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateZetaIdxUniversalTokenMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"onCall"`
 */
export const useSimulateZetaIdxUniversalTokenOnCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'onCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"onRevert"`
 */
export const useSimulateZetaIdxUniversalTokenOnRevert =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'onRevert',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateZetaIdxUniversalTokenPause =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'pause',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateZetaIdxUniversalTokenRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"setConnected"`
 */
export const useSimulateZetaIdxUniversalTokenSetConnected =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'setConnected',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"setGasLimit"`
 */
export const useSimulateZetaIdxUniversalTokenSetGasLimit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'setGasLimit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"setGateway"`
 */
export const useSimulateZetaIdxUniversalTokenSetGateway =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'setGateway',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateZetaIdxUniversalTokenTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"transferCrossChain"`
 */
export const useSimulateZetaIdxUniversalTokenTransferCrossChain =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'transferCrossChain',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateZetaIdxUniversalTokenTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateZetaIdxUniversalTokenTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateZetaIdxUniversalTokenUnpause =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'unpause',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"unwrap"`
 */
export const useSimulateZetaIdxUniversalTokenUnwrap =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'unwrap',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useSimulateZetaIdxUniversalTokenUpgradeToAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `functionName` set to `"wrap"`
 */
export const useSimulateZetaIdxUniversalTokenWrap =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zetaIdxUniversalTokenAbi,
    functionName: 'wrap',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__
 */
export const useWatchZetaIdxUniversalTokenEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: zetaIdxUniversalTokenAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchZetaIdxUniversalTokenApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zetaIdxUniversalTokenAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchZetaIdxUniversalTokenInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zetaIdxUniversalTokenAbi,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchZetaIdxUniversalTokenOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zetaIdxUniversalTokenAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchZetaIdxUniversalTokenPausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zetaIdxUniversalTokenAbi,
    eventName: 'Paused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `eventName` set to `"SetConnected"`
 */
export const useWatchZetaIdxUniversalTokenSetConnectedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zetaIdxUniversalTokenAbi,
    eventName: 'SetConnected',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `eventName` set to `"SetUniversal"`
 */
export const useWatchZetaIdxUniversalTokenSetUniversalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zetaIdxUniversalTokenAbi,
    eventName: 'SetUniversal',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `eventName` set to `"TokenMinted"`
 */
export const useWatchZetaIdxUniversalTokenTokenMintedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zetaIdxUniversalTokenAbi,
    eventName: 'TokenMinted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `eventName` set to `"TokenTransfer"`
 */
export const useWatchZetaIdxUniversalTokenTokenTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zetaIdxUniversalTokenAbi,
    eventName: 'TokenTransfer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `eventName` set to `"TokenTransferReceived"`
 */
export const useWatchZetaIdxUniversalTokenTokenTransferReceivedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zetaIdxUniversalTokenAbi,
    eventName: 'TokenTransferReceived',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `eventName` set to `"TokenTransferReverted"`
 */
export const useWatchZetaIdxUniversalTokenTokenTransferRevertedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zetaIdxUniversalTokenAbi,
    eventName: 'TokenTransferReverted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `eventName` set to `"TokenTransferToDestination"`
 */
export const useWatchZetaIdxUniversalTokenTokenTransferToDestinationEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zetaIdxUniversalTokenAbi,
    eventName: 'TokenTransferToDestination',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchZetaIdxUniversalTokenTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zetaIdxUniversalTokenAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchZetaIdxUniversalTokenUnpausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zetaIdxUniversalTokenAbi,
    eventName: 'Unpaused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `eventName` set to `"Unwrapped"`
 */
export const useWatchZetaIdxUniversalTokenUnwrappedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zetaIdxUniversalTokenAbi,
    eventName: 'Unwrapped',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `eventName` set to `"Upgraded"`
 */
export const useWatchZetaIdxUniversalTokenUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zetaIdxUniversalTokenAbi,
    eventName: 'Upgraded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zetaIdxUniversalTokenAbi}__ and `eventName` set to `"Wrapped"`
 */
export const useWatchZetaIdxUniversalTokenWrappedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zetaIdxUniversalTokenAbi,
    eventName: 'Wrapped',
  })
