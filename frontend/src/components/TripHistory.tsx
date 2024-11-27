import React, { useState } from 'react';
import { format } from 'date-fns';
import { Box, Typography, TextField, Select, MenuItem, Button, Alert, List, ListItem, ListItemText, Paper, Avatar } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


interface Trip {
  id: string;
  date: string;
  driverName: string;
  origin: string;
  destination: string;
  distance: string;
  time: string;
  price: number | null; // Permitir que price seja null
}

const TripHistory: React.FC = () => {
  const [customer_id, setcustomer_id] = useState<string>('');
  const [driverFilter, setDriverFilter] = useState<string>('Todos');
  const [trips, setTrips] = useState<Trip[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFilter = async () => {
    try {
      let url = `http://localhost:3001/ride/${customer_id}`;
      
      if (driverFilter !== 'Todos') {
        url += `?driver_id=${driverFilter}`;
      }

      console.log(url, '------');

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Erro ao buscar histórico de viagens');
      }
      const data: Trip[] = await response.json();
      setTrips(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

function convertSecondsToTime(secondsString) {
  // Remover o "s" do final e converter para número
  const totalSeconds = parseInt(secondsString.replace('s', ''), 10);

  // Calcular horas, minutos e segundos
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Formatar a string de saída
  const formattedTime = `${hours}h ${minutes}m ${seconds}s`;

  return formattedTime;
}

  return (
    <Box maxWidth="md" mx="auto" mt={4} p={2} component={Paper} elevation={3}>
      <Typography variant="h5" component="h2" gutterBottom>
        Histórico de Viagens
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Box mb={2}>
        <TextField
          fullWidth
          label="ID do Usuário"
          value={customer_id}
          onChange={(e) => setcustomer_id(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <Select
          fullWidth
          value={driverFilter}
          onChange={(e) => setDriverFilter(e.target.value)}
          variant="outlined"
          margin="normal"
        >
          <MenuItem value="Todos">Todos</MenuItem>
          <MenuItem value="1">Homer Simpson</MenuItem>
          <MenuItem value="2">Dominic Toretto</MenuItem>
          <MenuItem value="3">James Bond</MenuItem>
        </Select>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleFilter}
          sx={{ mt: 2 }}
        >
          Aplicar Filtro
        </Button>
      </Box>
      <List>
        {trips.map((trip) => (
          <ListItem key={trip.id} component={Paper} sx={{ mb: 2, p: 2, display: 'flex', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
            <ListItemText
              primary={
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                  {trip.driver.name}
                </Typography>
              }
              secondary={
                <>
                  <Box display="flex" alignItems="center" mb={1}>
                    <AccessTimeIcon sx={{ mr: 1 }} />
                    <Typography component="span">{`Data: ${new Date(trip.date).toLocaleString()}`}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mb={1}>
                    <LocationOnIcon sx={{ mr: 1 }} />
                    <Typography component="span">Origem: {trip.origin}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mb={1}>
                    <LocationOnIcon sx={{ mr: 1 }} />
                    <Typography component="span">Destino: {trip.destination}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mb={1}>
                    <DirectionsCarIcon sx={{ mr: 1 }} />
                    <Typography component="span">Distância: {trip.distance / 1000} Km</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mb={1}>
                    <AccessTimeIcon sx={{ mr: 1 }} />
                    <Typography component="span">Tempo: {convertSecondsToTime(trip.duration)}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <AttachMoneyIcon sx={{ mr: 1 }} />
                    <Typography component="span">Valor: R$ {trip.value.toFixed(2)}</Typography>
                  </Box>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TripHistory;
