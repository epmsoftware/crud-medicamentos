// Importa o módulo 'sqlite3' e ativa o modo verbose (mais mensagens de erro e debug)
const sqlite3 = require('sqlite3').verbose();
// Cria (ou abre, se já existir) o banco de dados chamado 'medicamentos.db' na pasta 'banco_de_dados'
const db = new sqlite3.Database('./banco_de_dados/medicamentos.db');

// Executa comandos SQL em sequência (evita problemas com concorrência)
db.serialize(() => {
    // Cria a tabela 'medicamentos' se ela ainda não existir
    db.run(`
        CREATE TABLE IF NOT EXISTS medicamentos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        dosagem TEXT NOT NULL,
        horario TEXT NOT NULL
        )
    `);
})
// Exporta a variável 'db' para que outras partes do projeto (como as rotas) possam usar o banco de dados
module.exports = db;