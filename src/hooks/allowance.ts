import { useContractRead, useNetwork } from 'wagmi'

import useStakingContract from './contracts/staking'
import useTokenGGPContract from './contracts/tokenGGP'

import { HexString } from '@/types/cryptoGenerics'
import { xGGPAddresses } from '@/constants/storageAddresses'

const useGGPAllowance = (address: HexString) => {
  const { abi, address: tokenAddr } = useTokenGGPContract()
  const { address: stakingAddr } = useStakingContract()

  const resp = useContractRead({
    address: tokenAddr as `0x${string}`,
    abi: abi,
    functionName: 'allowance',
    args: [address, stakingAddr],
    watch: true,
  })

  return resp
}

export const useGGPVaultAllowance = (address: HexString) => {
  const { chain } = useNetwork()
  const { abi, address: tokenAddr } = useTokenGGPContract()
  const vault = xGGPAddresses[chain?.id]
  const resp = useContractRead({
    address: tokenAddr as `0x${string}`,
    abi: abi,
    functionName: 'allowance',
    args: [address, vault],
    watch: true,
  })

  return resp
}

export default useGGPAllowance
