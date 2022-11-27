# mcs-test-backend:

Projeto baseado no teste de backend da microsistec

## Tecnologias:

 - Graphql
 - Typescript
 - Mongodb- [MongoDB](https://www.mongodb.com/)

## Objetivo:

Criar um sistema de cadastro:

Clientes
 - Nome
 - Contatos
  - Tipo: Telefone / Email
  - Contato: Eg teste@teste.com.br


Imóvel
 - Tipo: Casa / Apartamento
 - Endereço : Não pode repetir.
 - Proprietários: Usar listagem dos clientes

Buscas:
 - Busca de imóvel
 - Busca de cliente

## Teste de backend:

Para esse projeto foram realizados testes para verificar se o projeto funciona de forma adequeda

A entrega foi realizada apenas depois da aprovaçao dos testes

## Para instalar as dependencias:

<p>git clone git@github.com:tiagogb21/mcs-test-backend.git<p>

cd mcs-test-backend

npm i
  
obs.: criar na raiz do projeto um arquivo '.env' e preencher os dados
  
  <ul>
    <li>MONGODB_URI= (necessita criar conta em: 'www.mongodb.com' e, posteriormente, criar um cluster para ter acesso ao banco de dados)</li>
    <li>MONGODB_NAME=</li>
    <li>MONGO_USERNAME=</li>
    <li>MONGO_PASSWORD=</li>
    <li>MONGO_HOST_NAME=</li>
    <li>PORT=</li>
  </ul>

## Para executar o projeto:

npm i --> instala as dependencias

npm start --> inicializa o projeto

http://localhost:8080/graphql

## Desenvolvimento do projeto:

apps --> backend --> src

## Para testar o projeto:

obs.: esses se encontram em apps --> backend --> src --> __tests__

npm test --> executa os testes
