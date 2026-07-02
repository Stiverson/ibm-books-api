import { BookRepository, SearchParams, PaginatedResult } from '../../domain/repositories/book.repository';
import { Book } from '../../domain/entities/book.entity';

export class SearchBooksUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute(params: SearchParams): Promise<PaginatedResult<Book>> {
  
    const limit = params.limit && params.limit > 50 ? 50 : params.limit;

    return await this.bookRepository.search({
      ...params,
      limit
    });
  }
}