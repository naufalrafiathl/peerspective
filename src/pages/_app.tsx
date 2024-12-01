import "@/styles/globals.css";
import { AppProps } from 'next/app'
import Head from 'next/head'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="truth or dare, deep talk, ice breaking games, group activity, perspectives" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/logo.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content="/logo.png" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
