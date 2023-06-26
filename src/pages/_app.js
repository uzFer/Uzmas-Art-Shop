import { CartContextProvider } from "@/components/CartContext";
import { FavouritesContextProvider } from "@/components/FavouritesContext";
import { createGlobalStyle } from "styled-components"
import { SessionProvider } from "next-auth/react"

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
  return (
    <>
      <GlobalStyles />
      <SessionProvider session={session}>
        <CartContextProvider>
          <FavouritesContextProvider>
            <Component {...pageProps}/>
          </FavouritesContextProvider>
        </CartContextProvider>
      </SessionProvider>
    </>
  )
}