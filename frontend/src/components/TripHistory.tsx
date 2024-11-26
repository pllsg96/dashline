import React, { useState } from 'react';

interface Trip {
  id: string;
  date: string;
  driverName: string;
  origin: string;
  destination: string;
  distance: string;
  time: string;
  price: number;
}

const TripHistory: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const [driverFilter, setDriverFilter] = useState<string>('Todos');
  const [trips, setTrips] = useState<Trip[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFilter = async () => {
    try {
      const response = await fetch(`https://api.exemplo.com/history?userId=${userId}&driver=${driverFilter}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar histórico de viagens');
      }
      const data: Trip[] = await response.json();
      setTrips(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Histórico de Viagens</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="ID do Usuário"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <select
          value={driverFilter}
          onChange={(e) => setDriverFilter(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="Todos">Todos</option>
          {/* Adicione mais opções de motoristas conforme necessário */}
        </select>
        <button onClick={handleFilter} className="w-full bg-blue-500 text-white p-2 rounded">
          Aplicar Filtro
        </button>
      </div>
      <ul className="mt-4 space-y-4">
        {trips.map((trip) => (
          <li key={trip.id} className="p-4 border rounded shadow">
            <p>Data e Hora: {trip.date}</p>
            <p>Nome do Motorista: {trip.driverName}</p>
            <p>Origem: {trip.origin}</p>
            <p>Destino: {trip.destination}</p>
            <p>Distância: {trip.distance}</p>
            <p>Tempo: {trip.time}</p>
            <p>Valor: {trip.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripHistory;
