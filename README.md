# Capyba challenge

## Description

Desafio para o processo seletivo da Capyba

## Requirements

Para rodar o projeto é necessário as seguintes ferramentas:

  - NodeJs (Se tiver instalado o asdf o arquivo `.tool-versions` irá escolher a versão correta)
  - pnpm
  - Docker
  - Docker Compose v2

## Installation

O projeto foi desenvolvido com pnpm para gerenciamento de pacotes então para instalar as dependências rode o comando a seguir:
```bash
$ pnpm install
```
ou se preferir:
```bash
$ npm install
```

Após instalar as dependências rode comando do docker compose para subir os containers do PostgreSQL, Redis e Mailhog:
```bash
$ docker compose up -d
```
ou se estiver usando a v1 do docker-compose:
```bash
$ docker-compose up -d
```

Por último rode as migrations do prisma:
```bash
$ pnpm exec prisma migrate dev
```
ou
```bash
$ npx prisma migrate dev
```

## Running the app

```bash
# watch mode
$ pnpm start:dev

# production mode
$ pnpm start:prod
```

## Test

```bash
# unit tests
$ pnpm test

# test coverage
$ pnpm test:cov
```

## Roadmap

- [x] Login e Cadastro
  - [x] Signin
  - [x] Signup
  - [x] Signoff
- [ ] Área para pessoas logada
- [x] Confirmação de email
- [ ] Área restrita
- [x] Testes unitários
