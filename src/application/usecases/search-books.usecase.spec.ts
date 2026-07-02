import { SearchBooksUseCase } from './search-books.usecase';
import { BookRepository } from '../../domain/repositories/book.repository';
import { Book } from '../../domain/entities/book.entity';


const mockBookRepository = {
  findById: jest.fn(),
  search: jest.fn(),
} as unknown as BookRepository;

describe('SearchBooksUseCase', () => {
  let useCase: SearchBooksUseCase;

  beforeEach(() => {
    useCase = new SearchBooksUseCase(mockBookRepository);
    jest.clearAllMocks();
  });

  it('deve retornar uma lista paginada de livros', async () => {
    
    const mockResult = {
      results: [{ id: '1', titulo: 'Clean Code' } as Book],
      total: 1,
      page: 1,
      totalPages: 1
    };
    (mockBookRepository.search as jest.Mock).mockResolvedValue(mockResult);

    const result = await useCase.execute({ page: 1, limit: 20 });
    expect(result).toEqual(mockResult);
    expect(mockBookRepository.search).toHaveBeenCalledWith({ page: 1, limit: 20 });
  });

  it('deve limitar o número máximo de itens por página a 50', async () => {
    const mockResult = { results: [], total: 0, page: 1, totalPages: 0 };
    (mockBookRepository.search as jest.Mock).mockResolvedValue(mockResult);

    await useCase.execute({ limit: 5000 });
    expect(mockBookRepository.search).toHaveBeenCalledWith({ limit: 50 });
  });
});