import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { bookRouter } from './infrastructure/web/book.routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('Conexão realizada com sucesso ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));


const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'IBM Books E-commerce API',
      version: '1.0.0',
      description: 'API RESTful desenvolvida em TypeScript para consulta otimizada de acervos de livros.',
    },
    servers: [
      { url: `http://localhost:${process.env.PORT || 3000}` }
    ],
  },
  apis: ['./src/infrastructure/web/*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'UP' });
});

app.use(bookRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Erro encontrado pelo Middleware:', err.message);
  res.status(500).json({ error: 'Erro interno do servidor.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` O Servidor esta rodando na porta ${PORT}`);
  console.log(` Documentação Swagger disponível em: http://localhost:${PORT}/api-docs`);
});

export { app };