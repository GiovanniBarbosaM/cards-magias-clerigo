const btnAvancar = document.getElementById("btn-avancar");
const btnVoltar = document.getElementById("btn-voltar");
const cartoes = document.querySelectorAll(".cartao");
let cartaoAtual = 0;

cartoes.forEach(cartao => {
  cartao.addEventListener("click", function() {
    const cartaVirada = cartao.querySelector(".carta-virada");

    // virar o cartão
    cartao.classList.toggle("virar");
    // mostrar o fundo da carta
    cartaVirada.classList.toggle("mostrar-fundo-carta");

    const descricao = cartao.querySelector(".descricao");
    descricao.classList.toggle("esconder");
  });
});

btnAvancar.addEventListener("click", function () {
  if (cartaoAtual === cartoes.length - 1) return;

  esconderCartaoSelecionado();

  cartaoAtual++;
  mostrarCartao(cartaoAtual);
});

btnVoltar.addEventListener("click", function () {
  if (cartaoAtual === 0) return;

  esconderCartaoSelecionado();

  cartaoAtual--;
  mostrarCartao(cartaoAtual);
});

function mostrarCartao(cartaoAtual) {
  cartoes[cartaoAtual].classList.add("selecionado");
}

function esconderCartaoSelecionado() {
  const cartaoSelecionado = document.querySelector(".selecionado");
  cartaoSelecionado.classList.remove("selecionado");
}

function toggleMenu() {
  var menu = document.getElementById("menuDropdown");
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

// Fechar o menu se clicar fora dele
document.addEventListener("click", function(event) {
  var menu = document.getElementById("menuDropdown");
  var botao = document.querySelector(".botao");

  if (!botao.contains(event.target) && !menu.contains(event.target)) {
    menu.style.display = "none";
  }
});

window.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth <= 768) {
    const cabecalho = document.querySelector('.cabecalho');
    const menu = document.querySelector('#menuLateral');
    const h2index = document.querySelector('.h2index');

    if (cabecalho && menu && h2index) {
      // Insere o menu entre o cabecalho e o h2index
      h2index.parentNode.insertBefore(menu, h2index);
    }
  }
});