import React from 'react';
import { Container, TextField, Button, Box} from '@mui/material';

export default function LoginPage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          required
          fullWidth
        />
        <TextField
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
        >
          Sign in
        </Button>
        </Box>
      </form>
    </Container>
  );
}
