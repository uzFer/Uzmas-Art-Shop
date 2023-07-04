import { CartContextProvider } from "@/components/CartContext";
import { FavouritesContextProvider } from "@/components/FavouritesContext";
import { createGlobalStyle } from "styled-components";
import { SessionProvider } from "next-auth/react";
import { ConfirmProvider } from "material-ui-confirm";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import Head from "next/head";

const GlobalStyles = createGlobalStyle`  
  body {
    background-color: #eee;
    padding: 0;
    margin: 0 0 50px 0;
    font-family: 'Courier New', monospace;
    scroll-behavior: smooth;
  }
`;

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter()
  const [route, setRoute] = useState(router.pathname)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleRouteChange = (url) => {
      setLoading(true);
    }

    const handleRouteChangeComplete = () => {
      setLoading(false);
    }

    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [router.events])

  return (
    <>
      <GlobalStyles />
      <SessionProvider session={session}>
        <CartContextProvider>
          <FavouritesContextProvider>
            <ConfirmProvider>
              <React.Fragment>
                <Head>
                  <title>uzma&apos;s art shop</title>
                </Head>
                {loading ? (
                    <Loader loadingPathname={route} />
                ) : (
                  <Component {...pageProps} />
                )}
              </React.Fragment>
            </ConfirmProvider>
          </FavouritesContextProvider>
        </CartContextProvider>
      </SessionProvider>
    </>
  )
}