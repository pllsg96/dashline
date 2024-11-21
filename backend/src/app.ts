// import express from 'express';
// // import carRouter from './routes/Car.routes';

// const app = express();
// app.use(express.json());
// // app.use('/cars', carRouter);

// export default app;

import express from 'express';

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rota de exemplo
app.get('/', (req, res) => {
  res.send('33, World!');
});

export default app;
