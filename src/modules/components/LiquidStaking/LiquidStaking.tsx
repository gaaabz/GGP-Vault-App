/* eslint-disable tailwindcss/no-custom-classname */
import { BigNumber, BigNumberish } from 'ethers'
import { FunctionComponent, useEffect, useState } from 'react'

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  FormControl,
  Link,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useChainModal } from '@rainbow-me/rainbowkit'
import { formatEther, parseEther } from 'ethers/lib/utils.js'
import ms from 'ms'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { useAccount, useBalance, useNetwork, useWaitForTransaction } from 'wagmi'

import StakeStat from '../Dashboard/Cards/StakeStat'
import ApproveButton from '../Wizard/components/ApproveButton'
import { RewardForm } from './RewardForm'
import { StakeForm } from './StakeForm'
import { Statistics } from './Statistics'

import { Address } from '@/common/components/Address'
import { Button } from '@/common/components/Button'
import { Card, Content, Footer } from '@/common/components/Card'
import ConnectButton from '@/common/components/ConnectButton'
import { InfoCircleIcon } from '@/common/components/CustomIcon'
import { SwapIcon } from '@/common/components/CustomIcon/SwapIcon'
import { Tooltip } from '@/common/components/Tooltip'
import { GGPAddresses, xGGPAddresses } from '@/constants/storageAddresses'
import { useGGPVaultAllowance } from '@/hooks/allowance'
import useDeposit from '@/hooks/deposit'
import useLiquidStakingData from '@/hooks/liquidStakingData'
import useRedeem from '@/hooks/redeem'
import { useMaxRedeem } from '@/hooks/useAvaxBalanceOfggAvax'
import useCeres from '@/hooks/useCeres'
import addToken from '@/utils/addToken'
import { WEI_VALUE } from '@/utils/consts'
import { formatEtherFixed } from '@/utils/formatEtherFixed'
import { displayBN } from '@/utils/numberFormatter'

const generateStatistics = (
  apy: number | string,
  exchangeRate: BigNumberish,
  stakedAmount: BigNumberish,
  stakers: BigNumberish | string,
  rewardPeriod?: number | null | undefined,
  tokenAddress?: string | null | undefined,
) => {
  if (!rewardPeriod) {
    rewardPeriod = 84600000 * 14
  }

  return [
    {
      label: (
        <>
          Token Address
          <Tooltip content="The address of the ggGGP token" placement="right">
            <Box as="span">
              <InfoCircleIcon className="ml-1" fill="grey.600" />
            </Box>
          </Tooltip>
        </>
      ),
      value: tokenAddress ? (
        <Address copyable fontWeight="black">
          {tokenAddress}
        </Address>
      ) : (
        'Loading...'
      ),
    },
    {
      label: (
        <>
          Annual Percentage Yield
          <Tooltip
            content="Estimated Percentage reward you get per year on your staked AVAX."
            placement="right"
          >
            <Box as="span">
              <InfoCircleIcon className="ml-1" fill="grey.600" />
            </Box>
          </Tooltip>
        </>
      ),
      value: typeof apy === 'string' ? apy : `~${apy.toFixed(2)}%`,
    },
    {
      label: (
        <>
          Exchange Rate
          <Tooltip content="Rate of exchange between AVAX and ggAVAX." placement="right">
            <Box as="span">
              <InfoCircleIcon className="ml-1" fill="grey.600" />
            </Box>
          </Tooltip>
        </>
      ),
      value: `1 AVAX = ${Number(formatEther(exchangeRate)).toFixed(6)} ggAVAX`,
    },
    {
      label: <># of Stakers</>,
      value: typeof stakers === 'string' ? stakers : stakers.toLocaleString(),
    },
    {
      label: <>Total AVAX Staked</>,
      value: `${formatEtherFixed(stakedAmount)} AVAX`,
    },
    {
      label: (
        <>
          Reward Period
          <Tooltip content="The waiting period before rewards are gained" placement="right">
            <Box as="span">
              <InfoCircleIcon className="ml-1" fill="grey.600" />
            </Box>
          </Tooltip>
        </>
      ),
      value: ms(rewardPeriod, { long: true }),
    },
  ]
}

export const LiquidStaking: FunctionComponent = () => {
  const toast = useToast()

  const { openChainModal } = useChainModal()

  const { chain } = useNetwork()

  const GGPAddress = GGPAddresses[chain?.id]
  const xGGPAddress = xGGPAddresses[chain?.id]

  const [swapDirection, setSwapDirection] = useState(false) // false for AVAX -> ggAVAX, true for ggGGP -> AVAX
  const [amount, setAmount] = useState<BigNumber>(parseEther('0')) // stake value
  const [reward, setReward] = useState<BigNumber>(parseEther('0')) // reward value

  const { address: account, isConnected } = useAccount()

  const { data: maxRedeem } = useMaxRedeem()
  // const { data: maxRedeem } = useAvaxBalanceOfggAVAX()

  // const { address: xGGPAddress } = useTokenggAVAXContract()

  const { data: ceresData } = useCeres()

  let apy = 0
  if (ceresData) {
    const { ggAVAXAPY } = ceresData
    apy = ggAVAXAPY.value as number
  }

  const { ggAVAXExchangeRate, isLoading: isLoadingStats, stakerCount } = useLiquidStakingData()

  // // AVAX balance
  // const { data: balance, isLoading: isBalanceLoading } = useBalance({
  //   watch: true,
  //   address: account,
  // })

  // GGP Balance
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    watch: true,
    address: account,
    token: GGPAddress,
  })

  // xGGP balance
  const { data: ggAVAXBalance } = useBalance({
    watch: true,
    address: account,
    token: xGGPAddress,
  })

  // deposit the AVAX
  const {
    data: depositData,
    isError: isDepositError,
    isLoading: isDepositLoading,
    refetch: refetchDeposit,
    write: deposit,
  } = useDeposit(amount)

  // redeem ggAVAX
  const {
    data: redeemData,
    isError: isRedeemError,
    isLoading: isRedeemLoading,
    write: redeem,
  } = useRedeem(amount)

  const { status: redeemStatus } = useWaitForTransaction({
    hash: redeemData?.hash,
  })
  const { status: depositStatus } = useWaitForTransaction({
    hash: depositData?.hash,
  })

  const isLoading = isBalanceLoading || isDepositLoading || isLoadingStats || isRedeemLoading

  const statisticData = generateStatistics(apy, 0, 0, 0, 0, xGGPAddress)

  const handleSwap = () => {
    const temporaryAmount = amount
    const temporaryReward = reward
    setSwapDirection(!swapDirection)
    setAmount(temporaryReward)
    setReward(temporaryAmount)
  }

  useEffect(() => {
    if (depositStatus === 'success') {
      toast({
        position: 'top',
        title: 'Success',
        status: 'success',
        duration: 8000,
        description: <span>Deposited!</span>,
      })
      setAmount(parseEther('0'))
      return
    }
    if (depositStatus === 'error') {
      toast({
        position: 'top',
        title: 'Error',
        description: 'Something went wrong. Please try again later.',
      })
      return
    }
  }, [depositStatus, toast])

  useEffect(() => {
    if (redeemStatus === 'success') {
      toast({
        position: 'top',
        title: 'Success',
        status: 'success',
        description: 'Redeemed!',
      })
      setAmount(parseEther('0'))
      return
    }
    if (redeemStatus === 'error') {
      toast({
        position: 'top',
        title: 'Error',
        description: 'Something went wrong. Please try again later.',
      })
      return
    }
  }, [redeemStatus, toast])

  useEffect(() => {
    if (swapDirection) {
      if (!ggAVAXExchangeRate) {
        setReward(parseEther('0'))
      } else {
        const rewardAmount = amount.mul(WEI_VALUE).div(ggAVAXExchangeRate)
        setReward(rewardAmount)
      }
    } else {
      if (!ggAVAXExchangeRate) {
        setReward(parseEther('0'))
      } else {
        const rewardAmount = amount.mul(ggAVAXExchangeRate).div(WEI_VALUE)
        setReward(rewardAmount)
      }
    }
  }, [amount, ggAVAXExchangeRate, swapDirection])

  let amountGreaterThanPool = false
  if (maxRedeem) {
    amountGreaterThanPool = amount.gt(maxRedeem)
  } else {
    amountGreaterThanPool = amount.gt(BigNumber.from('0'))
  }

  const { data: ggpAllowance } = useGGPVaultAllowance(account)

  const allowance = ggpAllowance || BigNumber.from(0)

  const displayButton = () => {
    const buttonText = swapDirection ? 'Redeem GGP' : 'Deposit GGP'
    const sufficientBalance = swapDirection
      ? ggAVAXBalance?.value.lt(amount)
      : balance?.value.lt(amount)

    if (!isConnected) {
      return <ConnectButton />
    }
    if (chain?.unsupported) {
      return (
        <Button full onClick={openChainModal} variant="destructive-outline">
          Wrong Network
        </Button>
      )
    }
    if (sufficientBalance) {
      return (
        <Button disabled full variant="destructive-outline">
          Insufficient Funds
        </Button>
      )
    }
    if (amountGreaterThanPool && swapDirection) {
      return (
        <div className="flex w-full gap-4">
          <Button disabled full variant="destructive-outline">
            Insufficient Liquidity in Pool
          </Button>
          <Link href="https://app.balancer.fi/#/avalanche/swap" target="_blank">
            <Button full variant="secondary-outline">
              Swap on Balancer
              <FaExternalLinkAlt />
            </Button>
          </Link>
        </div>
      )
    }

    return (
      <Tooltip
        content="Enter an amount to stake first"
        isDisabled={amount ? true : false}
        placement="top"
      >
        <Button
          disabled={
            (swapDirection && isRedeemError) ||
            (!swapDirection && isDepositError) ||
            !amount ||
            isLoading ||
            depositStatus === 'loading' ||
            redeemStatus === 'loading'
          }
          full
          onClick={swapDirection ? redeem : deposit}
        >
          {isLoading || depositStatus === 'loading' || redeemStatus === 'loading'
            ? 'Loading...'
            : buttonText}
        </Button>
      </Tooltip>
    )
  }

  return (
    <>
      <Card outer>
        <Flex
          alignItems={{ base: 'flex-start' }}
          flexDir={{ base: 'column', md: 'row' }}
          justifyContent="space-between"
        >
          <Text className="pb-4 text-[32px] font-black">GGP Vault</Text>
          {swapDirection && (
            <div className="max-[200px] flex justify-center px-2">
              <StakeStat
                item={{
                  placement: 'top',
                  name: 'xGGP Pool',
                  tooltip: 'Balance available in the Liquidity Pool for swaps',
                  stat: `${maxRedeem ? displayBN(maxRedeem) : '0.00'} GGP`,
                }}
              />
            </div>
          )}
        </Flex>
        <Content>
          <FormControl>
            <Box position="relative">
              <Card backgroundColor="#F2F2F2" mb="4" padding={{ base: '1rem', md: '1.5rem' }}>
                <Content>
                  {swapDirection ? (
                    <StakeForm
                      amount={amount}
                      balance={ggAVAXBalance?.value || parseEther('0')}
                      greaterThanPool={amountGreaterThanPool}
                      header="Amount to redeem"
                      setAmount={setAmount}
                      setReward={setReward}
                      token="xGGP"
                    />
                  ) : (
                    <StakeForm
                      amount={amount}
                      balance={balance?.value || parseEther('0')}
                      header="Amount to deposit"
                      setAmount={setAmount}
                      setReward={setReward}
                      token="GGP"
                    />
                  )}
                </Content>
              </Card>
              <Box
                alignItems="center"
                bgColor="#00C2FF"
                borderRadius="full"
                className="bottom-[-32px] left-[calc(50%-24px)] cursor-pointer transition-colors hover:border hover:border-solid hover:border-[#00C2FF] hover:bg-cyan-200"
                display="flex"
                h="48px"
                justifyContent="center"
                onClick={handleSwap}
                position="absolute"
                w="48px"
              >
                <SwapIcon size="16px" />
              </Box>
            </Box>
            <Card backgroundColor="#F2F2F2" mb="4" padding={{ base: '1rem', md: '1.5rem' }}>
              <Content>
                {swapDirection ? (
                  <RewardForm
                    balance={balance?.value || parseEther('0')}
                    reward={reward}
                    token="GGP"
                  />
                ) : (
                  <RewardForm
                    balance={ggAVAXBalance?.value || parseEther('0')}
                    reward={reward}
                    token="xGGP"
                  />
                )}
              </Content>
            </Card>
            <Card backgroundColor="white.100" hidden={!isConnected} mb="2" p="0" rounded="12px">
              <Content>
                <Accordion allowToggle>
                  <AccordionItem>
                    <AccordionButton
                      data-testid="liquid-staking-accordion-action"
                      p={{ base: '1rem', md: '1rem 1.5rem' }}
                    >
                      <Text
                        flex="1"
                        fontWeight="black"
                        size={{ base: 'base', md: 'lg' }}
                        textAlign="left"
                      >
                        View liquid staking statistics
                      </Text>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel p={{ base: '0 1rem 1rem', md: '0 1.5rem 1rem 1.5rem' }}>
                      <Statistics data={statisticData} />
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Content>
            </Card>
          </FormControl>
        </Content>
        <Footer className="flex flex-col items-center">
          {allowance.gte(amount) || swapDirection ? (
            displayButton()
          ) : (
            <ApproveButton
              amount={amount}
              setApproveStatus={() => {
                refetchDeposit()
              }}
            />
          )}
          {isConnected && (
            <div className="mt-4 text-center text-base">
              <Link
                onClick={() => {
                  addToken(xGGPAddress, 'ggGGP')
                }}
              >
                Add xGGP token to wallet
              </Link>
            </div>
          )}
        </Footer>
      </Card>
    </>
  )
}
