import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './modules/student/student.route';
const app: Application = express();
// const port = 3000

// Parsers
app.use(express.json());
app.use(cors());

//Application Routes
app.use('/api/v1/students', StudentRoutes);

// example of a controller function
const getAController = (req: Request, res: Response) => {
  const data = 'Hello World, This is test !';
  res.send(data);
};

// Routes
app.get('/', getAController);

export default app;
