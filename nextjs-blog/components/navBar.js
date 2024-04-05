import React from 'react';
import {Box, Toolbar, AppBar, Button} from '@mui/material';
import Link from 'next/link';
import {useRouter} from 'next/router';

export default function NavBar() {
  const router = useRouter();

  return (
    <AppBar position="static" sx={{backgroundColor: '#00587c'}}>
      <Toolbar display= 'flex' justifyContent="space-between">
        {/* Creates all the buttons for the navigation */}
        <Box sx={{flexGrow: 1}}>
          <Link href="/fsorders">
            <Button sx={{color: router.pathname === "/fsorders" ? "secondary" : 'white'}}>
              FS Orders
            </Button>
          </Link>
          <Link href="/morders">
            <Button sx={{color: router.pathname === "/morders" ? "secondary" : 'white'}}>
              M Orders
            </Button>
          </Link>
          <Link href="/forders">
            <Button sx={{color: router.pathname === "/forders" ? "secondary" : 'white'}}>
              F Orders
            </Button>
          </Link>
          <Link href="/h1">
            <Button sx={{color: router.pathname === "/h1" ? "secondary" : 'white'}}>
              H1
            </Button>
          </Link>
          <Link href="/h2">
            <Button sx={{color: router.pathname === "/h2" ? "secondary" : 'white'}}>
              H2
            </Button>
          </Link>
          <Link href="/h3">
            <Button sx={{color: router.pathname === "/h3" ? "secondary" : 'white'}}>
              H3
            </Button>
          </Link>
          <Link href="/h4">
            <Button sx={{color: router.pathname === "/h4" ? "secondary" : 'white'}}>
              H4
            </Button>
          </Link>
          <Link href="/h5">
            <Button sx={{color: router.pathname === "/h5" ? "secondary" : 'white'}}>
              H5
            </Button>
          </Link>
          <Link href="/un">
            <Button sx={{color: router.pathname === "/un" ? "secondary" : 'white'}}>
              UN
            </Button>
          </Link>
          <Link href="/m">
            <Button sx={{color: router.pathname === "/m" ? "secondary" : 'white'}}>
              M
            </Button>
          </Link>
        </Box>

      </Toolbar>
    </AppBar>
  );
}