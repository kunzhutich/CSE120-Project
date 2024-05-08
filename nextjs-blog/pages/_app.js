import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { AppStateProvider } from '../context/AppStateContext'; 

export default function App({ Component, pageProps }) {
    return (
        <AppStateProvider>
            <CssBaseline />
            <Component {...pageProps} />
        </AppStateProvider>
    );
}