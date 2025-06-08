// Importa o módulo Express e cria um conjunto de rotas
const express = require('express');
const rotas = express.Router();

// Importa a conexão com o banco de dados
const banco = require('../banco_de_dados/db');

// ROTA: Criar um novo medicamento (POST /medicamentos)
rotas.post('/', (requisicao, resposta) => {
  const { nome, dosagem, horario } = requisicao.body;

  banco.run(
    'INSERT INTO medicamentos (nome, dosagem, horario) VALUES (?, ?, ?)',
    [nome, dosagem, horario],
    function (erro) {
      if (erro) {
        return resposta.status(500).json({ erro: erro.message }); // Erro ao inserir
      }

      // Retorna o novo medicamento com o ID gerado automaticamente
      resposta.status(201).json({ id: this.lastID, nome, dosagem, horario });
    }
  );
});

// ROTA: Listar todos os medicamentos (GET /medicamentos)
rotas.get('/', (requisicao, resposta) => {
  banco.all('SELECT * FROM medicamentos', [], (erro, linhas) => {
    if (erro) {
      return resposta.status(500).json({ erro: erro.message }); // Erro ao buscar
    }

    // Retorna todos os medicamentos encontrados
    resposta.json(linhas);
  });
});

// ROTA: Buscar um medicamento pelo ID (GET /medicamentos/:id)
rotas.get('/:id', (requisicao, resposta) => {
  const id = requisicao.params.id;

  banco.get('SELECT * FROM medicamentos WHERE id = ?', [id], (erro, linha) => {
    if (erro) {
      return resposta.status(500).json({ erro: erro.message });
    }

    if (!linha) {
      return resposta.status(404).json({ erro: 'Medicamento não encontrado' });
    }

    resposta.json(linha); // Retorna o medicamento encontrado
  });
});

// ROTA: Atualizar um medicamento pelo ID (PUT /medicamentos/:id)
rotas.put('/:id', (requisicao, resposta) => {
  const { nome, dosagem, horario } = requisicao.body;
  const id = requisicao.params.id;

  banco.run(
    'UPDATE medicamentos SET nome = ?, dosagem = ?, horario = ? WHERE id = ?',
    [nome, dosagem, horario, id],
    function (erro) {
      if (erro) {
        return resposta.status(500).json({ erro: erro.message });
      }

      if (this.changes === 0) {
        return resposta.status(404).json({ erro: 'Medicamento não encontrado' });
      }

      resposta.json({ id, nome, dosagem, horario }); // Retorna os dados atualizados
    }
  );
});

// ROTA: Deletar um medicamento pelo ID (DELETE /medicamentos/:id)
rotas.delete('/:id', (requisicao, resposta) => {
  const id = requisicao.params.id;

  banco.run('DELETE FROM medicamentos WHERE id = ?', [id], function (erro) {
    if (erro) {
      return resposta.status(500).json({ erro: erro.message });
    }

    if (this.changes === 0) {
      return resposta.status(404).json({ erro: 'Medicamento não encontrado' });
    }

    resposta.json({ mensagem: 'Medicamento removido com sucesso' });
  });
});

// Exporta o conjunto de rotas para ser usado no arquivo principal (server.js)
module.exports = rotas;