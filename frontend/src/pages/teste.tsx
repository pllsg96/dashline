// src/App.jsx
import React from 'react';
import { Button, Typography, Container } from '@mui/material';

function Random() {
  return (
    <Container style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Hello World!
      </Typography>
      <Button variant="contained" color="primary">
        Click Me
      </Button>
    </Container>
  );
}

export default Random;
