import { BigNumber } from 'ethers'
import { FunctionComponent } from 'react'

import { Divider, FormLabel, Text } from '@chakra-ui/react'

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
      <Divider borderColor="grey.300" display={{ base: null, sm: 'none' }} mb="2" mt="2" />
      <div className="mb-2 flex items-center justify-between gap-4">
        <BigNumberInput
          autoFocus
          bnValue={reward}
          className="h-14 w-full rounded-full bg-white py-2 pl-6 pr-24 text-lg font-bold text-black disabled:bg-white"
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
