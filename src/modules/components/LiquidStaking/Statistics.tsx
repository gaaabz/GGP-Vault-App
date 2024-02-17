import { FunctionComponent, ReactElement } from 'react'

import { Box, Text } from '@chakra-ui/react'

interface Props {
  data: { label: ReactElement; value: ReactElement | string }[]
}

export const Statistics: FunctionComponent<Props> = ({ data }) => {
  return (
    <Box className="flex flex-col gap-5">
      {data.map(({ label, value }, index) => (
        <Box
          display="grid"
          gap={{ base: '1rem', md: '96px' }}
          gridTemplateColumns="repeat(2, minmax(0, 1fr))"
          key={index}
        >
          <Text
            alignItems="center"
            as="div"
            color="black"
            display="flex"
            flexDir="row"
            fontWeight="400"
            size={{ base: 'sm', md: 'md' }}
          >
            {label}
          </Text>
          <Text as="div" fontWeight="black" size={{ base: 'sm', md: 'md' }}>
            {value}
          </Text>
        </Box>
      ))}
    </Box>
  )
}
