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

    botaoMenu.innerHTML = aberto ? "&#10005;" : "&#9776;";
    botaoMenu.setAttribute("aria-expanded", aberto);
    botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });
}

// ---------- Clima: sensação térmica ----------
// Valores estáticos que correspondem ao conteúdo exibido no HTML.
const temperatura = 9; // °C
const velocidadeVento = 10; // km/h

// Fórmula métrica de sensação térmica (wind chill), em °C e km/h.
function calcularSensacaoTermica(temp, vento) {
  return 13.12 + 0.6215 * temp - 11.37 * vento ** 0.16 + 0.3965 * temp * vento ** 0.16;
}

const saidaSensacao = document.querySelector("#sensacaoTermica");
if (saidaSensacao) {
  // Só calcula quando a temperatura <= 10 °C e o vento > 4.8 km/h.
  if (temperatura <= 10 && velocidadeVento > 4.8) {
    saidaSensacao.textContent = `${calcularSensacaoTermica(temperatura, velocidadeVento).toFixed(1)} °C`;
  } else {
    saidaSensacao.textContent = "N/A";
  }
}
