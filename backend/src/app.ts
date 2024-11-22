import express from 'express';
import dotenv from 'dotenv';
import costumersRouter from './routes/customers.routes';
import driversRouter from './routes/drivers.routes';
import reviewsRouter from './routes/reviews.routes';
import ridesRouter from './routes/rides.routes';

dotenv.config();
const app = express();

// Middleware para parsear JSON
app.use(express.json());
app.use('/costumers', costumersRouter);
app.use('/drivers', driversRouter);
app.use('/reviews', reviewsRouter);
app.use('/rides', ridesRouter);

// // Rota de exemplo
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

export default app;
