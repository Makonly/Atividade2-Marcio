var jogo = {
  jogador1: 0,
  jogador2: 0,
  rodadaAtual: 1,
  rodadasJogadas: 0,
  maxRodadas: 10,
  resultado: document.getElementById("resultado"),
  jogador1Contador: document.getElementById("jogador1-contador"),
  jogador2Contador: document.getElementById("jogador2-contador"),
  jogador1Btn: document.getElementById("jogador1"),
  jogador2Btn: document.getElementById("jogador2"),
  reiniciarBtn: document.getElementById("reiniciar")
};


var jogoSalvo = localStorage.getItem("jogoDados");
if (jogoSalvo) {
  // Recuperar os dados salvos
  var dadosJogo = JSON.parse(jogoSalvo);
  jogo.jogador1 = dadosJogo.jogador1;
  jogo.jogador2 = dadosJogo.jogador2;
  jogo.rodadaAtual = dadosJogo.rodadaAtual;
  jogo.rodadasJogadas = dadosJogo.rodadasJogadas;
  jogo.jogador1Contador.textContent = dadosJogo.jogador1Contador;
  jogo.jogador2Contador.textContent = dadosJogo.jogador2Contador;
  jogo.resultado.innerHTML = dadosJogo.resultado;
  jogo.jogador1Btn.disabled = dadosJogo.jogador1Disabled;
  jogo.jogador2Btn.disabled = dadosJogo.jogador2Disabled;
  if (jogo.rodadasJogadas >= jogo.maxRodadas) {
    finalizarJogo();
  }
}


function jogarDado(jogador) {
  var valor = Math.floor(Math.random() * 6) + 1;
  if (jogador === 1) {
    jogo.jogador1 = valor;
    alert("Jogador 1 jogou o dado e obteve o valor " + valor);
    jogo.jogador1Btn.disabled = true;
    jogo.jogador2Btn.disabled = false;
  } else {
    jogo.jogador2 = valor;
    alert("Jogador 2 jogou o dado e obteve o valor " + valor);
    jogo.jogador2Btn.disabled = true;
    jogo.jogador1Btn.disabled = false;
    avaliarRodada();
  }
  salvarJogo();
}


function avaliarRodada() {
  var mensagem = "";
  if (jogo.jogador1 > jogo.jogador2) {
    mensagem = "Jogador 1 venceu a rodada " + jogo.rodadaAtual;
    jogo.jogador1Contador.textContent = parseInt(jogo.jogador1Contador.textContent) + 1;
  } else if (jogo.jogador2 > jogo.jogador1) {
    mensagem = "Jogador 2 venceu a rodada " + jogo.rodadaAtual;
    jogo.jogador2Contador.textContent = parseInt(jogo.jogador2Contador.textContent) + 1;
  } else {
    mensagem = "Empate na rodada " + jogo.rodadaAtual;
  }
  jogo.resultado.innerHTML += mensagem + "<br>";
  jogo.rodadaAtual++;
  jogo.rodadasJogadas++;
  if (jogo.rodadasJogadas >= jogo.maxRodadas) {
    finalizarJogo();
  }
  salvarJogo();
}


function finalizarJogo() {
  var mensagem = "";
  if (parseInt(jogo.jogador1Contador.textContent) > parseInt(jogo.jogador2Contador.textContent)) {
    mensagem = "Jogador 1 venceu a partida";
  } else if (parseInt(jogo.jogador2Contador.textContent) > parseInt(jogo.jogador1Contador.textContent)) {
    mensagem = "Jogador 2 venceu a partida";
  } else {
    mensagem = "Partida empatada";
  }
  jogo.resultado.innerHTML += "<br><strong>" + mensagem + "</strong>";
  jogo.jogador1Btn.disabled = true;
  jogo.jogador2Btn.disabled = true;
  jogo.reiniciarBtn.style.display = "block";
  localStorage.removeItem("jogoDados");
}


function salvarJogo() {
  var dadosJogo = {
    jogador1: jogo.jogador1,
    jogador2: jogo.jogador2,
    rodadaAtual: jogo.rodadaAtual,
    rodadasJogadas: jogo.rodadasJogadas,
    jogador1Contador: jogo.jogador1Contador.textContent,
    jogador2Contador: jogo.jogador2Contador.textContent,
    resultado: jogo.resultado.innerHTML,
    jogador1Disabled: jogo.jogador1Btn.disabled,
    jogador2Disabled: jogo.jogador2Btn.disabled
  };
  localStorage.setItem("jogoDados", JSON.stringify(dadosJogo));
}


function reiniciarJogo() {
  jogo.jogador1 = 0;
  jogo.jogador2 = 0;
  jogo.rodadaAtual = 1;
  jogo.rodadasJogadas = 0;
  jogo.resultado.innerHTML = "";
  jogo.jogador1Contador.textContent = 0;
  jogo.jogador2Contador.textContent = 0;
  jogo.jogador1Btn.disabled = false;
  jogo.jogador2Btn.disabled = true;
  jogo.reiniciarBtn.style.display = "none";
  localStorage.removeItem("jogoDados");
}
