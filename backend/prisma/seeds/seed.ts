import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';

// Carregar variáveis de ambiente do arquivo .env centralizado
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const prisma = new PrismaClient();

async function main() {
  // Exemplo de criação de um driver
  const driver = await prisma.drivers.create({
    data: {
      name: 'Homer Simpson',
      description: 'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
          car: 'Plymouth Valiant 1973 rosa e enferrujado',
          review: {
              create: {
                  rating: 2,
            comment: 'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.'      
          },
      },
      value: 2.5,
      minKm: 1,
    },
  });

  console.log('Driver created:', driver);

  // Adicione mais dados conforme necessário
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
