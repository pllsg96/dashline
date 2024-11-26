export type Review = {
  rating: number;    // Nota de avaliação
  comment: string;   // Comentário da avaliação
};

// Tipo para o motorista (Driver)
export type Driver = {
  id: number;        // ID do motorista
  name: string;      // Nome do motorista
  description?: string; // Descrição do motorista
  vehicle?: string;   // Veículo do motorista
  review?: Review;    // Avaliação do motorista
  value?: number;
};
// Tipo para a viagem (RideRequest)
export type RideConfirm = {
  customerId: string;  // Identificador do cliente
  origin: string;      // Local de origem
  destination: string; // Local de destino
  distance: number;    // Distância da viagem
  duration: string;    // Duração da viagem
  driver: Driver;      // Dados do motorista
  value: number;
};