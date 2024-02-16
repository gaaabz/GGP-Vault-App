import { BigNumber } from 'ethers'
import { Dispatch, SetStateAction } from 'react'

import { Divider, FormLabel, Text } from '@chakra-ui/react'
import { parseEther } from 'ethers/lib/utils.js'

import { AVAXPillUnit } from '../Dashboard/Cards/AVAXPillUnit'
import { GGPPillUnit } from '../Dashboard/Cards/GGPPillUnit'

import { BigNumberInput } from '@/common/components/Input/BigNumberInput'
import { displayBN } from '@/utils/numberFormatter'

export interface StakeFormProps {
  amount: BigNumber
  setAmount: Dispatch<SetStateAction<BigNumber>>
  setReward: Dispatch<SetStateAction<BigNumber>>
  balance: BigNumber
  greaterThanPool?: boolean
  token?: string
  header?: string
}

export const StakeForm = ({
  amount,
  balance,
  greaterThanPool,
  header,
  setAmount,
  setReward,
  token = 'AVAX',
}: StakeFormProps): JSX.Element => {
  const handleMaxClick = () => {
    setAmount(balance)
    setReward(parseEther('0')) // change Reward accordingly
  }

  return (
    <>
      <FormLabel htmlFor="stake-avax-form" id="stake-avax" mb="4">
        <Text color="black" fontSize="18" fontWeight="bold">
          {header || 'Amount to redeem'}
        </Text>
      </FormLabel>
      <Divider borderColor="grey.300" display={{ base: null, sm: 'none' }} mb="2" mt="2" />
      <div className="mb-2 flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <BigNumberInput
            autoFocus
            bnValue={amount}
            className={`${
              greaterThanPool ? 'bg-red-100' : 'bg-white'
            } h-14 w-full rounded-full py-2 pl-6 pr-24 text-lg font-bold text-black`}
            max={balance}
            min={parseEther('0')}
            onChange={(amount) => setAmount(amount)}
          />
          <button
            className="absolute right-0 top-0 h-full px-6 text-lg font-bold text-black"
            onClick={handleMaxClick}
          >
            Max
          </button>
        </div>
        {token === 'GGP' ? <GGPPillUnit title="GGP" value={null} /> : <AVAXPillUnit value={null} />}
      </div>
      {balance ? (
        <div className="flex justify-end">
          <Text color="grey.600" fontWeight="medium" size="xs">
            {`Balance ${displayBN(balance)} ${token}`}
          </Text>
        </div>
      ) : null}
    </>
  )
}
