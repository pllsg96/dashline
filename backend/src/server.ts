import app from './app';
import prisma from './db/connection';

app.listen(3001, '0.0.0.0', () => {
  console.log('Server running on port 3001');
});

async function testDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
}

testDatabaseConnection();
