// ---------------------------------------------------------------------------
// MusicList — página de confirmação
// Mostra o resumo do que foi enviado (lido da URL) e o total de sugestões que
// este navegador já enviou, guardado em localStorage.
// ---------------------------------------------------------------------------

const CHAVE_SUGESTOES = "musiclist-sugestoes";

const ROTULOS = [
  { chave: "titulo", texto: "Música" },
  { chave: "artista", texto: "Artista" },
  { chave: "genero", texto: "Categoria" },
  { chave: "ano", texto: "Ano de lançamento" },
  { chave: "nota", texto: "Sua nota" },
  { chave: "ocasioes", texto: "Combina com" },
  { chave: "comentario", texto: "Comentário" },
  { chave: "nome", texto: "Enviado por" },
];

const resumo = document.querySelector("#resumo");
const saudacao = document.querySelector("#saudacao");
const totalSugestoes = document.querySelector("#totalSugestoes");

// Neutraliza qualquer marcação vinda da URL antes de escrever na página.
function escapar(texto) {
  const caixa = document.createElement("span");
  caixa.textContent = texto;
  return caixa.innerHTML;
}

// Traduz o identificador da categoria para o nome mostrado ao visitante.
function valorLegivel(chave, valores) {
  if (chave === "genero") {
    const genero = GENEROS.find((item) => item.id === valores[0]);
    return genero ? genero.nome : valores[0];
  }

  if (chave === "nota") {
    const estrelas = Number(valores[0]);
    return `${"★".repeat(estrelas)}${"☆".repeat(5 - estrelas)} (${estrelas} de 5)`;
  }

  return valores.join(", ");
}

function linhaDoResumo(rotulo, valores) {
  return `
    <dt>${rotulo.texto}</dt>
    <dd>${escapar(valorLegivel(rotulo.chave, valores))}</dd>
  `;
}

// Soma mais uma sugestão ao contador deste navegador.
function registrarEnvio() {
  const anterior = Number(localStorage.getItem(CHAVE_SUGESTOES)) || 0;
  const atual = anterior + 1;

  localStorage.setItem(CHAVE_SUGESTOES, `${atual}`);
  return atual;
}

if (resumo) {
  const parametros = new URLSearchParams(window.location.search);

  const linhas = ROTULOS.filter((rotulo) => {
    const valores = parametros.getAll(rotulo.chave);
    return valores.length > 0 && valores.some((valor) => valor.trim() !== "");
  }).map((rotulo) => linhaDoResumo(rotulo, parametros.getAll(rotulo.chave)));

  if (linhas.length === 0) {
    resumo.innerHTML = `<dt>Resumo</dt><dd>Nenhum dado foi recebido do formulário.</dd>`;
  } else {
    resumo.innerHTML = linhas.join("");
  }

  const nome = parametros.get("nome");
  saudacao.textContent =
    nome && nome.trim() !== ""
      ? `Obrigado, ${nome.trim()}! Sua sugestão foi registrada.`
      : `Obrigado! Sua sugestão foi registrada.`;

  const total = registrarEnvio();
  totalSugestoes.textContent =
    total === 1
      ? `Esta é a sua primeira sugestão enviada pelo MusicList.`
      : `Você já enviou ${total} sugestões pelo MusicList.`;
}
