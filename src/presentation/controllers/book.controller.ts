import { Request, Response } from 'express';
import { GetBookByIdUseCase } from '../../application/usecases/get-book-by-id.usecase';
import { SearchBooksUseCase } from '../../application/usecases/search-books.usecase';
import { searchBooksSchema } from '../dtos/book-query.dto';

export class BookController {
  constructor(
    private getBookByIdUseCase: GetBookByIdUseCase,
    private searchBooksUseCase: SearchBooksUseCase
  ) {}

  async getById(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string;
    const book = await this.getBookByIdUseCase.execute(id);
    
    if (!book) {
      res.status(404).json({ error: 'Livro não encontrado' });
      return;
    }

    res.json(book);
  }

  async search(req: Request, res: Response): Promise<void> {
    const validatedQuery = searchBooksSchema.safeParse(req.query);

    if (!validatedQuery.success) {
      res.status(400).json({ 
        error: 'Requisição inválida', 
        details: validatedQuery.error.format() 
      });
      return;
    }

    const result = await this.searchBooksUseCase.execute(validatedQuery.data);
    res.json(result);
  }
}