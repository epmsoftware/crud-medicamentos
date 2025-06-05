// Importa o Express (framework do Node.js)
const express = require('express');
const app = express();

// Importa as rotas de medicamentos
const medicamentosRouter = require('./rotas/medicamentos');

// Define a porta onde o servidor vai rodar
const PORT = 3000;

// Middleware para aceitar JSON no corpo das requisições (body)
app.use(express.json());

// Usa as rotas de medicamentos com o prefixo /medicamentos
app.use('/medicamentos', medicamentosRouter);

// Inicia o servidor e exibe mensagem no terminal
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});