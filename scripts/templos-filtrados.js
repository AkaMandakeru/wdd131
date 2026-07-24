// ---------- Rodapé dinâmico ----------
const anoAtual = document.querySelector("#anoatual");
if (anoAtual) {
  anoAtual.textContent = new Date().getFullYear();
}

const ultimaModificacao = document.querySelector("#ultimaModificacao");
if (ultimaModificacao) {
  ultimaModificacao.textContent = `Última modificação: ${document.lastModified}`;
}

// ---------- Menu hambúrguer ----------
const botaoMenu = document.querySelector("#menu");
const navegacao = document.querySelector("#navegacao");

if (botaoMenu && navegacao) {
  botaoMenu.addEventListener("click", () => {
    navegacao.classList.toggle("aberto");
    const aberto = navegacao.classList.contains("aberto");

    // Alterna o símbolo: ✕ para fechar, ☰ para abrir
    botaoMenu.innerHTML = aberto ? "&#10005;" : "&#9776;";
    botaoMenu.setAttribute("aria-expanded", aberto);
    botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });
}

// ---------- Cartões de templo ----------
const galeria = document.querySelector("#galeria");

function anoDaConsagracao(consagracao) {
  return parseInt(consagracao, 10);
}

function criarCartao(templo) {
  const figura = document.createElement("figure");

  const imagem = document.createElement("img");
  imagem.src = templo.urlDaImagem;
  imagem.alt = templo.nomeDoTemplo;
  imagem.loading = "lazy";
  figura.appendChild(imagem);

  const legenda = document.createElement("figcaption");
  legenda.innerHTML = `
    <h2>${templo.nomeDoTemplo}</h2>
    <p>${templo.localizacao}</p>
    <p>Consagrado: ${templo.consagracao}</p>
    <p>${templo.area.toLocaleString("pt-BR")} pés quadrados</p>
  `;
  figura.appendChild(legenda);

  return figura;
}

function renderizarTemplos(lista) {
  if (!galeria) return;
  galeria.innerHTML = "";
  lista.forEach((templo) => galeria.appendChild(criarCartao(templo)));
}

function filtrarTemplos(tipo) {
  switch (tipo) {
    case "antigos":
      return templos.filter((t) => anoDaConsagracao(t.consagracao) < 1900);
    case "novos":
      return templos.filter((t) => anoDaConsagracao(t.consagracao) > 2000);
    case "grandes":
      return templos.filter((t) => t.area > 90000);
    case "pequenos":
      return templos.filter((t) => t.area < 10000);
    default:
      return templos;
  }
}

const linksFiltro = document.querySelectorAll("#navegacao a[data-filtro]");

linksFiltro.forEach((link) => {
  link.addEventListener("click", (evento) => {
    evento.preventDefault();

    linksFiltro.forEach((l) => l.classList.remove("ativo"));
    link.classList.add("ativo");

    renderizarTemplos(filtrarTemplos(link.dataset.filtro));

    if (navegacao && navegacao.classList.contains("aberto")) {
      navegacao.classList.remove("aberto");
      botaoMenu.innerHTML = "&#9776;";
      botaoMenu.setAttribute("aria-expanded", false);
      botaoMenu.setAttribute("aria-label", "Abrir menu");
    }
  });
});

renderizarTemplos(templos);
