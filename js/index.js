const btnAvancar = document.getElementById("btn-avancar");
const btnVoltar = document.getElementById("btn-voltar");
const cartoes = document.querySelectorAll(".cartao");
let cartaoAtual = 0;

// Função para virar o cartão
cartoes.forEach(cartao => {
  cartao.addEventListener("click", function() {
    const cartaVirada = cartao.querySelector(".carta-virada");
    const descricao = cartao.querySelector(".descricao");

    cartao.classList.toggle("virar");
    cartaVirada.classList.toggle("mostrar-fundo-carta");
    descricao.classList.toggle("esconder");
  });
});

// Navegação entre cartões
if (btnAvancar && btnVoltar) {
  btnAvancar.addEventListener("click", () => {
    if (cartaoAtual < cartoes.length - 1) {
      esconderCartaoSelecionado();
      cartaoAtual++;
      mostrarCartao(cartaoAtual);
    }
  });

  btnVoltar.addEventListener("click", () => {
    if (cartaoAtual > 0) {
      esconderCartaoSelecionado();
      cartaoAtual--;
      mostrarCartao(cartaoAtual);
    }
  });
}

function mostrarCartao(index) {
  cartoes[index].classList.add("selecionado");
}

function esconderCartaoSelecionado() {
  const cartaoSelecionado = document.querySelector(".selecionado");
  if (cartaoSelecionado) {
    cartaoSelecionado.classList.remove("selecionado");
  }
}

// Menu dropdown
function toggleMenu() {
  const menu = document.getElementById("menuDropdown");
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

// Fechar o menu se clicar fora dele
document.addEventListener("click", (event) => {
  const menu = document.getElementById("menuDropdown");
  const botao = document.querySelector(".botao");

  if (!botao.contains(event.target) && !menu.contains(event.target)) {
    menu.style.display = "none";
  }
});

// Reorganizar elementos no mobile
window.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth <= 768) {
    const cabecalho = document.querySelector('.cabecalho');
    const menu = document.querySelector('#menuLateral');
    const h2index = document.querySelector('.h2index');

    if (cabecalho && menu && h2index) {
      h2index.parentNode.insertBefore(menu, h2index);
    }
  }
});

// Filtro de busca geral
function filtroGeral() {
  const termo = document.getElementById("pesquisa").value.toLowerCase();
  const elementos = document.querySelectorAll(".pesquisavel");

  elementos.forEach(el => {
    el.style.display = el.textContent.toLowerCase().includes(termo) ? "block" : "none";
  });
}

// Buscar termos no site
function buscarSite() {
  const query = document.getElementById('busca').value.toLowerCase();
  const elements = document.body.getElementsByTagName("*");

  if (query.length > 0) {
    Array.from(elements).forEach(el => {
      if (el.innerText && el.innerText.toLowerCase().includes(query)) {
        el.style.backgroundColor = "#ffff00"; // Destaque
      }
    });
  } else {
    Array.from(elements).forEach(el => {
      el.style.backgroundColor = ""; // Remove destaque
    });
  }
}
