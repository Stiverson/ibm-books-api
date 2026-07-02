import { Router } from 'express';
import { BookController } from '../../presentation/controllers/book.controller';
import { GetBookByIdUseCase } from '../../application/usecases/get-book-by-id.usecase';
import { SearchBooksUseCase } from '../../application/usecases/search-books.usecase';
import { MongooseBookRepository } from '../database/mongoose-book.repository';

const bookRouter = Router();

const bookRepository = new MongooseBookRepository();
const getBookByIdUseCase = new GetBookByIdUseCase(bookRepository);
const searchBooksUseCase = new SearchBooksUseCase(bookRepository);
const bookController = new BookController(getBookByIdUseCase, searchBooksUseCase);

/**
 * @openapi
 * /livros:
 *   get:
 *     summary: Consulta e pagina livros que estão no catálogo
 *     description: Retorna uma lista paginada de livros permitindo filtros por título, resumo parcial e ordenação customizada.
 *     parameters:
 *       - in: query
 *         name: titulo
 *         schema:
 *           type: string
 *       - in: query
 *         name: resumo
 *         schema:
 *           type: string
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [titulo, anoPublicacao, preco]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: Lista de livros retornada com sucesso.
 *       400:
 *         description: Parâmetros incorretos fornecidos na query string.
 */
bookRouter.get('/livros', (req, res) => bookController.search(req, res));

/**
 * @openapi
 * /livros/{id}:
 *   get:
 *     summary: Busca um livro por ID
 *     description: Retorna os detalhes técnicos completos de um único exemplar a partir do ID do banco NoSQL.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Livro encontrado com sucesso.
 *       404:
 *         description: O ID informado não corresponde a nenhum livro cadastrado.
 */
bookRouter.get('/livros/:id', (req, res) => bookController.getById(req, res));

export { bookRouter };