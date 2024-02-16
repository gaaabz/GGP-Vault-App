import { ComponentStyleConfig } from '@chakra-ui/react'

export const Accordion: ComponentStyleConfig = {
  parts: ['container', 'button', 'panel'],
  baseStyle: {
    container: {
      rounded: '1.25rem',
      border: '1px solid',
      borderColor: 'black',
    },
    button: {
      p: '4',
      rounded: '1.25rem',
      _hover: {
        bg: 'transparent',
      },
      _expanded: { roundedBottom: 'none' },
    },
    panel: {
      rounded: '1.25rem',
      px: '6',
      py: '4',
    },
  },
}
