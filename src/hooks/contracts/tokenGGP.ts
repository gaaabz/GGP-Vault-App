import { utils } from 'ethers'

import { useGetAddress } from '../useStorage'

import TokenGGP from '@/contracts/TokenGGP'
import { GGPAddresses } from '@/constants/storageAddresses'
import { useNetwork } from 'wagmi'

const useTokenGGPContract = () => {
  const { chain } = useNetwork()
  const data = GGPAddresses[chain?.id]
  const contractInterface = new utils.Interface(TokenGGP)

  return {
    address: data,
    contractInterface,
    abi: TokenGGP,
  }
}

export default useTokenGGPContract
