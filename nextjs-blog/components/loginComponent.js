import React from 'react';
import {TextField, Button, Box} from '@mui/material';
import Link from 'next/link';

export default function LoginPage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
  };

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
        <Box 
        maxWidth="medium"
        sx={{
            backgroundColor:'#d9d9d9', 
            borderRadius:'10px', 
            padding:3,}}>
        <form onSubmit={handleSubmit}>
            <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            // required
            fullWidth
            />
            <TextField
            label="Password"
            variant="outlined"
            type="password"
            margin="normal"
            // required
            fullWidth
            />
            <Box display="flex" justifyContent="center">
                <Link href="/fsorders">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{marginBottom:'10px'}}>
                    Sign in
                    </Button>
                </Link>
            </Box>
            <Box display="flex" justifyContent="center" mb>
                <Link href="/forgot-password">
                    Forgot Password?
                </Link>
            </Box>
        </form>
        </Box>
    </Box>
  );
}
