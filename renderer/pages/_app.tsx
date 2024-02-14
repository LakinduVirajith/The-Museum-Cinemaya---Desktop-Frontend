import React from 'react'
import type { AppProps } from 'next/app'
import { Toaster } from "react-hot-toast"

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
