import { Box } from '@mui/material';
import React from 'react';

export default function ForgotPassword() {
    return (
        <Box
        sx={{
            backgroundColor: '#00587c',
            minHeight: '100vh',
            justifyContent: 'center',
            flexDirection: 'column',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Box>
                <img src="/logo.png"
                alt="Logo"
                style={{width:'550px', height:'auto', marginBottom:'50px'}}/>
            </Box>
            <Box sx={{color: 'white'}}>
                <p>Please contact your IT department to reset your password.</p>
            </Box>
        </Box>
    );
}