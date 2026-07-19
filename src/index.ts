import 'dotenv/config';

import express, { Request, Response } from 'express';
import userRouter from './module/user/user.route';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', userRouter);


app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'UP', message: 'Welcome to BE-RSCR-BP TypeScript API!' });
});

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to BE-RSCR-BP TypeScript API!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
