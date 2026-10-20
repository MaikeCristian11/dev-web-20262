// v6: os mesmos cards, agora vindos da API.

const API = "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json";
const LIMITE = 60;   // 563 cards de uma vez deixam a página pesada

const lista = document.querySelector("#lista");
const contador = document.querySelector("#contador");
const painel = document.querySelector("#painel");

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

// Estado 1: avisar que está carregando (heurística 1, do encontro 2)
function mostrarCarregando() {
  lista.textContent = "";
  contador.textContent = "";
  painel.textContent = "";
  const aviso = document.createElement("p");
  aviso.className = "estado carregando";
  aviso.setAttribute("role", "status");
  const giro = document.createElement("span");
  giro.className = "spinner";
  aviso.append(giro, document.createTextNode("Buscando heróis na API..."));
  painel.append(aviso);
}

// Estado 2: erro, dizendo o que houve e o que fazer
function mostrarErro(mensagem) {
  lista.textContent = "";
  contador.textContent = "";
  painel.textContent = "";
  const caixa = document.createElement("div");
  caixa.className = "estado erro";
  caixa.setAttribute("role", "alert");
  const titulo = document.createElement("strong");
  titulo.textContent = "Não consegui carregar os heróis.";
  const texto = document.createElement("p");
  texto.textContent = mensagem;
  const botao = document.createElement("button");
  botao.type = "button";
  botao.textContent = "Tentar de novo";
  botao.addEventListener("click", carregar);
  caixa.append(titulo, texto, botao);
  painel.append(caixa);
}

// A busca em si
async function carregar() {
  mostrarCarregando();

  try {
    const resposta = await fetch(API);

    if (!resposta.ok) {                       // 404, 500 e companhia
      throw new Error(`O servidor respondeu ${resposta.status}.`);
    }

    const dados = await resposta.json();      // o corpo também demora
    const herois = dados.slice(0, LIMITE).map(simplificar);
    mostrar(herois);

  } catch (erro) {                            // rede fora, JSON quebrado, throw acima
    mostrarErro(`${erro.message} Confira sua conexão e tente de novo.`);
  }
}

carregar();
