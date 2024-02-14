import { utils } from 'ethers'

import { useVaultAddress } from '../useStorage'

import xGGP from '@/contracts/xGGP'
import TokenggAVAX from '@/contracts/TokenggAVAX'

const useTokenggAVAXContract = () => {
  const data = useVaultAddress()

  const contractInterface = new utils.Interface(TokenggAVAX)
  return {
    address: data,
    contractInterface,
    abi: TokenggAVAX,
  }
}

export const useTokenxGGPContract = () => {
  const data = useVaultAddress()

  const contractInterface = new utils.Interface(xGGP)
  return {
    address: data,
    contractInterface,
    abi: xGGP,
  }
}

export default useTokenggAVAXContract
