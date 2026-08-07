// ---------------------------------------------------------------------------
// MusicList — formulário de sugestão de música
// Preenche as opções a partir dos dados do site, valida as ocasiões marcadas,
// conta os caracteres do comentário e lembra o nome de quem já enviou antes.
// ---------------------------------------------------------------------------

const LIMITE_COMENTARIO = 250;
const CHAVE_NOME = "musiclist-nome";

const formulario = document.querySelector("#formularioSugestao");
const seletorGenero = document.querySelector("#genero");
const grupoOcasioes = document.querySelector("#ocasioes");
const erroOcasioes = document.querySelector("#erroOcasioes");
const comentario = document.querySelector("#comentario");
const contadorTexto = document.querySelector("#contadorTexto");
const campoNome = document.querySelector("#nome");

function opcaoDeGenero(genero) {
  return `<option value="${genero.id}">${genero.nome}</option>`;
}

function caixaDeOcasiao(playlist) {
  return `
    <label class="caixa">
      <input type="checkbox" name="ocasioes" value="${playlist.ocasiao}" />
      ${playlist.ocasiao}
    </label>
  `;
}

function atualizarContadorTexto() {
  const usados = comentario.value.length;
  const restantes = LIMITE_COMENTARIO - usados;

  contadorTexto.textContent =
    restantes === 1
      ? `Resta 1 caractere.`
      : `Restam ${restantes} caracteres.`;
}

// Pelo menos uma ocasião precisa estar marcada antes do envio.
function ocasioesValidas() {
  return grupoOcasioes.querySelectorAll("input[type='checkbox']:checked").length > 0;
}

if (formulario) {
  seletorGenero.insertAdjacentHTML("beforeend", GENEROS.map(opcaoDeGenero).join(""));
  grupoOcasioes.insertAdjacentHTML("beforeend", PLAYLISTS.map(caixaDeOcasiao).join(""));

  comentario.setAttribute("maxlength", `${LIMITE_COMENTARIO}`);
  atualizarContadorTexto();
  comentario.addEventListener("input", atualizarContadorTexto);

  // Quem já enviou uma sugestão encontra o campo de nome preenchido.
  const nomeSalvo = localStorage.getItem(CHAVE_NOME);
  if (nomeSalvo) {
    campoNome.value = nomeSalvo;
  }

  grupoOcasioes.addEventListener("change", () => {
    if (ocasioesValidas()) {
      erroOcasioes.hidden = true;
    }
  });

  formulario.addEventListener("submit", (evento) => {
    if (!ocasioesValidas()) {
      evento.preventDefault();
      erroOcasioes.hidden = false;
      grupoOcasioes.querySelector("input[type='checkbox']").focus();
      return;
    }

    erroOcasioes.hidden = true;
    localStorage.setItem(CHAVE_NOME, campoNome.value);
  });
}
