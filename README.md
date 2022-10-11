# Trybesmith

## Contexto

Desde espadas, machados, arcos, escudos e armaduras até artigos mágicos como amuletos, anéis, colares e até mesmo armas magicas, tudo isso pode ser encontrado em uma loja ou forja.

Pelo menos é isso que se espera quando você está jogando um clássico RPG (Role Playing Game) medieval.

É nessa temática que esse projeto backend se baseia. Uma simulação de uma loja de RPG com um inventário já contendo alguns itens, mas podendo ter mais deles inseridos, assim como novos clientes e pedidos podem ser cadastrados também.

Esta loja foi desenvolvida usando MySQL para o banco de dados que armazena as informações dos itens, dos clientes e dos pedidos, ExpressJS com a metodologia MSC (Models, Service and Controllers) para as requisições CRUD (Create, Read, Update and Delete), linguagem Typescript e as bibliotecas Joi para validação dos campos das requisições, http-status-code para os códigos retornados quando há sucesso ou falha de requisição e JWT (JSON Web Token) para criação e validação de tokens de acesso.

> Obs.: querido aventureiro fique a vontade para pegar uma caneca de hidromel da sua taverna favorita e se acomodar enquanto testa o projeto você mesmo. As instruções para isso estão a seguir:

## Tecnologias Usadas

Backend:

> Typescript, ExpressJS com operações CRUD, metodologia MSC, MySQL, http-status-code, Joi e JWT

## Rodando o Projeto

### Instalando Dependências

```bash
cd Trybesmith
npm install
```

### Executando a Aplicação

>Para a criação do banco de dados:

```bash
npm run create:db
```

>Para inicar a aplicação:

```bash
npm start
```

> Para rodar localmente é necessaria a criação de um arquivo **.env**. Siga o exemplo do arquivo **.env.example** presente no projto para isso.

### Rodando com Docker

```bash
docker-compose up -d
docker exec -it trybesmith bash
npm install
npm run create:db
npm start
```

>A aplicação irá rodar na porta 3000, tanto com docker quanto localmente.
