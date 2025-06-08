// Importa o módulo Express, que é um framework (estrutura) para facilitar a criação de servidores com Node.js
const express = require('express');

// Cria a aplicação principal (servidor) usando Express
// A constante 'aplicacao' será usada para configurar o servidor, rotas e outras funções
const aplicacao = express();

// Importa as rotas relacionadas a medicamentos, que foram definidas separadamente
const rotasMedicamentos = require('./rotas/medicamentos');

// Define a porta onde o servidor vai escutar as requisições (como uma entrada de acesso)
// Pode ser alterada para outra porta, como 8080 ou 5000, se necessário
const porta = 3000;

// Middleware que permite que o servidor entenda dados enviados em formato JSON no corpo das requisições
// Isso é necessário para que possamos ler os dados enviados com POST, PUT, etc.
aplicacao.use(express.json());

// Conecta as rotas de medicamentos à aplicação principal
// Sempre que a URL começar com "/medicamentos", será direcionada para as rotas definidas em rotas/medicamentos.js
aplicacao.use('/medicamentos', rotasMedicamentos);

// Inicia o servidor e faz com que ele comece a escutar na porta definida
// Quando o servidor estiver funcionando, exibe a mensagem no terminal
aplicacao.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`);
});