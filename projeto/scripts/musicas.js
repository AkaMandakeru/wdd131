// ---------------------------------------------------------------------------
// MusicList — catálogo de músicas
// Filtro por categoria, busca por texto, ordenação e marcação de favoritas.
// O último filtro escolhido fica guardado em localStorage, então o visitante
// volta para a página no mesmo ponto em que parou.
// ---------------------------------------------------------------------------

const CHAVE_FILTRO = "musiclist-filtro";

const galeria = document.querySelector("#galeria");
const listaChips = document.querySelector("#chipsGenero");
const campoBusca = document.querySelector("#busca");
const campoOrdem = document.querySelector("#ordem");
const contagem = document.querySelector("#contagem");
const semResultados = document.querySelector("#semResultados");

const estado = {
  genero: "todos",
  busca: "",
  ordem: "titulo",
};

// Deixa o texto em minúsculas e sem acentos para que a busca por "musica"
// também encontre "música".
function normalizar(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function nomeDoGenero(id) {
  const genero = GENEROS.find((item) => item.id === id);
  return genero ? genero.nome : "Outros";
}

function imagemDoGenero(id) {
  const genero = GENEROS.find((item) => item.id === id);
  return genero ? genero.imagem : "imagens/logo.svg";
}

// Aplica categoria, busca e ordenação na ordem em que o visitante espera.
function filtrarMusicas() {
  const termo = normalizar(estado.busca);

  const filtradas = MUSICAS.filter((musica) => {
    const daCategoria =
      estado.genero === "todos" || musica.genero === estado.genero;

    if (!daCategoria) {
      return false;
    }

    if (termo === "") {
      return true;
    }

    return normalizar(`${musica.titulo} ${musica.artista}`).includes(termo);
  });

  return ordenarMusicas(filtradas);
}

function ordenarMusicas(lista) {
  const ordenada = [...lista];

  switch (estado.ordem) {
    case "artista":
      return ordenada.sort((a, b) => a.artista.localeCompare(b.artista, "pt-BR"));
    case "recentes":
      return ordenada.sort((a, b) => b.ano - a.ano);
    case "antigas":
      return ordenada.sort((a, b) => a.ano - b.ano);
    default:
      return ordenada.sort((a, b) => a.titulo.localeCompare(b.titulo, "pt-BR"));
  }
}

function cartaoMusica(musica) {
  const favorita = ehFavorita(musica.id);
  const acao = favorita
    ? `Remover ${musica.titulo} das favoritas`
    : `Salvar ${musica.titulo} nas favoritas`;

  return `
    <li class="cartao-musica">
      <img
        src="${imagemDoGenero(musica.genero)}"
        alt="Arte da categoria ${nomeDoGenero(musica.genero)}"
        width="480"
        height="480"
        loading="lazy"
      />
      <div class="conteudo-cartao">
        <p class="etiqueta">${nomeDoGenero(musica.genero)} · ${musica.ano}</p>
        <h3>${musica.titulo}</h3>
        <p class="artista">${musica.artista}</p>
        <p class="descricao">${musica.descricao}</p>
      </div>
      <button
        type="button"
        class="botao-favorito"
        data-id="${musica.id}"
        aria-pressed="${favorita}"
      >
        <span class="coracao" aria-hidden="true">${favorita ? "♥" : "♡"}</span>
        <span class="visualmente-oculto">${acao}</span>
      </button>
    </li>
  `;
}

function renderizarChips() {
  const categorias = [{ id: "todos", nome: "Todas" }, ...GENEROS];

  listaChips.innerHTML = categorias
    .map(
      (categoria) => `
        <button
          type="button"
          class="chip${categoria.id === estado.genero ? " ativo" : ""}"
          data-genero="${categoria.id}"
          aria-pressed="${categoria.id === estado.genero}"
        >
          ${categoria.nome}
        </button>
      `
    )
    .join("");
}

function atualizarChips() {
  listaChips.querySelectorAll(".chip").forEach((chip) => {
    const ativo = chip.dataset.genero === estado.genero;

    chip.classList.toggle("ativo", ativo);
    chip.setAttribute("aria-pressed", `${ativo}`);
  });
}

function renderizarGaleria() {
  const lista = filtrarMusicas();

  galeria.innerHTML = lista.map(cartaoMusica).join("");
  galeria.classList.remove("reservando");

  const categoria =
    estado.genero === "todos"
      ? "todas as categorias"
      : `a categoria ${nomeDoGenero(estado.genero)}`;

  if (lista.length === 0) {
    contagem.textContent = `Nenhuma música encontrada em ${categoria}.`;
    semResultados.textContent =
      estado.busca.trim() === ""
        ? `Ainda não há músicas nesta categoria. Escolha "Todas" para ver o acervo completo.`
        : `Não encontramos nada para "${estado.busca}". Tente outro termo ou escolha a categoria "Todas".`;
    semResultados.hidden = false;
    return;
  }

  const rotulo = lista.length === 1 ? "música" : "músicas";

  contagem.textContent = `Mostrando ${lista.length} ${rotulo} em ${categoria}.`;
  semResultados.hidden = true;
}

// Categoria inicial: primeiro o link que trouxe o visitante, depois a última
// escolha salva no navegador.
function generoInicial() {
  const parametro = new URLSearchParams(window.location.search).get("genero");
  const salvo = localStorage.getItem(CHAVE_FILTRO);
  const valido = (id) => id === "todos" || GENEROS.some((g) => g.id === id);

  if (parametro && valido(parametro)) {
    return parametro;
  }

  if (salvo && valido(salvo)) {
    return salvo;
  }

  return "todos";
}

if (galeria) {
  estado.genero = generoInicial();

  renderizarChips();
  renderizarGaleria();

  listaChips.addEventListener("click", (evento) => {
    const chip = evento.target.closest(".chip");

    if (!chip) {
      return;
    }

    estado.genero = chip.dataset.genero;
    localStorage.setItem(CHAVE_FILTRO, estado.genero);

    atualizarChips();
    renderizarGaleria();
  });

  campoBusca.addEventListener("input", (evento) => {
    estado.busca = evento.target.value;
    renderizarGaleria();
  });

  campoOrdem.addEventListener("change", (evento) => {
    estado.ordem = evento.target.value;
    renderizarGaleria();
  });

  galeria.addEventListener("click", (evento) => {
    const botao = evento.target.closest(".botao-favorito");

    if (!botao) {
      return;
    }

    const musica = MUSICAS.find((item) => item.id === botao.dataset.id);
    const favorita = alternarFavorita(botao.dataset.id);

    botao.setAttribute("aria-pressed", `${favorita}`);
    botao.querySelector(".coracao").textContent = favorita ? "♥" : "♡";
    botao.querySelector(".visualmente-oculto").textContent = favorita
      ? `Remover ${musica.titulo} das favoritas`
      : `Salvar ${musica.titulo} nas favoritas`;
  });
}
