import { FunctionComponent, ReactElement } from 'react'

import { Box, Text } from '@chakra-ui/react'

interface Props {
  data: { label: ReactElement; value: ReactElement | string }[]
}

export const Statistics: FunctionComponent<Props> = ({ data }) => {
  return (
    <Box className="flex flex-col gap-5">
      {data.map(({ label, value }, index) => (
        <Box display="flex" flexDir="row" justifyContent="space-between" key={index}>
          <Text
            alignItems="center"
            as="div"
            color="black"
            display="flex"
            flexDir="row"
            fontWeight="400"
            size="md"
          >
            {label}
          </Text>
          <Text as="div" fontWeight="black" size="md">
            {value}
          </Text>
        </Box>
      ))}
    </Box>
  )
}
