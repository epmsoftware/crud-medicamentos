// Importa o módulo express e cria um "mini-app" de rotas
const express = require('express');
const router = express.Router();

// Importa a conexão com o banco de dados
const db = require('../banco_de_dados/db');

// ROTA: Criar novo medicamento (POST /medicamentos)
router.post('/', (req, res) => {
  const { nome, dosagem, horario } = req.body;
  db.run('INSERT INTO medicamentos (nome, dosagem, horario) VALUES (?, ?, ?)',
    [nome, dosagem, horario],
    function (err) {
      if (err) return res.status(500).json({ error: err.message }); // Erro ao inserir
      res.status(201).json({ id: this.lastID, nome, dosagem, horario }); // Retorna o novo medicamento com ID gerado
    });
});

// ROTA: Listar todos os medicamentos (GET /medicamentos)
router.get('/', (req, res) => {
  db.all('SELECT * FROM medicamentos', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message }); // Erro no banco
    res.json(rows); // Retorna todos os medicamentos encontrados
  });
});

// ROTA: Buscar medicamento por ID (GET /medicamentos/:id)
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM medicamentos WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message }); // Erro no banco
    if (!row) return res.status(404).json({ error: 'Medicamento não encontrado' }); // Não achou
    res.json(row); // Retorna o medicamento
  });
});

// ROTA: Atualizar medicamento por ID (PUT /medicamentos/:id)
router.put('/:id', (req, res) => {
  const { nome, dosagem, horario } = req.body;
  const id = req.params.id;

  db.run('UPDATE medicamentos SET nome = ?, dosagem = ?, horario = ? WHERE id = ?',
    [nome, dosagem, horario, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message }); // Erro ao atualizar
      if (this.changes === 0) return res.status(404).json({ error: 'Medicamento não encontrado' }); // Nada foi alterado
      res.json({ id, nome, dosagem, horario }); // Retorna os dados atualizados
    });
});

// ROTA: Deletar medicamento por ID (DELETE /medicamentos/:id)
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM medicamentos WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message }); // Erro ao deletar
    if (this.changes === 0) return res.status(404).json({ error: 'Medicamento não encontrado' }); // Nada foi deletado
    res.json({ message: 'Medicamento removido com sucesso' }); // Confirmação de remoção
  });
});

// Exporta todas as rotas definidas acima
module.exports = router;