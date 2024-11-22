import app from './app';
import prisma from './db/connection';

const PORT = process.env.PORT || 3015;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
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
