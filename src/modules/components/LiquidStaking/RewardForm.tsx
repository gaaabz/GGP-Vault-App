import { BigNumber } from 'ethers'
import { FunctionComponent } from 'react'

import { FormLabel, Text } from '@chakra-ui/react'

import { AVAXPillUnit } from '../Dashboard/Cards/AVAXPillUnit'
import { GGPPillUnit } from '../Dashboard/Cards/GGPPillUnit'

import { BigNumberInput } from '@/common/components/Input/BigNumberInput'
import { displayBN } from '@/utils/numberFormatter'

interface Props {
  reward: BigNumber
  balance: BigNumber
  token?: string
}

export const RewardForm: FunctionComponent<Props> = ({ balance, reward, token }) => {
  return (
    <>
      <FormLabel htmlFor="stake-avax-form" id="stake-avax" mb="4">
        <Text color="black" fontSize="18" fontWeight="bold">
          Tokens received
        </Text>
      </FormLabel>
      <div className="mb-2 flex items-center justify-between gap-4">
        <BigNumberInput
          autoFocus
          bnValue={reward}
          className="h-14 w-full flex-1 rounded-full bg-white py-2 px-4 text-base font-bold text-black disabled:bg-white md:text-lg"
          disabled
          max={balance}
          min={BigNumber.from(0)}
          onChange={() => undefined}
          placeholder="0.0"
        />
        {token === 'GGP' ? <GGPPillUnit title="GGP" value={null} /> : <AVAXPillUnit value={null} />}
      </div>
      <div className="flex justify-end">
        <Text color="grey.600" fontWeight="medium" size="xs">
          {`Balance ${displayBN(balance)} ${token}`}
        </Text>
      </div>
    </>
  )
}
