var jogador1 = 0;
var jogador2 = 0;
var rodadaAtual = 1;
var rodadasJogadas = 0;
var maxRodadas = 10;
var resultado = document.getElementById("resultado");
var jogador1Contador = document.getElementById("jogador1-contador");
var jogador2Contador = document.getElementById("jogador2-contador");

function jogarDado(jogador) {
  var valor = Math.floor(Math.random() * 6) + 1;
  if(jogador === 1) {
    jogador1 = valor;
    alert("Jogador 1 jogou o dado e obteve o valor " + valor);
    document.getElementById("jogador1").disabled = true;
    document.getElementById("jogador2").disabled = false;
  } else {
    jogador2 = valor;
    alert("Jogador 2 jogou o dado e obteve o valor " + valor);
    document.getElementById("jogador2").disabled = true;
    document.getElementById("jogador1").disabled = false;
    avaliarRodada();
  }
}

function avaliarRodada() {
  var mensagem = "";
  if(jogador1 > jogador2) {
    mensagem = "Jogador 1 venceu a rodada " + rodadaAtual;
    jogador1Contador.textContent = parseInt(jogador1Contador.textContent) + 1;
  } else if(jogador2 > jogador1) {
    mensagem = "Jogador 2 venceu a rodada " + rodadaAtual;
    jogador2Contador.textContent = parseInt(jogador2Contador.textContent) + 1;
  } else {
    mensagem = "Empate na rodada " + rodadaAtual;
  }
  resultado.innerHTML += mensagem + "<br>";
  rodadaAtual++;
  rodadasJogadas++;
  if(rodadasJogadas >= maxRodadas) {
    finalizarJogo();
  }
}

function finalizarJogo() {
  var mensagem = "";
  if(parseInt(jogador1Contador.textContent) > parseInt(jogador2Contador.textContent)) {
    mensagem = "Jogador 1 venceu a partida";
  } else if(parseInt(jogador2Contador.textContent) > parseInt(jogador1Contador.textContent)) {
    mensagem = "Jogador 2 venceu a partida";
} else {
  mensagem = "Partida empatada";
}
resultado.innerHTML += "<br><strong>" + mensagem + "</strong>";
document.getElementById("jogador1").disabled = true;
document.getElementById("jogador2").disabled = true;
document.getElementById("reiniciar").style.display = "block";
}

function reiniciarJogo() {
jogador1 = 0;
jogador2 = 0;
rodadaAtual = 1;
rodadasJogadas = 0;
resultado.innerHTML = "";
jogador1Contador.textContent = 0;
jogador2Contador.textContent = 0;
document.getElementById("jogador1").disabled = false;
document.getElementById("jogador2").disabled = true;
document.getElementById("reiniciar").style.display = "none";
}
