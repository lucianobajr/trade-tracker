# Web Project - Trade Tracker

Este é um guia de uso para o projeto web desenvolvido, que consiste em um servidor (backend) feito com Express no Node.js e um cliente (frontend) feito com React e TypeScript.

## Requisitos

Antes de começar, certifique-se de ter o Node.js instalado em sua máquina. Recomenda-se a versão v18.15.0 do Node.js. Você pode baixar e instalar o Node.js a partir do site oficial: [nodejs.org](https://nodejs.org)

## Configuração do servidor

### Instalação

1. Clone este repositório em sua máquina.
2. Navegue até a pasta do servidor: `cd server`
3. Execute o seguinte comando para instalar as dependências do servidor:

```shell
npm install
```

### Comandos disponíveis

No arquivo `package.json`, você encontrará os seguintes comandos disponíveis para o servidor:

- `build`: Limpa a pasta `dist` e compila o código TypeScript em JavaScript, movendo os arquivos resultantes para a pasta `dist`.
- `dev`: Inicia o servidor em modo de desenvolvimento usando o `ts-node-dev` para transpilar e reiniciar automaticamente o servidor quando houver alterações nos arquivos.
- `prisma:migration`: Executa as migrações do Prisma para atualizar o banco de dados.
- `prisma:deploy`: Implanta as migrações do Prisma em um banco de dados.
- `prisma:studio`: Inicia o Prisma Studio, uma interface gráfica para explorar e gerenciar o banco de dados.
- `prisma:erd`: Gera um diagrama de relacionamento de entidades (ERD) com base no modelo do Prisma.
- `start`: Inicia o servidor em modo de produção usando o arquivo JavaScript compilado.

### Rotas disponíveis

A seguir, estão listadas as rotas disponíveis no servidor:

- `POST /admins`: Cria um novo administrador.
- `POST /admins/auth/login`: Realiza o login de um administrador.
- `GET /cities`: Retorna a lista de cidades.
- `GET /cities/search`: Realiza uma pesquisa por cidades.
- `GET /cities/without-state`: Retorna a lista de cidades sem associação a um estado.
- `POST /cities`: Cria uma nova cidade.
- `DELETE /cities/:id`: Remove uma cidade com base no ID.
- `POST /clients`: Cria um novo cliente.
- `DELETE /clients/:id`: Remove um cliente com base no ID.
- `GET /clients/filter`: Realiza filtragem de clientes.
- `GET /clients`: Retorna a lista de clientes.
- `PUT /clients/:id`: Atualiza um cliente com base no ID.
- `POST /makers`: Cria um novo fabricante.
- `GET /makers`: Retorna a lista de fabricantes.
- `DELETE /makers/:id`: Remove um fabricante com base no ID.
- `PUT /makers/:id`: Atualiza um fabricante com base no ID.
- `POST /products`: Cria um novo produto.
- `GET /products`: Retorna a lista de produtos.
- `DELETE /products/:id`: Remove um produto com base no ID.
- `PUT /products/:id`: Atualiza um produto com base no ID.
- `GET /products/filter`: Realiza filtragem de produtos.
- `POST /sales`: Cria uma nova venda.
- `GET /sales`: Retorna a lista de vendas.

## Estrutura de pastas do servidor

- `src`: Contém o código-fonte do servidor.
  - `app`: Contém os modelos, visualizações e controladores do aplicativo.
  - `config`: Contém as configurações do servidor.
  - `domain`: Contém as pastas relacionadas a cada domínio (admin, city, products, etc.), incluindo repositórios, esquemas e casos de uso.
  - `shared`: Contém código compartilhado entre vários domínios.
    - `container`: Contém a injeção de dependência do servidor.
  - `infra`: Contém a infraestrutura do servidor.
    - `http`: Contém as rotas HTTP do servidor e o arquivo `server.ts`.
  - `prisma`: Contém os arquivos relacionados ao ORM Prisma.

## Dependências do servidor

As seguintes dependências são usadas no servidor:

- `@prisma/client`: Cliente do Prisma para interagir com o banco de dados.
- `bcrypt`: Biblioteca para hash de senhas.
- `cors`: Middleware do Express para lidar com CORS.
- `date-fns`: Biblioteca para manipulação de datas.
- `dotenv`: Biblioteca para carregar variáveis de ambiente de um arquivo `.env`.
- `express`: Framework web para Node.js.
- `express-async-errors`: Tratamento de erros assíncronos para o Express.
- `i18next`: Biblioteca de internacionalização.
- `i18next-express-middleware`: Middleware do Express para integração com o i18next.
- `jsonwebtoken`: Implementação de JSON Web Tokens (JWT).
- `multer`: Middleware para lidar com upload de arquivos.
- `pg`: Cliente PostgreSQL para o Prisma.
- `prisma`: ORM para acesso ao banco de dados.
- `reflect-metadata`: Biblioteca para adicionar metadados em tempo de execução.
- `swagger-ui-express`: Interface para visualizar e interagir com APIs RESTful.
- `tsyringe`: Biblioteca de injeção de dependência.
- `zod`: Biblioteca para validação de esquemas.

## Configuração do cliente

### Instalação

1. Navegue até a pasta do cliente: `cd client`
2. Execute o seguinte comando para instalar as dependências do cliente:

```shell
npm install
```

### Inicialização do projeto

1. Após a instalação das dependências, execute o seguinte comando para iniciar o projeto React:

```shell
npm start
```

Este comando inicia o aplicativo em modo de desenvolvimento. Abra seu navegador e acesse [http://localhost:3000](http://localhost:3000) para visualizar o cliente.

### Estrutura de pastas do cliente

A estrutura de pastas do cliente é a seguinte:

- `src`: Contém o código-fonte do cliente.
  - `App.tsx`: Componente principal do aplicativo.
  - `assets`: Contém arquivos estáticos, como imagens e fontes.
  - `components`: Contém componentes reutilizáveis do aplicativo.
  - `constants`: Contém constantes do aplicativo.
  - `contexts`: Contém os contextos do aplicativo.
  - `global`: Contém estilos globais e configurações de tema.
  - `hooks`: Contém hooks personalizados.
  - `index.tsx`: Ponto de entrada do aplicativo.
  - `pages`: Contém

 as páginas do aplicativo.
  - `react-app-env.d.ts`: Arquivo de declaração de tipo para o ambiente React.
  - `reportWebVitals.ts`: Utilitário para medir o desempenho da aplicação.
  - `routes`: Contém as definições de rota do aplicativo.
  - `services`: Contém serviços para interagir com a API do servidor.
  - `setupTests.ts`: Configuração dos testes.
  - `types`: Contém tipos personalizados do aplicativo.
  - `utils`: Contém utilitários do aplicativo.
  - `variables`: Contém variáveis do aplicativo.

## Dependências do cliente

As seguintes dependências são usadas no cliente:

- `@headlessui/react`: Biblioteca de componentes acessíveis para React.
- `@radix-ui/react-icons`: Ícones React para uso com Radix UI.
- `@radix-ui/react-select`: Componente de seleção acessível para React.
- `@tanstack/react-table`: Biblioteca para exibição de tabelas no React.
- `@testing-library/jest-dom`: Utilitários de teste para Jest e DOM.
- `@testing-library/react`: Biblioteca de testes para React.
- `@testing-library/user-event`: Biblioteca para simular eventos do usuário em testes de interface do usuário.
- `@types/jest`: Declarações de tipo para Jest.
- `@types/node`: Declarações de tipo para Node.js.
- `@types/react`: Declarações de tipo para React.
- `@types/react-dom`: Declarações de tipo para ReactDOM.
- `@unform/core`: Biblioteca para gerenciamento de formulários no React.
- `@unform/web`: Biblioteca para criação de formulários no React.
- `axios`: Cliente HTTP baseado em promessas para o navegador e Node.js.
- `class-variance-authority`: Utilitário para gerenciamento de classes CSS no React.
- `classnames`: Utilitário para construção de nomes de classes condicionais.
- `clsx`: Utilitário para geração de nomes de classes condicionais.
- `framer-motion`: Biblioteca de animação para React.
- `lodash`: Biblioteca de utilitários para manipulação de dados.
- `lucide-react`: Conjunto de ícones SVG do Lucide convertidos para componentes React.
- `react`: Biblioteca para criação de interfaces de usuário no React.
- `react-apexcharts`: Biblioteca para visualização de gráficos interativos no React.
- `react-dom`: Renderizador de DOM virtual para React.
- `react-icons`: Biblioteca para ícones SVG populares no React.
- `react-router-dom`: Biblioteca para roteamento no React.
- `react-scripts`: Conjunto de scripts e configurações para criar e executar aplicativos React.
- `swr`: Biblioteca para gerenciamento de estado de dados remotos.
- `tailwind-merge`: Utilitário para mesclar classes do Tailwind CSS.
- `tailwindcss-animate`: Biblioteca para animações CSS do Tailwind CSS.
- `typescript`: Linguagem de programação para adicionar tipos ao JavaScript.
- `web-vitals`: Biblioteca para medir e rastrear métricas de desempenho da web.
- `yup`: Biblioteca para validação de esquemas.