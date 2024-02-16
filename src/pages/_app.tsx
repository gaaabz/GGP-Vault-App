import '@/styles/components.scss'
import '@/styles/globals.scss'
import '@rainbow-me/rainbowkit/styles.css'

import { ChakraProvider } from '@chakra-ui/react'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { Analytics } from 'dappling-analytics/react'
import Head from 'next/head'
import NoSSR from 'react-no-ssr'
import { WagmiConfig } from 'wagmi'

import { ChakraFonts } from '@/common/components/CustomFont'
import { PageHead } from '@/common/components/PageHead'
import configWagmiClient from '@/config/wagmi'
import theme from '@/theme'

const { chains, wagmiClient } = configWagmiClient()

const NoS = NoSSR as any

export const App = ({ Component, pageProps }) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <NoS>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} showRecentTransactions>
          <ChakraProvider theme={theme}>
            <ChakraFonts />
            {/* <CrispWithNoS /> */}
            <Analytics />
            <Head>
              <meta
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
                name="viewport"
              />
              <PageHead />
            </Head>
            {getLayout(<Component {...pageProps} />)}
          </ChakraProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </NoS>
  )
}

export default App
