// ---------------------------------------------------------------------------
// MusicList — página inicial
// Monta os destaques da semana, os cartões de gênero e os números do acervo a
// partir dos arrays declarados em dados.js.
// ---------------------------------------------------------------------------

// Devolve o objeto de gênero correspondente ao identificador informado.
function buscarGenero(id) {
  return GENEROS.find((genero) => genero.id === id);
}

// Monta o cartão de uma música em destaque.
function cartaoDestaque(musica) {
  const genero = buscarGenero(musica.genero);

  return `
    <li class="cartao-destaque">
      <img
        src="${genero.imagem}"
        alt="Arte da categoria ${genero.nome}"
        width="480"
        height="480"
        loading="lazy"
      />
      <div class="conteudo-cartao">
        <p class="etiqueta">${genero.nome} · ${musica.ano}</p>
        <h3>${musica.titulo}</h3>
        <p class="artista">${musica.artista}</p>
        <p>${musica.descricao}</p>
      </div>
    </li>
  `;
}

// Monta o cartão de um gênero, com a quantidade de músicas do acervo.
function cartaoGenero(genero) {
  const total = MUSICAS.filter((musica) => musica.genero === genero.id).length;
  const rotulo = total === 1 ? "música" : "músicas";

  return `
    <li class="cartao-genero">
      <a href="musicas.html?genero=${genero.id}">
        <img
          src="${genero.imagem}"
          alt="Arte da categoria ${genero.nome}"
          width="480"
          height="480"
          loading="lazy"
        />
        <h3>${genero.nome}</h3>
        <p>${genero.descricao}</p>
        <span class="etiqueta">${total} ${rotulo}</span>
      </a>
    </li>
  `;
}

// Calcula os números mostrados na faixa de estatísticas.
function calcularNumeros() {
  const anos = MUSICAS.map((musica) => musica.ano);
  const totalDeFaixas = PLAYLISTS.reduce(
    (soma, playlist) => soma + playlist.musicas.length,
    0
  );

  return {
    musicas: MUSICAS.length,
    generos: GENEROS.length,
    playlists: PLAYLISTS.length,
    faixas: totalDeFaixas,
    maisAntiga: Math.min(...anos),
    maisRecente: Math.max(...anos),
  };
}

// Mensagem de boas-vindas que muda conforme o que já foi salvo no navegador.
function mensagemDeBoasVindas() {
  const total = lerFavoritos().length;

  if (total === 0) {
    return `Comece pelo catálogo e toque no coração para montar a sua própria playlist.`;
  }

  if (total === 1) {
    return `Você já salvou 1 música favorita. Continue de onde parou na página de playlists.`;
  }

  return `Você já salvou ${total} músicas favoritas. Continue de onde parou na página de playlists.`;
}

// Libera a altura reservada no CSS assim que o bloco recebe o conteúdo.
function liberarReserva(elemento) {
  elemento.classList.remove("reservando");
}

const listaDestaques = document.querySelector("#destaques");
const listaGeneros = document.querySelector("#generos");
const painelNumeros = document.querySelector("#numeros");
const aviso = document.querySelector("#aviso");

if (listaDestaques) {
  const destaques = MUSICAS.filter((musica) => musica.destaque);
  listaDestaques.innerHTML = destaques.map(cartaoDestaque).join("");
  liberarReserva(listaDestaques);
}

if (listaGeneros) {
  listaGeneros.innerHTML = GENEROS.map(cartaoGenero).join("");
  liberarReserva(listaGeneros);
}

if (painelNumeros) {
  const numeros = calcularNumeros();

  painelNumeros.innerHTML = `
    <div class="numero-item">
      <span class="valor">${numeros.musicas}</span>
      <span class="rotulo">músicas catalogadas</span>
    </div>
    <div class="numero-item">
      <span class="valor">${numeros.generos}</span>
      <span class="rotulo">categorias</span>
    </div>
    <div class="numero-item">
      <span class="valor">${numeros.playlists}</span>
      <span class="rotulo">playlists por ocasião</span>
    </div>
    <div class="numero-item">
      <span class="valor">${numeros.faixas}</span>
      <span class="rotulo">faixas selecionadas</span>
    </div>
    <div class="numero-item">
      <span class="valor">${numeros.maisAntiga} – ${numeros.maisRecente}</span>
      <span class="rotulo">anos representados</span>
    </div>
  `;

  liberarReserva(painelNumeros);
}

if (aviso) {
  aviso.textContent = mensagemDeBoasVindas();
}
