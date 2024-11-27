import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { Box, Button, Card, CardContent, Typography, Alert, Rating } from '@mui/material';

interface Driver {
  id: string;
  name: string;
  description: string;
  vehicle: string;
  driver: {
    id: number,
    name: string,
  }
  review: {
    rating: number,
    comment: string,
  }
  rating: number;
  value: number;
}

const TripOptions: React.FC = () => {
  const [error, setError] = useState<string|null>(null);
  const navigate = useNavigate();
  const { tripData } = useTrip();

  const originCoords = `${tripData.origin.latitude},${tripData.origin.longitude}`;
  const destinationCoords = `${tripData.destination.latitude},${tripData.destination.longitude}`;
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_API_KEY||'';

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x600&maptype=roadmap&markers=color:blue%7Clabel:O%7C${originCoords}&markers=color:red%7Clabel:D%7C${destinationCoords}&path=color:0x0000ff|weight:5|${originCoords}|${destinationCoords}&key=${googleMapsApiKey}`;

  const handleChooseDriver = async (driver: Driver) => {
    try {
      const formatData = {
        customer_id: tripData.customer_id,
        origin: tripData.originString,
        destination: tripData.destinationString,
        distance: tripData.distance,
        duration: tripData.duration,
        driver: {
          id: driver.id,
          name: driver.name,
        },
        value: (driver.value * (tripData.distance / 1000)),
      };
      const response = await fetch('http://localhost:8080/ride/confirm', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formatData)
      });

      if (!response.ok) {
        throw new Error('Erro ao confirmar a viagem');
      }

      navigate('/history');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Box maxWidth="lg" mx="auto" mt={4} p={2}>
      <Typography variant="h4" component="h2" gutterBottom>
        Opções de Viagem
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Box display="flex" gap={2}>
        <Box flex="1">
          <img src={mapUrl} alt="Mapa de viagem" style={{ width: '100%', height: 'auto' }} />
        </Box>
        <Box flex="1">
          {tripData.options.map((driver: Driver) => (
            <Card key={driver.id} variant="outlined" sx={{ mb: 2, borderColor: 'primary.main', boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: 'primary.main' }}>{driver.name}</Typography>
                <Typography>Descrição: {driver.description}</Typography>
                <Typography>Veículo: {driver.vehicle}</Typography>
                <Box sx={{display:"flex", alignItems:"center"}}>
                  <Typography>Avaliação: </Typography>
                  <Rating name="read-only" value={driver.review.rating} readOnly />
                </Box>
                
                <Typography>Comentário: {driver.review.comment}</Typography>
                <Typography>Valor: R${(driver.value * (tripData.distance / 1000)).toFixed(2)}</Typography>
                <Button
                  onClick={() => handleChooseDriver(driver)}
                  variant="contained"
                  color="success"
                  sx={{ mt: 2, backgroundColor: 'success.main', '&:hover': { backgroundColor: 'success.dark' } }}
                >
                  Escolher
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default TripOptions;
