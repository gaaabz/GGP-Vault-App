import { BigNumber } from 'ethers'

import { useToast } from '@chakra-ui/react'
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit'
import { formatEther } from 'ethers/lib/utils'
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi'

import useTokenContract, { useTokenxGGPContract } from './contracts/tokenggAVAX'

import { DECODED_ERRORS } from '@/utils/consts'

const useRedeem = (amount: BigNumber) => {
  const { abi, address } = useTokenxGGPContract()
  const addRecentTransaction = useAddRecentTransaction()
  const toast = useToast()
  const { address: userAddress } = useAccount()

  const { config } = usePrepareContractWrite({
    address,
    abi,
    functionName: 'redeem',
    enabled: !amount.eq(BigNumber.from(0)),
    args: [amount, userAddress, userAddress],
    onError(error) {
      Object.keys(DECODED_ERRORS).forEach((key) => {
        if (error?.message.includes(key)) {
          toast({
            position: 'top',
            title: 'Error during redeem of AVAX',
            description: DECODED_ERRORS[key],
            status: 'error',
            duration: 20000,
            isClosable: true,
          })
        }
      })
    },
  })

  const resp = useContractWrite({
    ...config,
    onSuccess(data) {
      addRecentTransaction({
        hash: data.hash,
        description: `Redeem ${formatEther(amount)} AVAX`,
      })
    },
  })

  return {
    ...resp,
    ready: resp?.write !== undefined,
  }
}

export default useRedeem
