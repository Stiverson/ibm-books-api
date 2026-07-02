import { BookRepository, SearchParams, PaginatedResult } from '../../domain/repositories/book.repository';
import { Book } from '../../domain/entities/book.entity';
import { BookModel } from './book.model';

export class MongooseBookRepository implements BookRepository {
  async findById(id: string): Promise<Book | null> {
    return await BookModel.findById(id).lean();
  }

  async search(params: SearchParams): Promise<PaginatedResult<Book>> {
    const { titulo, resumo, sort, page = 1, limit = 20 } = params;
    const query: any = {};

    if (titulo) {
      query.titulo = { $regex: titulo, $options: 'i' };
    }

    if (resumo) {
      query.resumo = { $regex: resumo, $options: 'i' };
    }

    const sortField = sort || 'titulo';
    const skip = (page - 1) * limit;

    const [results, total] = await Promise.all([
      BookModel.find(query)
        .sort({ [sortField]: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      BookModel.countDocuments(query)
    ]);

    return {
      results: results as unknown as Book[],
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }
}