// ---------------------------------------------------------------------------
// MusicList — playlists por ocasião e a playlist do visitante
// As playlists prontas vêm de dados.js; "Minha Playlist" é montada a partir
// das músicas favoritadas e guardadas em localStorage.
// ---------------------------------------------------------------------------

const listaPlaylists = document.querySelector("#playlists");
const minhaPlaylist = document.querySelector("#minhaPlaylist");
const resumoPlaylist = document.querySelector("#resumoPlaylist");
const botaoLimpar = document.querySelector("#limparPlaylist");

// Converte a lista de identificadores da playlist nos objetos completos.
function musicasDaPlaylist(ids) {
  return ids
    .map((id) => MUSICAS.find((musica) => musica.id === id))
    .filter((musica) => musica !== undefined);
}

function nomeDaCategoria(id) {
  const genero = GENEROS.find((item) => item.id === id);
  return genero ? genero.nome : "Outros";
}

function itemDeFaixa(musica) {
  return `
    <li>
      <span class="faixa-titulo">${musica.titulo}</span>
      <span class="faixa-artista">${musica.artista}</span>
      <span class="etiqueta">${nomeDaCategoria(musica.genero)} · ${musica.ano}</span>
    </li>
  `;
}

function cartaoPlaylist(playlist) {
  const faixas = musicasDaPlaylist(playlist.musicas);
  const rotulo = faixas.length === 1 ? "faixa" : "faixas";

  return `
    <li class="cartao-playlist">
      <img
        src="${playlist.imagem}"
        alt="Arte da playlist ${playlist.nome}"
        width="480"
        height="480"
        loading="lazy"
      />
      <div class="conteudo-cartao">
        <p class="etiqueta">${playlist.ocasiao} · ${faixas.length} ${rotulo}</p>
        <h3>${playlist.nome}</h3>
        <p>${playlist.descricao}</p>
        <button
          type="button"
          class="botao-secundario alternar-faixas"
          aria-expanded="false"
          aria-controls="faixas-${playlist.id}"
        >
          Ver as faixas
        </button>
      </div>
      <ol class="faixas" id="faixas-${playlist.id}" hidden>
        ${faixas.map(itemDeFaixa).join("")}
      </ol>
    </li>
  `;
}

// Monta o texto de resumo com a quantidade de músicas e de categorias salvas.
function textoDoResumo(favoritas) {
  if (favoritas.length === 0) {
    return `Sua playlist ainda está vazia. Vá até o catálogo e toque no coração das músicas que você gosta.`;
  }

  const categorias = favoritas.reduce((lista, musica) => {
    if (!lista.includes(musica.genero)) {
      lista.push(musica.genero);
    }
    return lista;
  }, []);

  const rotuloMusicas = favoritas.length === 1 ? "música" : "músicas";
  const rotuloCategorias = categorias.length === 1 ? "categoria" : "categorias";

  return `Você salvou ${favoritas.length} ${rotuloMusicas} de ${categorias.length} ${rotuloCategorias}: ${categorias
    .map(nomeDaCategoria)
    .join(", ")}.`;
}

function itemFavorito(musica) {
  return `
    <li class="item-favorito">
      <div>
        <h3>${musica.titulo}</h3>
        <p class="artista">${musica.artista}</p>
        <span class="etiqueta">${nomeDaCategoria(musica.genero)} · ${musica.ano}</span>
      </div>
      <button type="button" class="botao-remover" data-id="${musica.id}">
        Remover<span class="visualmente-oculto"> ${musica.titulo} da minha playlist</span>
      </button>
    </li>
  `;
}

function renderizarMinhaPlaylist() {
  const favoritas = musicasDaPlaylist(lerFavoritos());

  minhaPlaylist.innerHTML = favoritas.map(itemFavorito).join("");
  resumoPlaylist.textContent = textoDoResumo(favoritas);
  botaoLimpar.hidden = favoritas.length === 0;
}

if (listaPlaylists) {
  listaPlaylists.innerHTML = PLAYLISTS.map(cartaoPlaylist).join("");
  listaPlaylists.classList.remove("reservando");

  listaPlaylists.addEventListener("click", (evento) => {
    const botao = evento.target.closest(".alternar-faixas");

    if (!botao) {
      return;
    }

    const faixas = document.querySelector(`#${botao.getAttribute("aria-controls")}`);
    const aberto = faixas.hidden;

    faixas.hidden = !aberto;
    botao.setAttribute("aria-expanded", `${aberto}`);
    botao.textContent = aberto ? "Ocultar as faixas" : "Ver as faixas";
  });
}

if (minhaPlaylist) {
  renderizarMinhaPlaylist();

  minhaPlaylist.addEventListener("click", (evento) => {
    const botao = evento.target.closest(".botao-remover");

    if (!botao) {
      return;
    }

    alternarFavorita(botao.dataset.id);
    renderizarMinhaPlaylist();
  });

  botaoLimpar.addEventListener("click", () => {
    limparFavoritos();
    renderizarMinhaPlaylist();
  });
}
