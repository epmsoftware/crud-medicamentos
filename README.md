
# CRUD de Medicamentos

Projeto simples de API REST para gerenciar medicamentos, desenvolvido com **Node.js**, **Express.js** e **SQLite**.

---

## Funcionalidades

- Listar todos os medicamentos (`GET /medicamentos`)
- Buscar um medicamento por ID (`GET /medicamentos/:id`)
- Criar um novo medicamento (`POST /medicamentos`)
- Atualizar um medicamento existente (`PUT /medicamentos/:id`)
- Remover um medicamento (`DELETE /medicamentos/:id`)

---

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org)                # Ambiente de execução JavaScript
- [Express.js](https://expressjs.com/)         # Framework web que roda no Node.js
- [SQLite3](https://www.sqlite.org/index.html) # Banco de dados relacional e embutido (não precisa de servidor).
- [Thunder Client](https://www.thunderclient.com/) ou [Postman](https://www.postman.com/) para testes de API

---

## Estrutura da Tabela no SQLite

```sql
CREATE TABLE IF NOT EXISTS medicamentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    dosagem TEXT NOT NULL,
    horario TEXT NOT NULL
);
```

---

## Estrutura do Projeto

```
crud-medicamentos/
│
├── banco_de_dados/
│   └── db.js              # Conexão e criação da tabela no SQLite
│
├── routes/
│   └── medicamentos.js    # Rotas da API
│
├── server.js              # Arquivo principal que inicia o servidor
├── package.json
└── README.md              # Este arquivo
```

---

## Como Executar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/crud-medicamentos.git
cd crud-medicamentos
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Iniciar o servidor

```bash
node server.js
```

A API ficará disponível em: `http://localhost:3000`

---

## Testando a API

Você pode usar o **Thunder Client (VS Code)** ou **Postman** para fazer requisições HTTP.

### Exemplo de POST (criar medicamento)

- **URL**: `http://localhost:3000/medicamentos`
- **Método**: `POST`
- **Body (JSON)**:

```json
{
  "nome": "Paracetamol",
  "dosagem": "500mg",
  "horario": "08:00"
}
```

---

## Acesso remoto (opcional)

Para testar a API de outro computador:

- Use [ngrok](https://ngrok.com): `ngrok http 3000`
- Ou publique gratuitamente no [Render](https://render.com)

---

## Licença

Este projeto está sob a licença MIT. 
(Massachusetts Institute of Technology ou Instituto de Tecnologia de Massachusetts).

---

## Desenvolvedor

Criado por **[Equipe Hora do Remédio]** como parte do aprendizado de Backend com Node.js.