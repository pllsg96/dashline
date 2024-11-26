import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext';

interface Driver {
  id: string;
  name: string;
  description: string;
  vehicle: string;
  rating: number;
  price: number;
}

const TripOptions: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { tripData } = useTrip();

  const googleMapsApiKey = process.env.VITE_GOOGLE_API_KEY;
  const origin = encodeURIComponent(tripData.origin);
  const destination = encodeURIComponent(tripData.destination);
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x300&maptype=roadmap&markers=color:blue%7Clabel:O%7C${origin}&markers=color:red%7Clabel:D%7C${destination}&key=${googleMapsApiKey}`;

  const handleChooseDriver = async (driverId: string) => {
    try {
      const response = await fetch(`https://api.exemplo.com/choose/${driverId}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Erro ao confirmar a viagem');
      }

      // Redirecionar para a tela de histórico de viagens
      navigate('/history');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Opções de Viagem</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        {/* Mapa estático aqui */}
        <img src={mapUrl} alt="Mapa de viagem" className="w-full h-auto" />
      </div>
      <ul className="space-y-4">
        {tripData.options.map((driver) => (
          <li key={driver.id} className="p-4 border rounded shadow">
            <p>Nome: {driver.name}</p>
            <p>Descrição: {driver.description}</p>
            <p>Veículo: {driver.vehicle}</p>
            <p>Avaliação: {driver.review.rating}</p>
            <p>Comentário: {driver.review.comment}</p>
            <p>Valor: R${driver.value * (tripData.distance / 1000)}</p>
            <button
              onClick={() => handleChooseDriver(driver.id)}
              className="mt-2 bg-green-500 text-white p-2 rounded"
            >
              Escolher
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripOptions;
