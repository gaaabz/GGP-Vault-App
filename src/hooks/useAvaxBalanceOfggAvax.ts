import { useAccount, useBalance, useContractRead, useNetwork } from 'wagmi'

import useTokenggAVAXContract from './contracts/tokenggAVAX'
import xGGP from '@/contracts/xGGP'

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

export function useMaxRedeem() {
  const { address: xGGPVault } = useTokenggAVAXContract()
  const { chain } = useNetwork()
  const { address } = useAccount()
  const addr = xGGPAddresses[chain?.id]

  return useContractRead({
    watch: true,
    address: addr,
    abi: xGGP,
    functionName: 'maxRedeem',
    args: [address],
  })
}

export default useAvaxBalanceOfggAVAX
