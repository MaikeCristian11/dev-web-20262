// v2: console, tipos e a soma que dá errado.
// Abra o console com F12 e acompanhe as mensagens.

console.log("O script rodou. HEROIS tem", HEROIS.length, "heróis.");

const primeiro = HEROIS[0];
console.log("Primeiro herói:", primeiro.nome, "| tipo do objeto:", typeof primeiro);
console.log("Poder:", primeiro.poder, "| tipo:", typeof primeiro.poder);

// Um herói cadastrado por formulário: tudo o que vem de campo chega como TEXTO
const novo = { nome: "Herói do formulário", poder: "80", combate: "45" };
console.log("Poder digitado:", novo.poder, "| tipo:", typeof novo.poder);

// A armadilha: com texto de um lado, o + junta em vez de somar
const somaErrada = novo.poder + novo.combate;
console.log("novo.poder + novo.combate =", somaErrada, "| tipo:", typeof somaErrada);

// A correção: converter antes de fazer conta
const somaCerta = Number(novo.poder) + Number(novo.combate);
console.log("Number(...) + Number(...) =", somaCerta, "| tipo:", typeof somaCerta);

// Mesma ideia com os dados do array, que já vêm como número
function totalDePoder(heroi) {
  return heroi.inteligencia + heroi.forca + heroi.velocidade + heroi.poder + heroi.combate;
}
console.log("Total de poder de", primeiro.nome, "=", totalDePoder(primeiro));

// Mostra as duas contas na tela, para quem não está com o console aberto
const saida = document.querySelector("#saida");
saida.textContent =
  `Somando como texto: ${somaErrada}   ·   somando como número: ${somaCerta}`;

const total = document.querySelector("#total");
total.textContent = `${primeiro.nome} soma ${totalDePoder(primeiro)} pontos nas cinco categorias.`;
