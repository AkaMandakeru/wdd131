// Preenche dinamicamente o ano atual no rodapé (símbolo de copyright).
const anoAtual = document.querySelector("#anoatual");
if (anoAtual) {
  anoAtual.textContent = new Date().getFullYear();
}

// Exibe a data da última modificação do documento.
const ultimaModificacao = document.querySelector("#ultimaModificacao");
if (ultimaModificacao) {
  ultimaModificacao.textContent = `Última modificação: ${document.lastModified}`;
}
