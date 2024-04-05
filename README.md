# README

## PersonalNotes

PersonalNotes é um sistema de notas pessoais desenvolvido usando o T3 Stack, uma pilha de tecnologias modernas que inclui Next.js, Tailwind, tRPC, Prisma, e React. Este sistema permite que os usuários criem, leiam, atualizem e excluam notas pessoais de forma eficiente.

### Características

- CRUD completo para notas
- API tRPC para comunicação entre front-end e back-end
- Interface de usuário intuitiva usando React e Next.js
- Persistência de dados com Prisma e banco de dados SQLite

### Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn

### Instalação e Execução

1. Clone o repositório:

    ```bash
    git clone https://github.com/pedrobuenof/PersonalNotes.git

2. Instale as dependências:
    ```bash
    cd PersonalNotes
    npm install

3. inicialize o banco de dados:
    ```bash
    npm run db:push

4. Execute o projeto:
    ```bash
    npm run dev

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador para usar o PersonalNotes.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

## Documentação

### Descrição do Projeto

PersonalNotes é um sistema de notas pessoais desenvolvido para ajudar os usuários a gerenciar e organizar suas notas de forma eficiente. O sistema foi construído usando o T3 Stack, que é uma combinação de Next.js, Tailwind, tRPC, Prisma e React.

### Manual do Usuário

## Criar uma Nova Nota

1. Na página inicial, clique no botão "Write a new note".
2. Você será redirecionado para a página de criação de nota.
3. Preencha o título e o conteúdo da nota nos campos correspondentes.
4. Clique no botão "Save" para salvar a nota.

## Editar uma Nota Existente

1. Na página inicial, clique na nota que você deseja editar.
2. Você será redirecionado para a página de edição de nota.
3. Faça as alterações necessárias no título e no conteúdo da nota.
4. Clique no botão "Save edition" para salvar as alterações.

## Excluir uma Nota

1. Na página inicial, clique na nota que você deseja excluir.
2. Você será redirecionado para a página de edição de nota.
3. Clique no botão "..." e, em seguida, no botão "Delete" para excluir a nota.

### Sugestões para a Versão 2.0

- Implementar cadastro de usuários
- Implementar autenticação de usuário para proteger as notas.
- Adicionar suporte para anexos e imagens nas notas.
- Melhorar a interface do usuário com mais recursos de design e interatividade.
- Adicionar funcionalidades de pesquisa e filtragem para facilitar a localização de notas específicas.
- Implementar um sistema de tags ou categorias para organizar as notas de forma mais eficiente.
- Adicionar a funcionalidade de pasta
- ...