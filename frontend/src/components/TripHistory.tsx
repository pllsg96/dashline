import React, { useState } from 'react';

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
    <div className="max-w-2xl mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Histórico de Viagens</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="ID do Usuário"
          value={customer_id}
          onChange={(e) => setcustomer_id(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <select
          value={driverFilter}
          onChange={(e) => setDriverFilter(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="Todos">Todos</option>
          <option value="Motorista1">Motorista1</option>
          <option value="Motorista2">Motorista2</option>
        </select>
        <button onClick={handleFilter} className="w-full bg-blue-500 text-white p-2 rounded">
          Aplicar Filtro
        </button>
      </div>
      <ul className="mt-4 space-y-4">
        {trips.map((trip) => (
          <li key={trip.id} className="p-4 border rounded shadow">
            <p>Data e Hora: {trip.date}</p>
            <p>Motorista: {trip.driver.name}</p>
            <p>Origem: {trip.origin}</p>
            <p>Destino: {trip.destination}</p>
            <p>Distância: {trip.distance/1000} Km</p>
            <p>Tempo: {convertSecondsToTime(trip.duration)}</p>
            <p>Valor: R$ {trip.value.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripHistory;
