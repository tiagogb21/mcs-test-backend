# mcs-test-backend:

Projeto: teste de backend da microsistec

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

Para esse projeto, foram realizados testes com o objetivo de verificar o funcionamento adequado do projeto

Somente após a realização dos testes, com a aprovação de todos os requisitos que o projeto foi entregue.

## Para instalar as dependencias:

<p>git clone git@github.com:tiagogb21/mcs-test-backend.git<p>

---cd mcs-test-backend---

npm i
  
obs.: criar na raiz do projeto um arquivo '.env' e preencher os dados
  
  <ul>
    <li>MONGODB_URI= (obs.: necessita criar conta em: 'www.mongodb.com', bem como criar um cluster para ter acesso ao banco de dados)</li>
    <li>MONGODB_NAME=</li>
    <li>MONGO_USERNAME=</li>
    <li>MONGO_PASSWORD=</li>
    <li>MONGO_HOST_NAME=</li>
    <li>PORT=</li>
  </ul>

## Para executar o projeto:

npm i --> instala as dependências

npm start --> inicializa o projeto

http://localhost:8080/graphql

## Desenvolvimento do projeto:

apps --> backend --> src

## Como realizar os testes do projeto:

obs.: esses se encontram em apps --> backend --> src --> __tests__

npm test --> executa os testes
