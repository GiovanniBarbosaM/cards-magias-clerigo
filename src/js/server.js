const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Usar JSON no corpo das requisições
app.use(express.json());

// Serve os arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Rota para salvar uma ficha
app.post('/salvar-ficha', (req, res) => {
  const novaFicha = req.body;

  // Lê as fichas já salvas
  fs.readFile('fichas.json', 'utf8', (err, data) => {
    const fichas = data ? JSON.parse(data) : [];

    // Adiciona nova ficha
    fichas.push(novaFicha);

    // Salva novamente no arquivo
    fs.writeFile('fichas.json', JSON.stringify(fichas, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Erro ao salvar ficha.');
      }
      res.send('Ficha salva com sucesso!');
    });
  });
});

// Rota para listar as fichas
app.get('/fichas', (req, res) => {
  fs.readFile('fichas.json', 'utf8', (err, data) => {
    const fichas = data ? JSON.parse(data) : [];
    res.json(fichas);
  });
});

// Rota para deletar uma ficha
app.delete('/ficha/:id', (req, res) => {
  const fichaId = req.params.id;

  fs.readFile('fichas.json', 'utf8', (err, data) => {
    const fichas = data ? JSON.parse(data) : [];

    // Remove a ficha pelo ID
    const fichaIndex = fichas.findIndex(ficha => ficha.id === fichaId);
    if (fichaIndex === -1) {
      return res.status(404).send('Ficha não encontrada.');
    }

    fichas.splice(fichaIndex, 1);

    // Salva novamente no arquivo
    fs.writeFile('fichas.json', JSON.stringify(fichas, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Erro ao deletar ficha.');
      }
      res.send('Ficha deletada com sucesso!');
    });
  });
});

// Rota para editar uma ficha
app.put('/ficha/:id', (req, res) => {
  const fichaId = req.params.id;
  const dadosFichaAtualizada = req.body;

  fs.readFile('fichas.json', 'utf8', (err, data) => {
    const fichas = data ? JSON.parse(data) : [];

    const fichaIndex = fichas.findIndex(ficha => ficha.id === fichaId);
    if (fichaIndex === -1) {
      return res.status(404).send('Ficha não encontrada.');
    }

    // Atualiza a ficha
    fichas[fichaIndex] = {
      ...fichas[fichaIndex],
      ...dadosFichaAtualizada
    };

    fs.writeFile('fichas.json', JSON.stringify(fichas, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Erro ao editar ficha.');
      }
      res.send('Ficha atualizada com sucesso!');
    });
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
