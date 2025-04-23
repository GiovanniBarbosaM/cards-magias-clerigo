// Função para carregar as fichas ao carregar a página
window.addEventListener('DOMContentLoaded', carregarFichas);

// Carregar as fichas salvas
async function carregarFichas() {
  try {
    const resposta = await fetch('/fichas');
    
    // Verifica se a resposta foi bem-sucedida
    if (!resposta.ok) {
      throw new Error('Falha ao carregar as fichas');
    }

    const fichas = await resposta.json();
    const lista = document.getElementById('listaFichas');
    lista.innerHTML = ''; // Limpa a lista antes de atualizar
    
    fichas.forEach(ficha => {
      const fichaEl = document.createElement('div');
      fichaEl.style.marginBottom = '15px';
      fichaEl.style.border = '1px solid #ffd700';
      fichaEl.style.padding = '10px';
      fichaEl.style.borderRadius = '6px';
      fichaEl.innerHTML = `
        <strong>Nome:</strong> ${ficha.nome}<br>
        <strong>Classe:</strong> ${ficha.classe}<br>
        <strong>Nível:</strong> ${ficha.nivel}
        <button onclick="deletarFicha('${ficha.id}')">Deletar</button>
        <button onclick="editarFicha('${ficha.id}')">Editar</button>
      `;
      lista.appendChild(fichaEl);
    });
  } catch (erro) {
    console.error(erro);
    alert('Erro ao carregar as fichas');
  }
}

// Função para salvar a ficha
document.getElementById('formFicha').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const form = e.target;
  const novaFicha = {
    nome: form.nome.value,
    raca: form.raca.value,
    classe: form.classe.value,
    subClasse: form['sub-classe'].value,
    divindade: form.divindade.value,
    nivel: form.nivel.value,
  };
  
  try {
    const resposta = await fetch('/ficha', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novaFicha),
    });
    
    if (!resposta.ok) {
      throw new Error('Erro ao salvar ficha');
    }
    
    const resultado = await resposta.text();
    alert(resultado);
    form.reset(); // Limpa o formulário
    carregarFichas(); // Atualiza a lista de fichas
  } catch (erro) {
    console.error(erro);
    alert('Erro ao salvar ficha');
  }
});

// Função para deletar a ficha
async function deletarFicha(id) {
  try {
    const resposta = await fetch(`/ficha/${id}`, {
      method: 'DELETE',
    });

    if (!resposta.ok) {
      throw new Error('Erro ao deletar ficha');
    }
    
    const resultado = await resposta.text();
    alert(resultado);
    carregarFichas(); // Atualiza a lista de fichas
  } catch (erro) {
    console.error(erro);
    alert('Erro ao deletar ficha');
  }
}

// Função para editar a ficha
async function editarFicha(id) {
  const novaClasse = prompt("Digite a nova classe do personagem:");
  
  if (!novaClasse) return;
  
  try {
    const resposta = await fetch(`/ficha/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ classe: novaClasse }),
    });

    if (!resposta.ok) {
      throw new Error('Erro ao editar ficha');
    }

    const resultado = await resposta.text();
    alert(resultado);
    carregarFichas(); // Atualiza a lista de fichas
  } catch (erro) {
    console.error(erro);
    alert('Erro ao editar ficha');
  }
}

// Função para carregar as fichas ao carregar a página
window.addEventListener('DOMContentLoaded', carregarFichas);

// Carregar as fichas salvas
async function carregarFichas() {
  try {
    const resposta = await fetch('/fichas');
    
    // Verifica se a resposta foi bem-sucedida (status 200)
    if (!resposta.ok) {
      throw new Error('Falha ao carregar as fichas, status: ' + resposta.status);
    }

    const fichas = await resposta.json();
    const lista = document.getElementById('listaFichas');
    lista.innerHTML = ''; // Limpa a lista antes de atualizar
    
    fichas.forEach(ficha => {
      const fichaEl = document.createElement('div');
      fichaEl.style.marginBottom = '15px';
      fichaEl.style.border = '1px solid #ffd700';
      fichaEl.style.padding = '10px';
      fichaEl.style.borderRadius = '6px';
      fichaEl.innerHTML = `
        <strong>Nome:</strong> ${ficha.nome}<br>
        <strong>Classe:</strong> ${ficha.classe}<br>
        <strong>Nível:</strong> ${ficha.nivel}
        <button onclick="deletarFicha('${ficha.id}')">Deletar</button>
        <button onclick="editarFicha('${ficha.id}')">Editar</button>
      `;
      lista.appendChild(fichaEl);
    });
  } catch (erro) {
    console.error(erro);
    alert('Erro ao carregar as fichas');
  }
}

// Função para salvar a ficha
document.getElementById('formFicha').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const form = e.target;
  const novaFicha = {
    nome: form.nome.value,
    raca: form.raca.value,
    classe: form.classe.value,
    subClasse: form['sub-classe'].value,
    divindade: form.divindade.value,
    nivel: form.nivel.value,
  };
  
  const resposta = await fetch('/ficha', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(novaFicha),
  });
  
  const resultado = await resposta.text();
  alert(resultado);
  form.reset(); // Limpa o formulário
  carregarFichas(); // Atualiza a lista de fichas
});

// Função para deletar a ficha
async function deletarFicha(id) {
  const resposta = await fetch(`/ficha/${id}`, {
    method: 'DELETE',
  });
  
  const resultado = await resposta.text();
  alert(resultado);
  carregarFichas(); // Atualiza a lista de fichas
}

// Função para editar a ficha
async function editarFicha(id) {
  const novaClasse = prompt("Digite a nova classe do personagem:");
  
  if (!novaClasse) return;
  
  const resposta = await fetch(`/ficha/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ classe: novaClasse }),
  });
  
  const resultado = await resposta.text();
  alert(resultado);
  carregarFichas(); // Atualiza a lista de fichas
}
