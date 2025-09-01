# 🚀 Order Service Microservice

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)  
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)  
[![Fastify](https://img.shields.io/badge/Fastify-4.x-orange)](https://www.fastify.io/)  
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)](https://www.postgresql.org/)  
[![Docker](https://img.shields.io/badge/Docker-latest-blue)](https://www.docker.com/)

## 📖 Descrição

O **Order Service** é um microservice responsável pelo gerenciamento de pedidos de usuários. Ele permite:

- Registrar e autenticar usuários via JWT  
- Criar pedidos vinculados ao usuário logado  
- Validar produtos e totais do pedido usando **Zod**  
- Emitir eventos de criação de pedidos via **Kafka**  
- Persistir dados no banco **PostgreSQL** usando **Prisma ORM**  
- Fornecer documentação da API via **Swagger**

---

## ⚡ Funcionalidades principais

1. Registro e login de usuários  
2. Criação de pedidos com múltiplos produtos  
3. Autenticação de rotas protegidas via JWT  
4. Integração com Kafka para eventos  
5. Banco de dados relacional com Prisma  
6. Validação de dados de entrada com Zod  
7. Documentação automática da API com Swagger

---

## 🐳 Rodando via Docker

```bash
git clone https://github.com/erickhenrique3/orderService
cd order-service
docker build -t order-service .
docker run -d -p 3000:3000 --env-file .env order-service
