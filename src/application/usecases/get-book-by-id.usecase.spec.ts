import { GetBookByIdUseCase } from './get-book-by-id.usecase';
import { BookRepository } from '../../domain/repositories/book.repository';
import { Book } from '../../domain/entities/book.entity';


const mockBookRepository = {
  findById: jest.fn(),
  search: jest.fn(),
} as unknown as BookRepository;

describe('GetBookByIdUseCase', () => {
  let useCase: GetBookByIdUseCase;

  
  beforeEach(() => {
    useCase = new GetBookByIdUseCase(mockBookRepository);
    jest.clearAllMocks();
  });

  it('deve retornar um livro quando o ID for válido', async () => {
    
    const mockBook = { id: '123', titulo: 'Clean Code', autor: 'Robert C. Martin' } as Book;
    (mockBookRepository.findById as jest.Mock).mockResolvedValue(mockBook);


    const result = await useCase.execute('123');

    
    expect(result).toEqual(mockBook);
    expect(mockBookRepository.findById).toHaveBeenCalledWith('123');
    expect(mockBookRepository.findById).toHaveBeenCalledTimes(1);
  });

  it('deve retornar null se o livro não for encontrado', async () => {
    
    (mockBookRepository.findById as jest.Mock).mockResolvedValue(null);

    
    const result = await useCase.execute('999');

    expect(result).toBeNull();
    expect(mockBookRepository.findById).toHaveBeenCalledWith('999');
  });
});