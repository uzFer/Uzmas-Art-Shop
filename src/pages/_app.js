import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Courier+Prime&family=Dosis:wght@300&family=Great+Vibes&family=Quicksand:wght@300&display=swap');

  body {
    padding: 0;
    margin: 0;
    font-family: 'Dosis', sans-serif;
  }
`;

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps}/>
    </>
  )
}
 