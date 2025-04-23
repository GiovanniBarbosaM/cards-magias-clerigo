const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Servir arquivos estáticos corretamente
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/', express.static(__dirname)); // Serve o index.html na raiz do projeto

// Rota para listar fichas
app.get('/fichas', (req, res) => {
  fs.readFile('fichas.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Erro ao ler fichas.');
    }
    const fichas = data ? JSON.parse(data) : [];
    res.json(fichas);
  });
});

// Rota para salvar ficha
app.post('/salvar-ficha', (req, res) => {
  const novaFicha = req.body;

  fs.readFile('fichas.json', 'utf8', (err, data) => {
    const fichas = data ? JSON.parse(data) : [];
    fichas.push(novaFicha);

    fs.writeFile('fichas.json', JSON.stringify(fichas, null, 2), (err) => {
      if (err) return res.status(500).send('Erro ao salvar ficha.');
      res.send('Ficha salva com sucesso!');
    });
  });
});

// Rota para deletar ficha
app.delete('/ficha/:id', (req, res) => {
  const id = req.params.id;

  fs.readFile('fichas.json', 'utf8', (err, data) => {
    const fichas = data ? JSON.parse(data) : [];
    const index = fichas.findIndex(f => f.id === id);

    if (index === -1) return res.status(404).send('Ficha não encontrada.');

    fichas.splice(index, 1);
    fs.writeFile('fichas.json', JSON.stringify(fichas, null, 2), (err) => {
      if (err) return res.status(500).send('Erro ao deletar ficha.');
      res.send('Ficha deletada com sucesso!');
    });
  });
});

// Rota para editar ficha
app.put('/ficha/:id', (req, res) => {
  const id = req.params.id;
  const dadosAtualizados = req.body;

  fs.readFile('fichas.json', 'utf8', (err, data) => {
    const fichas = data ? JSON.parse(data) : [];
    const index = fichas.findIndex(f => f.id === id);

    if (index === -1) return res.status(404).send('Ficha não encontrada.');

    fichas[index] = { ...fichas[index], ...dadosAtualizados };
    fs.writeFile('fichas.json', JSON.stringify(fichas, null, 2), (err) => {
      if (err) return res.status(500).send('Erro ao editar ficha.');
      res.send('Ficha atualizada com sucesso!');
    });
  });
});

// Serve o index.html na rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));  // Ajuste o caminho
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// Serve os arquivos CSS da pasta src
app.use('/src', express.static(path.join(__dirname, 'src')));