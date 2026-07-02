#  IBM Books E-commerce API

API RESTful desenvolvida para gerenciar e consultar o catálogo de livros de um e-commerce, com foco em alta performance, buscas textuais otimizadas e arquitetura escalável.

##  Decisões de Arquitetura (Por que assim?)

Este projeto foi construído utilizando os princípios de **Clean Architecture** e **SOLID**. 
A aplicação foi dividida em camadas lógicas rigorosas para garantir que a regra de negócio (Domínio/Casos de Uso) não conheça os detalhes da infraestrutura (Express, MongoDB).

* **Repository Pattern:** Utilizado para abstrair as consultas ao MongoDB. Isso facilita a criação de testes unitários (usando *mocks*) e permite que o banco de dados seja trocado no futuro sem alterar a regra de negócio.
* **Busca Otimizada (Regex):** Implementada no Mongoose para permitir buscas parciais e *case-insensitive* nos campos de `titulo` e `resumo`.
* **Validação de Entrada:** O `Zod` foi utilizado na camada de Apresentação (Controllers) para garantir que a API nunca processe dados malformados, retornando `400 Bad Request` elegantemente.
* **Seed Automatizado:** Utilização da biblioteca `@faker-js/faker` para gerar os 100 registros iniciais exigidos, demonstrando automação de carga de dados.

##  Tecnologias Utilizadas

* **Node.js & TypeScript** (Tipagem estática e segurança)
* **Express & express-async-errors** (Roteamento e captura global de exceções)
* **MongoDB & Mongoose** (Banco NoSQL e modelagem de dados)
* **Jest & ts-jest** (Testes unitários e cobertura)
* **Zod** (Validação de Schemas)
* **Swagger (OpenAPI 3.0)** (Documentação viva)
* **Docker & Docker Compose** (Containerização do ambiente)

## Como Executar o Projeto Localmente

**Pré-requisitos:** Ter o [Docker](https://www.docker.com/) e o [Node.js](https://nodejs.org/) instalados.

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/Stiverson/ibm-books-api.git](https://github.com/Stiverson/ibm-books-api.git)
   cd ibm-books-api

## Suba o Banco de Dados (MongoDB) com Docker:

```Bash

docker compose up -d

## Instale as dependências e rode o Seed (Carga Inicial):

```Bash

npm install
npm run seed

(Aguarde a mensagem "Seed finalizado com sucesso: 100 livros Adicionados ao banco!")

## Inicie o servidor de desenvolvimento:

```Bash
npm run dev


## Documentação da API (Swagger)

Com o servidor rodando, acesse a documentação interativa pelo navegador:
http://localhost:3000/api-docs

Lá você poderá testar todas as rotas, incluindo os filtros de paginação e busca por ID, diretamente pela interface.

## Como Rodar os Testes

A aplicação possui testes unitários focados na camada de Domínio/Casos de Uso. Para rodar os testes e gerar o relatório de cobertura (Coverage):

```Bash

npm run test:cov