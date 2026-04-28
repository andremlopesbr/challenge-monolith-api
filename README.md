# 🏛️ Sistemas Monolíticos: API e Testes End-to-End

## 🎯 Objetivo (Enunciado)

Neste desafio, você deve implementar a Camada de API (Web) do seu monólito, criando os endpoints necessários para que seja possível realizar o fluxo completo de uma compra via requisições HTTP.

**Requisitos Técnicos:**
- **POST /products:** Cadastro de produtos.
- **POST /clients:** Cadastro de clientes.
- **POST /checkout:** Realização da compra (processar o pedido).
- **GET /invoice/:id:** Consulta de uma Nota Fiscal gerada.

**Requisitos de Testes:**
- Utilizar a biblioteca **Supertest** para testes End-to-End (E2E).
- Validar status code (200/201) e o corpo da resposta de todos os endpoints.

---

## 🛠️ Tecnologias
- TypeScript
- Express
- Sequelize
- Supertest
- Jest

---

## 🚀 Como Executar

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar Testes:**
   ```bash
   npm test
   ```

3. **Iniciar Servidor:**
   ```bash
   npm run dev
   ```

---

## ⚠️ Nota sobre Migrações
Certifique-se de que o banco de dados esteja sincronizado corretamente, especialmente a tabela de produtos que possui definições duplicadas entre os módulos. Recomenda-se o uso de migrations conforme as instruções do curso.

---
<p align="center">Desenvolvido no curso Full Cycle 3.0</p>
