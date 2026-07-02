import { Book } from '../entities/book.entity';

export interface SearchParams {
  titulo?: string;
  resumo?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  results: T[];
  total: number;
  page: number;
  totalPages: number;
}

export interface BookRepository {
  findById(id: string): Promise<Book | null>;
  search(params: SearchParams): Promise<PaginatedResult<Book>>;
}