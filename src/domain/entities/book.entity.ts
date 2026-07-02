export interface Book {
  id: string; 
  titulo: string;
  autor: string;
  isbn: string;
  editora: string;
  anoPublicacao: number;
  categorias: string[];
  preco: number;
  estoque: number;
  resumo: string;
  dataCadastro: Date;
}