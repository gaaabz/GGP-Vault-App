import { useBalance } from 'wagmi'

import useTokenggAVAXContract from './contracts/tokenggAVAX'

import { WAVAX_ADDR } from '@/constants/contractAddresses'

function useAvaxBalanceOfggAVAX() {
  const { address: ggAVAXAddress } = useTokenggAVAXContract()
  const balance = useBalance({
    address: ggAVAXAddress,
    token: WAVAX_ADDR,
  })
  return balance
}

export default useAvaxBalanceOfggAVAX
