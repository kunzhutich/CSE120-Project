import React from 'react';
import { TextField, Button, Box } from '@mui/material';
import Link from 'next/link';

export default function LoginPage() {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get('username');
        const password = data.get('password');

        try {
            const response = await fetch('http://127.0.0.1:5000//login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const { sa } = await response.json();

                // Store service area in browser storage or context to use later
                sessionStorage.setItem('sa', sa); // Using sessionStorage or localStorage depends on your needs

                window.location.href = '/fsorders';
            } else {
                alert('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
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
        }}
    >
        <Box>
            <img src="/logo.png" alt="Logo" style={{ width: '550px', height: 'auto', marginBottom: '50px' }} />
        </Box>
        <Box
            maxWidth="medium"
            sx={{
                backgroundColor: '#d9d9d9',
                borderRadius: '10px',
                padding: 3,
            }}
        >
            <form onSubmit={handleSubmit}>
                <TextField
                    name="username"
                    label="Username"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                />
                <TextField
                    name="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    margin="normal"
                    required
                    fullWidth
                />
                <Box display="flex" justifyContent="center">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ marginBottom: '10px' }}
                    >
                        Sign in
                    </Button>
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
