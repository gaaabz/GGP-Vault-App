import { useBalance, useNetwork } from 'wagmi'

import useTokenggAVAXContract from './contracts/tokenggAVAX'

import { xGGPAddresses } from '@/constants/storageAddresses'

function useAvaxBalanceOfggAVAX() {
  const { address: xGGPVault } = useTokenggAVAXContract()
  const { chain } = useNetwork()
  const balance = useBalance({
    address: xGGPVault,
    token: xGGPAddresses[chain?.id],
  })
  return balance
}

export default useAvaxBalanceOfggAVAX
