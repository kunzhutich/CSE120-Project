import CssBaseline from '@mui/material/CssBaseline';

export default function App({ Component, pageProps }) {
  return <><CssBaseline /><Component {...pageProps} /></>;
}