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
