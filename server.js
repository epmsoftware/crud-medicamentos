// Importa o módulo Express, que é um framework para facilitar a criação de servidores com Node.js
const express = require('express');

// Cria a aplicação principal (servidor) usando Express
const aplicacao = express();

// Importa as rotas relacionadas a medicamentos
const rotasMedicamentos = require('./rotas/medicamentos');

// Define a porta onde o servidor vai escutar as requisições
const porta = 3000;

// Middleware, permite que o servidor entenda dados enviados em formato JSON no corpo das requisições
aplicacao.use(express.json());

// Conecta as rotas de medicamentos à aplicação principal
aplicacao.use('/medicamentos', rotasMedicamentos);

// Inicia o servidor e faz com que ele comece a escutar na porta definida
aplicacao.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`);
});