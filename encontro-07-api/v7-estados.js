// v7: os quatro estados de uma tela que depende de rede,
// com busca e filtro sobre os dados que vieram da API.

const API = "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json";
const API_QUEBRADA = "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/nao-existe.json";
const LIMITE = 60;

const lista = document.querySelector("#lista");
const contador = document.querySelector("#contador");
const painel = document.querySelector("#painel");
const busca = document.querySelector("#busca");
const editora = document.querySelector("#editora");
const btRecarregar = document.querySelector("#recarregar");
const btLento = document.querySelector("#lento");
const btErro = document.querySelector("#erro");

let todos = [];   // guarda o que veio da API, para filtrar sem buscar de novo

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

function limpar() {
  painel.textContent = "";
  lista.textContent = "";
  contador.textContent = "";
}

function estadoCarregando() {
  limpar();
  const aviso = document.createElement("p");
  aviso.className = "estado carregando";
  aviso.setAttribute("role", "status");
  const giro = document.createElement("span");
  giro.className = "spinner";
  aviso.append(giro, document.createTextNode("Buscando heróis na API..."));
  painel.append(aviso);
}

function estadoErro(mensagem) {
  limpar();
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
  botao.addEventListener("click", () => carregar(API));
  caixa.append(titulo, texto, botao);
  painel.append(caixa);
}

function estadoVazio(termo) {
  lista.textContent = "";
  painel.textContent = "";
  const aviso = document.createElement("p");
  aviso.className = "estado vazio";
  aviso.setAttribute("role", "status");
  aviso.textContent = `Nenhum herói combina com "${termo}". Tente outro nome.`;
  painel.append(aviso);
  contador.textContent = "0 heróis na tela";
}

function estadoSucesso(herois) {
  painel.textContent = "";
  lista.textContent = "";
  for (const heroi of herois) lista.append(criarCartao(heroi));
  contador.textContent = `${herois.length} de ${todos.length} heróis carregados`;
}

function preencherEditoras() {
  const nomes = [];
  for (const heroi of todos) {
    if (!nomes.includes(heroi.editora)) nomes.push(heroi.editora);
  }
  nomes.sort();
  editora.textContent = "";
  const todasOpcao = document.createElement("option");
  todasOpcao.value = ""; todasOpcao.textContent = "Todas";
  editora.append(todasOpcao);
  for (const nome of nomes) {
    const opcao = document.createElement("option");
    opcao.value = nome; opcao.textContent = nome;
    editora.append(opcao);
  }
}

function filtrar() {
  const termo = busca.value.trim().toLowerCase();
  const achados = todos.filter((heroi) => {
    const combinaNome = heroi.nome.toLowerCase().includes(termo);
    const combinaEditora = editora.value === "" || heroi.editora === editora.value;
    return combinaNome && combinaEditora;
  });

  if (achados.length === 0) {
    estadoVazio(busca.value.trim() || editora.value);
    return;
  }
  estadoSucesso(achados.slice(0, LIMITE));
}

// Uma promessa que resolve depois de N milissegundos: serve para simular rede lenta
function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function carregar(url, atraso = 0) {
  estadoCarregando();
  busca.disabled = true;
  editora.disabled = true;

  try {
    if (atraso > 0) await esperar(atraso);

    const resposta = await fetch(url);
    if (!resposta.ok) throw new Error(`O servidor respondeu ${resposta.status}.`);

    const dados = await resposta.json();
    todos = dados.map(simplificar);
    preencherEditoras();
    busca.disabled = false;
    editora.disabled = false;
    filtrar();

  } catch (erro) {
    estadoErro(`${erro.message} Confira sua conexão e tente de novo.`);
  }
}

busca.addEventListener("input", filtrar);
editora.addEventListener("change", filtrar);
btRecarregar.addEventListener("click", () => carregar(API));
btLento.addEventListener("click", () => carregar(API, 3000));
btErro.addEventListener("click", () => carregar(API_QUEBRADA));

carregar(API);
