// ---------- Preenchimento dinâmico do select de produtos ----------
// O rodapé dinâmico e o menu hambúrguer são tratados por scripts/comum.js.
const produtos = [
  {
    id: "fc-1888",
    nome: "capacitor de fluxo",
    classificacaomedia: 4.5,
  },
  {
    id: "fc-2050",
    nome: "fios elétricos",
    classificacaomedia: 4.7,
  },
  {
    id: "fs-1987",
    nome: "circuitos de tempo",
    classificacaomedia: 3.5,
  },
  {
    id: "ac-2000",
    nome: "reator de baixa tensão",
    classificacaomedia: 3.9,
  },
  {
    id: "jj-1969",
    nome: "equalizador de distorção",
    classificacaomedia: 5.0,
  },
];

const selectProduto = document.querySelector("#nomeProduto");
if (selectProduto) {
  produtos.forEach((produto) => {
    const opcao = document.createElement("option");
    opcao.value = produto.id;
    opcao.textContent = produto.nome;
    selectProduto.appendChild(opcao);
  });
}
