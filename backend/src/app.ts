import express from 'express';
// import dotenv from 'dotenv';
// import path from 'path';
import costumersRouter from './routes/customers.routes';
import driversRouter from './routes/drivers.routes';
import reviewsRouter from './routes/reviews.routes';
import ridesRouter from './routes/rides.routes';
import cors from 'cors';

// dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const app = express();
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());
app.use('/costumer', costumersRouter);
app.use('/driver', driversRouter);
app.use('/review', reviewsRouter);
app.use('/ride', ridesRouter);

// // Rota de exemplo
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

export default app;
