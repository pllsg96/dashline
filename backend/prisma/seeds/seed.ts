import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.customers.create({
    data: { id: 'randomIdCustomer'}});

  const drivers = [
    {
      id: 1,
      name: 'Homer Simpson',
      description: 'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
      vehicle: 'Plymouth Valiant 1973 rosa e enferrujado',
      review: {
        create: {
          rating: 2,
          comment: 'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.'
        },
      },
      value: 2.5,
      minKm: 1,
    },
    {
      id: 2,
      name: 'Dominic Toretto',
      description: 'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
      vehicle: 'Dodge Charger R/T 1970 modificado',
      review: {
        create: {
          rating: 4,
          comment: 'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!'
        },
      },
      value: 5.0,
      minKm: 5,
    },
    {
      id: 3,
      name: 'James Bond',
      description: 'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
      vehicle: 'Aston Martin DB5 clássico',
      review: {
        create: {
          rating: 5,
          comment: 'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.'
        },
      },
      value: 10.0,
      minKm: 10,
    },
  ];

  const resetDatabase = async () => {
    try {
      // Excluir os registros das tabelas necessárias
      await prisma.reviews.deleteMany();
      await prisma.drivers.deleteMany();
      
      console.log('Banco de dados limpo com sucesso.');
    } catch (error) {
      console.error('Erro ao limpar banco de dados:', error);
    }
  };


  // Função assíncrona para criar motoristas e adicionar ao array
  const createDrivers = async () => {
    for (const driverData of drivers) {
      try {
        await prisma.drivers.create({
          data: driverData,
        });
      } catch (error) {
        console.error('Erro ao criar motorista:', error);
      }
    }
  };

  // Resetar o banco de dados antes de adicionar novos dados
  await resetDatabase();

  // Criar motoristas depois de limpar o banco
  await createDrivers();

  console.log('Motoristas criados com sucesso');
}


main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
