# Placar de Vôlei Retrô (Super Mario Bros)

Um placar digital de vôlei em Português (Brasil) com estética retrô de Super Mario Bros, cronômetro, pontuação, controle de faltas e histórico de jogos.

## Funcionalidades

- ✅ Tela inicial para configuração das equipes
- ✅ Placar com controle de pontuação
- ✅ Cronômetro (iniciar, pausar, zerar)
- ✅ Controle de faltas
- ✅ Histórico de jogos com resultados
- ✅ Design inspirado em Super Mario Bros

## Tecnologias Utilizadas

- React
- TypeScript
- Tailwind CSS
- Express
- PostgreSQL (para persistência de dados)
- Drizzle ORM

## Como Instalar

Primeiro, clone o repositório e instale as dependências:

```bash
git clone <URL_DO_REPOSITORIO>
cd placar-volei-retro
npm install
```

## Como Configurar o Banco de Dados

A aplicação usa PostgreSQL para armazenar os dados. Você precisa ter o PostgreSQL instalado e configurado. 

Depois, crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
DATABASE_URL=postgresql://seu_usuario:sua_senha@localhost:5432/nome_do_banco
```

Em seguida, execute a migração para criar as tabelas necessárias:

```bash
npm run db:push
```

## Como Executar

Após a instalação, para iniciar a aplicação, você tem várias opções:

### Opção 1: Usar os scripts de inicialização

**Windows**:
- Execute o arquivo `start.bat` com um duplo clique ou usando o prompt de comando:
  ```
  start.bat
  ```

**Linux/Mac**:
- Execute o script shell:
  ```bash
  ./start.sh
  ```

### Opção 2: Usando Node.js diretamente

Execute o script JavaScript:
```
node start.js
```

### Opção 3: Usando npm com cross-env (recomendado)

Se você já tem o `cross-env` instalado globalmente ou prefere usar o script npm:
```
npx cross-env NODE_ENV=development tsx server/index.ts
```

## Acesso à Aplicação

Após iniciar o servidor, acesse a aplicação em seu navegador:

```
http://localhost:5000
```

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.