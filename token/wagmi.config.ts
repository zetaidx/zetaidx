import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'ZetaIdxUniversalToken',
      abi: require('./artifacts/contracts/ZetaIdxUniversalToken.sol/ZetaIdxUniversalToken.json').abi,
    }
  ],
  plugins: [
    react({
      useContractRead: true,
      useContractWrite: true,
      useContractEvent: true,
    }),
  ],
})
