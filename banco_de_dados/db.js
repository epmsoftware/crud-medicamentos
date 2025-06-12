// Importa o módulo 'sqlite3', que permite usar um banco de dados SQLite no Node.js
const sqlite3 = require('sqlite3').verbose();

// Cria ou abre o banco de dados chamado 'medicamentos.db' dentro da pasta 'banco_de_dados'
const banco = new sqlite3.Database('./banco_de_dados/medicamentos.db');

// Método 'serialize' para garantir que os comandos SQL sejam executados em ordem, um após o outro
banco.serialize(() => {
    // Cria a tabela 'medicamentos' se ela ainda não existir
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