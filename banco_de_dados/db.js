// Importa o módulo 'sqlite3', que permite usar um banco de dados SQLite no Node.js
// O método 'verbose()' ativa mensagens extras no console (mensagens de erro mais detalhadas)
const sqlite3 = require('sqlite3').verbose();

// Cria ou abre o banco de dados chamado 'medicamentos.db' dentro da pasta 'banco_de_dados'
// Se o arquivo não existir, ele será criado automaticamente
const banco = new sqlite3.Database('./banco_de_dados/medicamentos.db');

// Usa o método 'serialize' para garantir que os comandos SQL sejam executados em ordem, um após o outro
// Evita conflitos que podem acontecer quando várias operações tentam acessar o banco ao mesmo tempo
banco.serialize(() => {
    // Cria a tabela 'medicamentos' se ela ainda não existir
    // Esta tabela terá os campos: id, nome, dosagem e horário
    banco.run(`
        CREATE TABLE IF NOT EXISTS medicamentos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            dosagem TEXT NOT NULL,
            horario TEXT NOT NULL
        )
    `);
});

// Exporta a variável 'banco' para que outras partes do projeto (rotas) possam acessar o banco de dados
module.exports = banco;