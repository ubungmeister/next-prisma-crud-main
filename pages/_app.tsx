import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from "@/components/Header";
import {SessionProvider} from "next-auth/react";
import {AppContextProvider} from "@/context/LoginContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <AppContextProvider>
      <SessionProvider session={pageProps}>
        <Header/>
        <Component {...pageProps} />
      </SessionProvider>
      </AppContextProvider>
  )
}
