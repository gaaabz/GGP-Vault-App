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
      <div className="flex items-center justify-between gap-2">
        <div className="relative w-full">
          <BigNumberInput
            autoFocus
            bnValue={amount}
            className={`${
              greaterThanPool ? 'bg-red-100' : 'bg-gray-50'
            } w-full rounded-xl  p-2 pr-16 text-3xl`}
            max={balance}
            min={parseEther('0')}
            onChange={(amount) => setAmount(amount)}
          />
          <button className="absolute top-0 right-0 h-full px-4" onClick={handleMaxClick}>
            Max
          </button>
        </div>
        {token === 'GGP' ? <GGPPillUnit title="GGP" value={null} /> : <AVAXPillUnit value={null} />}
      </div>
      <Divider borderColor="grey.300" display={{ base: null, sm: 'none' }} mb="2" mt="2" />
      <FormLabel htmlFor="stake-avax-form" id="stake-avax" mb="1">
        <Text color="grey.600">{header || 'Amount to stake'}</Text>
      </FormLabel>
      {balance ? (
        <div className="flex justify-end">
          <Text color="grey.600" size="xs">
            {`Balance ${displayBN(balance)} ${token}`}
          </Text>
        </div>
      ) : null}
    </>
  )
}
