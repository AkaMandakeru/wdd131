// ---------- Contador de avaliações (localStorage) ----------
// O rodapé dinâmico e o menu hambúrguer são tratados por scripts/comum.js.
const CHAVE_CONTADOR = "totalAvaliacoes";
let total = Number(localStorage.getItem(CHAVE_CONTADOR)) || 0;
total += 1;
localStorage.setItem(CHAVE_CONTADOR, total);

const saidaTotal = document.querySelector("#totalAvaliacoes");
if (saidaTotal) {
  saidaTotal.textContent = total;
}

// ---------- Resumo do envio (parâmetros da URL) ----------
const rotulos = {
  nomeProduto: "Produto",
  classificacao: "Classificação",
  dataInstalacao: "Data de instalação",
  recursos: "Recursos úteis",
  avaliacaoEscrita: "Avaliação escrita",
  nomeUsuario: "Nome de usuário",
};

const resumo = document.querySelector("#resumo");
if (resumo) {
  const parametros = new URLSearchParams(window.location.search);

  Object.keys(rotulos).forEach((chave) => {
    const valores = parametros.getAll(chave);
    if (valores.length === 0 || valores.every((valor) => valor === "")) {
      return;
    }

    const dt = document.createElement("dt");
    dt.textContent = rotulos[chave];

    const dd = document.createElement("dd");
    dd.textContent = valores.join(", ");

    resumo.appendChild(dt);
    resumo.appendChild(dd);
  });
}
