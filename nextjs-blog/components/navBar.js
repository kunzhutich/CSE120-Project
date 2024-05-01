import React from 'react';
import { Box, Toolbar, AppBar, Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavBar() {
    const router = useRouter();

    return (
        <AppBar sx={{ position: 'sticky', backgroundColor: '#00587c' }}>
            <Toolbar display='flex' justifyContent="space-between">
                {/* Creates all the buttons for the navigation */}
                <Box sx={{ flexGrow: 1 }}>
                    <Link href="/fsorders">
                        <Button sx={{
                            fontWeight: router.pathname === "/fsorders" ? 'bold' : 'inherit',
                            textDecoration: router.pathname === "/fsorders" ? 'underline' : 'none',
                            color: 'white'
                        }}>
                            FS Orders
                        </Button>
                    </Link>
                    <Link href="/morders">
                        <Button sx={{ 
                            fontWeight: router.pathname === "/morders" ? 'bold' : 'inherit', 
                            textDecoration: router.pathname === "/morders" ? 'underline' : 'none',
                            color: 'white' 
                        }}>
                            M Orders
                        </Button>
                    </Link>
                    <Link href="/forders">
                        <Button sx={{ 
                            fontWeight: router.pathname === "/forders" ? 'bold' : 'inherit', 
                            textDecoration: router.pathname === "/forders" ? 'underline' : 'none',
                            color: 'white' 
                        }}>
                            F Orders
                        </Button>
                    </Link>
                    <Link href="/h1">
                        <Button sx={{ 
                            fontWeight: router.pathname === "/h1" ? 'bold' : 'inherit', 
                            textDecoration: router.pathname === "/h1" ? 'underline' : 'none',
                            color: 'white' 
                        }}>
                            H1
                        </Button>
                    </Link>
                    <Link href="/h2">
                        <Button sx={{ 
                            fontWeight: router.pathname === "/h2" ? 'bold' : 'inherit', 
                            textDecoration: router.pathname === "/h2" ? 'underline' : 'none',
                            color: 'white' 
                        }}>
                            H2
                        </Button>
                    </Link>
                    <Link href="/h3">
                        <Button sx={{ 
                            fontWeight: router.pathname === "/h3" ? 'bold' : 'inherit', 
                            textDecoration: router.pathname === "/h3" ? 'underline' : 'none',
                            color: 'white' 
                        }}>
                            H3
                        </Button>
                    </Link>
                    <Link href="/h4">
                        <Button sx={{ 
                            fontWeight: router.pathname === "/h4" ? 'bold' : 'inherit', 
                            textDecoration: router.pathname === "/h4" ? 'underline' : 'none',
                            color: 'white' 
                        }}>
                            H4
                        </Button>
                    </Link>
                    <Link href="/h5">
                        <Button sx={{ 
                            fontWeight: router.pathname === "/h5" ? 'bold' : 'inherit', 
                            textDecoration: router.pathname === "/h5" ? 'underline' : 'none',
                            color: 'white' 
                        }}>
                            H5
                        </Button>
                    </Link>
                    <Link href="/un">
                        <Button sx={{ 
                            fontWeight: router.pathname === "/un" ? 'bold' : 'inherit', 
                            textDecoration: router.pathname === "/un" ? 'underline' : 'none',
                            color: 'white' 
                        }}>
                            UN
                        </Button>
                    </Link>
                    <Link href="/m">
                        <Button sx={{ 
                            fontWeight: router.pathname === "/m" ? 'bold' : 'inherit', 
                            textDecoration: router.pathname === "/m" ? 'underline' : 'none',
                            color: 'white' 
                        }}>
                            M
                        </Button>
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    );
}