import { ComponentStyleConfig } from '@chakra-ui/react'

export const Button: ComponentStyleConfig = {
  baseStyle: {
    rounded: 'full',
    fontWeight: 'bold',
    _disabled: {
      opacity: '40%',
    },
    width: 'fit-content',
  },
  sizes: {
    'xs': {
      paddingX: '20px',
      paddingY: '6px',
      fontSize: '14px',
      lineHeight: '22px',
    },
    'sm': {
      paddingX: '20px',
      paddingY: '10px',
      fontSize: '14px',
      lineHeight: '22px',
    },
    'md': {
      paddingX: '24px',
      paddingY: '12px',
      fontSize: '16px',
      lineHeight: '24px',
    },
    'lg': {
      paddingX: '28px',
      paddingY: '14px',
      fontSize: '18px',
      lineHeight: '28px',
    },
    'xl': {
      paddingX: '32px',
      fontSize: '16px',
      paddingY: '8px',
      innerHeight: '56px',
    },
    'iconOnly-xs': {
      height: '34px',
      width: '34px',
      padding: '10px',
    },
    'iconOnly-sm': {
      height: '42px',
      width: '42px',
      padding: '14px',
    },
    'iconOnly-md': {
      height: '48px',
      width: '48px',
      padding: '16px',
    },
    'iconOnly-lg': {
      height: '58px',
      width: '58px',
      padding: '20px',
    },
  },
  variants: {
    'primary': {
      bgColor: '#FFF500',
      _hover: {
        bgColor: '#FFF500',
        _disabled: {
          bgColor: '#FFF500',
        },
      },
    },
    'secondary-filled': {
      color: 'grey.0',
      bgColor: 'black',
      _hover: {
        bgColor: 'black',
      },
    },
    'secondary-outline': ({ theme }) => ({
      boxShadow: `inset 0 0 0 2px ${theme.colors.black}`,
      color: 'black',
      _hover: {
        color: 'black',
        boxShadow: `inset 0 0 0 2px ${theme.colors.black}`,
      },
      _disabled: {
        boxShadow: `inset 0 0 0 2px ${theme.colors.gray[550]}`,
      },
    }),
    'tertiary': {
      color: 'black',
      bgColor: 'white',
      _hover: {
        bgColor: 'gray.100',
      },
    },
    'destructive-outline': ({ theme }) => ({
      boxShadow: `inset 0 0 0 2px ${theme.colors.error[500]}`,
      color: 'error.500',
      _hover: {
        color: 'error.600',
        boxShadow: `inset 0 0 0 2px ${theme.colors.error[600]}`,
      },
      _disabled: {
        boxShadow: `inset 0 0 0 2px ${theme.colors.error[600]}`,
      },
    }),
  },
  defaultProps: {
    variant: 'primary',
    size: 'md',
  },
}
