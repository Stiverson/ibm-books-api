import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import { BookModel } from './book.model';
import * as dotenv from 'dotenv';

dotenv.config();

async function seed() {
  try {
    console.log(' Iniciando Conexão ao MongoDB para o seed...');
    await mongoose.connect(process.env.MONGO_URI!);
    
    await BookModel.deleteMany({}); 

    const mandatoryBooks = [
      {
        titulo: "Clean Code",
        autor: "Robert C. Martin",
        isbn: "9780132350884",
        editora: "Prentice Hall",
        anoPublicacao: 2008,
        categorias: ["Programação", "Engenharia de Software"],
        preco: 199.90,
        estoque: 32,
        resumo: "Livro essencial sobre boas práticas de desenvolvimento e código limpo.",
        dataCadastro: new Date(),
      },
      {
        titulo: "Clean Architecture",
        autor: "Robert C. Martin",
        isbn: "9780134494166",
        editora: "Prentice Hall",
        anoPublicacao: 2017,
        categorias: ["Arquitetura", "Engenharia de Software"],
        preco: 250.00,
        estoque: 15,
        resumo: "Um guia prático sobre arquitetura de software limpa e sustentável.",
        dataCadastro: new Date(),
      },
      {
        titulo: "The Clean Coder",
        autor: "Robert C. Martin",
        isbn: "9780137081073",
        editora: "Prentice Hall",
        anoPublicacao: 2011,
        categorias: ["Carreira", "Programação"],
        preco: 180.00,
        estoque: 10,
        resumo: "Um guia de conduta para programadores profissionais.",
        dataCadastro: new Date(),
      }
    ];

    const randomBooks = Array.from({ length: 97 }).map(() => ({
      titulo: faker.book.title(),
      autor: faker.book.author(),
      isbn: faker.commerce.isbn(),
      editora: faker.company.name(),
      anoPublicacao: faker.number.int({ min: 1990, max: 2024 }),
      categorias: [faker.book.genre(), faker.book.genre()],
      preco: Number(faker.commerce.price()),
      estoque: faker.number.int({ min: 0, max: 100 }),
      resumo: faker.lorem.paragraph(),
      dataCadastro: faker.date.recent(),
    }));

    await BookModel.insertMany([...mandatoryBooks, ...randomBooks]);
    
    console.log(' Seed finalizado com sucesso: 100 livros Adicionados ao banco!');
    process.exit(0);
  } catch (error) {
    console.error(' Ocorreu algo de errado durante o seed:', error);
    process.exit(1);
  }
}

seed();