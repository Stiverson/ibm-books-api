import { BookRepository } from '../../domain/repositories/book.repository';
import { Book } from '../../domain/entities/book.entity';

export class GetBookByIdUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute(id: string): Promise<Book | null> {
    return await this.bookRepository.findById(id);
  }
}