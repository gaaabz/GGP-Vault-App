import React from 'react'

import { Box, Text, VStack } from '@chakra-ui/react'

// Adjust the import path as necessary
import { useIsEligible } from '@/hooks/useClaimNodeOp'
import {
  useGetAVAXStake,
  useGetAVAXValidating,
  useGetAVAXValidatingHighWater,
  useGetGGPStake,
} from '@/hooks/useStake'
import { SidebarNavbar } from '@/modules/components/SidebarNavbar/SidebarNavbar'
import { displayBN } from '@/utils/numberFormatter'

interface Address {
  name: string
  address: `0x${string}`
}

const addresses: Address[] = [
  { name: 'JT', address: '0x6651893D756f8Cd86821B2236d314e5741b157ff' },
  { name: 'ABG', address: '0xB21a19baE517432a6DeA6Eca3cb370802485223E' },
  { name: 'GGPVAULT', address: '0x2Ff60357027861F25C7a6650564C2A606d23369d' },
]

const Card: React.FC<{
  name: string
  address: string
  highWater: any // Adjust the type as necessary
  eligible: boolean
  avaxValidating: any // Adjust type as necessary
  ggpStake: any // Adjust type as necessary
  avaxStake: any // Adjust type as necessary
}> = ({ address, avaxStake, avaxValidating, eligible, ggpStake, highWater, name }) => (
  <Box borderRadius="lg" borderWidth="1px" className="bg-white" overflow="hidden" p={4} shadow="md">
    <VStack align="stretch" spacing={0}>
      <Text fontSize="xl" fontWeight="bold">
        {name}
      </Text>
      <Text>Address: {address}</Text>
      <Text>AVAX High Water: {displayBN(highWater)}</Text>
      <Text>isEligible: {eligible ? 'Yes' : 'No'}</Text>
      <Text>AVAX Validating: {displayBN(avaxValidating)}</Text>
      <Text>GGP Stake: {displayBN(ggpStake)}</Text>
      <Text>AVAX Stake: {displayBN(avaxStake)}</Text>
    </VStack>
  </Box>
)

const Manager = () => {
  // Hooks for each address
  const highWater1 = useGetAVAXValidatingHighWater(addresses[0].address)
  const highWater2 = useGetAVAXValidatingHighWater(addresses[1].address)
  const highWater3 = useGetAVAXValidatingHighWater(addresses[2].address)

  const eligible1 = useIsEligible(addresses[0].address)
  const eligible2 = useIsEligible(addresses[1].address)
  const eligible3 = useIsEligible(addresses[2].address)

  const avaxValidating1 = useGetAVAXValidating(addresses[0].address)
  const avaxValidating2 = useGetAVAXValidating(addresses[1].address)
  const avaxValidating3 = useGetAVAXValidating(addresses[2].address)

  const ggpStake1 = useGetGGPStake(addresses[0].address)
  const ggpStake2 = useGetGGPStake(addresses[1].address)
  const ggpStake3 = useGetGGPStake(addresses[2].address)

  const avaxStake1 = useGetAVAXStake(addresses[0].address)
  const avaxStake2 = useGetAVAXStake(addresses[1].address)
  const avaxStake3 = useGetAVAXStake(addresses[2].address)

  const nodeData = addresses.map((address, index) => ({
    ...address,
    highWater: [highWater1, highWater2, highWater3][index].data,
    eligible: [eligible1, eligible2, eligible3][index].data,
    avaxValidating: [avaxValidating1, avaxValidating2, avaxValidating3][index].data,
    ggpStake: [ggpStake1, ggpStake2, ggpStake3][index].data,
    avaxStake: [avaxStake1, avaxStake2, avaxStake3][index].data,
  }))

  return (
    <Box>
      {nodeData.map((node) => (
        <Card
          address={node.address}
          avaxStake={node.avaxStake}
          avaxValidating={node.avaxValidating}
          eligible={node.eligible}
          ggpStake={node.ggpStake}
          highWater={node.highWater}
          key={node.address}
          name={node.name}
        />
      ))}
    </Box>
  )
}

Manager.getLayout = function getLayout(page: React.ReactElement) {
  return <SidebarNavbar>{page}</SidebarNavbar>
}

export default Manager
