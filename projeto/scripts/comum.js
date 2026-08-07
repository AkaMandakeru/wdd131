// ---------------------------------------------------------------------------
// MusicList — comportamento comum a todas as páginas
// Rodapé dinâmico, menu responsivo, tema claro/escuro e a lista de favoritas
// guardada em localStorage. As funções de favoritos são reaproveitadas pelos
// scripts das páginas de músicas e de playlists.
// ---------------------------------------------------------------------------

const CHAVE_FAVORITOS = "musiclist-favoritos";
const CHAVE_TEMA = "musiclist-tema";

// ---------- Favoritos (localStorage) ----------

// Lê a lista salva e devolve sempre um array, mesmo que o valor esteja
// ausente ou corrompido no navegador do visitante.
function lerFavoritos() {
  const salvo = localStorage.getItem(CHAVE_FAVORITOS);

  if (!salvo) {
    return [];
  }

  try {
    const lista = JSON.parse(salvo);
    return Array.isArray(lista) ? lista : [];
  } catch (erro) {
    return [];
  }
}

function salvarFavoritos(lista) {
  localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(lista));
  atualizarContadorFavoritos();
}

function ehFavorita(id) {
  return lerFavoritos().includes(id);
}

// Adiciona ou remove a música e devolve o novo estado (true = favoritada).
function alternarFavorita(id) {
  const lista = lerFavoritos();

  if (lista.includes(id)) {
    salvarFavoritos(lista.filter((item) => item !== id));
    return false;
  }

  salvarFavoritos([...lista, id]);
  return true;
}

function limparFavoritos() {
  localStorage.removeItem(CHAVE_FAVORITOS);
  atualizarContadorFavoritos();
}

// Mostra o total de favoritas ao lado do link "Playlists" da navegação.
function atualizarContadorFavoritos() {
  const contador = document.querySelector("#contadorFavoritos");

  if (!contador) {
    return;
  }

  const total = lerFavoritos().length;

  contador.querySelector(".numero").textContent = `${total}`;
  contador.hidden = total === 0;
}

// ---------- Tema claro/escuro ----------

// Usa o tema salvo pelo visitante; na primeira visita segue a preferência do
// sistema operacional.
function temaInicial() {
  const salvo = localStorage.getItem(CHAVE_TEMA);

  if (salvo === "claro" || salvo === "escuro") {
    return salvo;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "escuro"
    : "claro";
}

function aplicarTema(tema) {
  const botao = document.querySelector("#alternarTema");

  document.documentElement.dataset.tema = tema;

  if (!botao) {
    return;
  }

  const escuro = tema === "escuro";

  botao.textContent = escuro ? "☀" : "☾";
  botao.setAttribute("aria-pressed", `${escuro}`);
  botao.setAttribute(
    "aria-label",
    escuro ? "Mudar para o tema claro" : "Mudar para o tema escuro"
  );
}

aplicarTema(temaInicial());

// ---------- Inicialização da página ----------

document.addEventListener("DOMContentLoaded", () => {
  // Rodapé dinâmico.
  const anoAtual = document.querySelector("#anoAtual");
  if (anoAtual) {
    anoAtual.textContent = `${new Date().getFullYear()}`;
  }

  const ultimaModificacao = document.querySelector("#ultimaModificacao");
  if (ultimaModificacao) {
    ultimaModificacao.textContent = `Última modificação: ${document.lastModified}`;
  }

  // Menu responsivo.
  const botaoMenu = document.querySelector("#botaoMenu");
  const navegacao = document.querySelector("#navegacao");

  if (botaoMenu && navegacao) {
    botaoMenu.addEventListener("click", () => {
      const aberto = navegacao.classList.toggle("aberto");

      botaoMenu.textContent = aberto ? "✕" : "☰";
      botaoMenu.setAttribute("aria-expanded", `${aberto}`);
      botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    });
  }

  // Botão de tema.
  const botaoTema = document.querySelector("#alternarTema");

  if (botaoTema) {
    botaoTema.addEventListener("click", () => {
      const novoTema =
        document.documentElement.dataset.tema === "escuro" ? "claro" : "escuro";

      localStorage.setItem(CHAVE_TEMA, novoTema);
      aplicarTema(novoTema);
    });
  }

  atualizarContadorFavoritos();
});
