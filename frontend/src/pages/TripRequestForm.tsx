import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { Box, Typography, TextField, Button, Alert, Paper, Tooltip } from '@mui/material';

const TripRequestForm: React.FC = () => {
  const { setTripData } = useTrip();
  const [customer_id, setcustomer_id] = useState<string>('');
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [error, setError] = useState<string|null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/ride/estimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customer_id, origin, destination }),
      });

      if (!response.ok) {
        throw new Error('Erro ao estimar o valor da viagem');
      }

      const data = await response.json();
      const dataWithInput = { ...data, customer_id, originString: origin, destinationString: destination };
      console.log('Dados recebidos:', dataWithInput);

      // Salvar os dados no contexto
      setTripData(dataWithInput);

      // Redirecionar para a tela de opções de viagem
      navigate('/options');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Box maxWidth="sm" mx="auto" mt={4} p={2} component={Paper} elevation={3}>
      <Typography variant="h5" component="h2" gutterBottom>
        Solicitação de Viagem
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
          <Tooltip title="Utilize: 'randomIdCustomer' no ID do usuário">
            <TextField
              fullWidth
              label="ID do Usuário"
              value={customer_id}
              onChange={(e) => setcustomer_id(e.target.value)}
              variant="outlined"
              margin="normal"
          />
          </Tooltip>
            <TextField
              fullWidth
              label="Endereço de Origem"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Endereço de Destino"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              variant="outlined"
              margin="normal"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Estimar Valor
            </Button>
          </form>
    </Box>
  );
};

export default TripRequestForm;
