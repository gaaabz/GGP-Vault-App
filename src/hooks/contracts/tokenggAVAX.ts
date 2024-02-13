import { utils } from 'ethers'

import { useVaultAddress } from '../useStorage'

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

export default useTokenggAVAXContract
