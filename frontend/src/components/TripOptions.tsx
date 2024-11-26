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

    // Coordenadas de origem e destino
  const originCoords = `${tripData.origin.latitude},${tripData.origin.longitude}`;
  const destinationCoords = `${tripData.destination.latitude},${tripData.destination.longitude}`;

  // Acessar a chave de API do Google Maps usando import.meta.env
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_API_KEY || '';

  // Construir a URL do mapa estático com caminho
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x600&maptype=roadmap&markers=color:blue%7Clabel:O%7C${originCoords}&markers=color:red%7Clabel:D%7C${destinationCoords}&path=color:0x0000ff|weight:5|${originCoords}|${destinationCoords}&key=${googleMapsApiKey}`;

  const handleChooseDriver = async (driverId: string) => {
    try {
      const response = await fetch(`https://api.exemplo.com/choose/${driverId}`, {
        method: 'POST',
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
    <div className="max-w-4xl mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Opções de Viagem</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex space-x-4">
        {/* Mapa à esquerda */}
        <div className="flex-none w-1/2">
          <img src={mapUrl} alt="Mapa de viagem" className="w-full h-auto" />
        </div>
        {/* Lista de motoristas à direita */}
        <div className="flex-grow">
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
      </div>
    </div>
  );
};

export default TripOptions;
