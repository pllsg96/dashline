import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext';

const TripRequestForm: React.FC = () => {
  const { setTripData } = useTrip();
  const [customer_id, setcustomer_id] = useState<string>('');
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
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
      const dataWithCustomerId = {...data, customer_id }
      console.log('Dados recebidos:', dataWithCustomerId);

      // Salvar os dados no contexto
      setTripData(dataWithCustomerId);

      // Redirecionar para a tela de opções de viagem
      navigate('/options');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Solicitação de Viagem</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="ID do Usuário"
          value={customer_id}
          onChange={(e) => setcustomer_id(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Endereço de Origem"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Endereço de Destino"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Estimar Valor
        </button>
      </form>
    </div>
  );
};

export default TripRequestForm;
