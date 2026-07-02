import mongoose, { Schema } from 'mongoose';
import { Book } from '../../domain/entities/book.entity';

const BookSchema = new Schema<Book>({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  editora: { type: String, required: true },
  anoPublicacao: { type: Number, required: true },
  categorias: [{ type: String }],
  preco: { type: Number, required: true },
  estoque: { type: Number, required: true },
  resumo: { type: String, required: true },
  dataCadastro: { type: Date, default: Date.now },
});


BookSchema.index({ isbn: 1 });
BookSchema.index({ titulo: 'text', resumo: 'text' });

export const BookModel = mongoose.model<Book>('Book', BookSchema);