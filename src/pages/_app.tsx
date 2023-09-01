import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'

const inter = Inter({ subsets: ['latin'] })
const App = ({ Component, pageProps }: AppProps) =>
  <Component className={inter.className} {...pageProps} />

export default appWithTranslation(App);