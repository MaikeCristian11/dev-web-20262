// PONTO DE PARTIDA DO CÓDIGO AO VIVO
// A página já sabe desenhar os cards. O que falta é buscar os dados na API.

const API = "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json";

const lista = document.querySelector("#lista");
const contador = document.querySelector("#contador");
const painel = document.querySelector("#painel");

// Converte um herói da API para o formato que os cards usam
function simplificar(h) {
  return {
    id: h.id,
    nome: h.name,
    nomeReal: h.biography.fullName || "Desconhecido",
    editora: h.biography.publisher || "Sem editora",
    poder: h.powerstats.power,
    combate: h.powerstats.combat,
    velocidade: h.powerstats.speed,
    imagem: h.images.md,
  };
}

function criarCartao(heroi) {
  const artigo = document.createElement("article");
  artigo.className = "cartao";
  const img = document.createElement("img");
  img.src = heroi.imagem; img.alt = heroi.nome; img.loading = "lazy";
  img.addEventListener("error", () => img.removeAttribute("src"));
  const corpo = document.createElement("div");
  corpo.className = "corpo";
  const titulo = document.createElement("h3");
  titulo.textContent = heroi.nome;
  const real = document.createElement("p");
  real.className = "real"; real.textContent = heroi.nomeReal;
  const marca = document.createElement("span");
  marca.className = "editora"; marca.textContent = heroi.editora;
  const stats = document.createElement("p");
  stats.className = "stats";
  stats.textContent = `Poder ${heroi.poder} · Combate ${heroi.combate} · Velocidade ${heroi.velocidade}`;
  corpo.append(titulo, real, marca, stats);
  artigo.append(img, corpo);
  return artigo;
}

function mostrar(herois) {
  painel.textContent = "";
  lista.textContent = "";
  for (const heroi of herois) lista.append(criarCartao(heroi));
  contador.textContent = `${herois.length} heróis na tela`;
}

// TAREFA DA AULA: escrever a função que busca os heróis na API,
// mostra que está carregando e trata o erro.
