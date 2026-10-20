// v4: a lista reage ao que a pessoa faz.

const lista = document.querySelector("#lista");
const contador = document.querySelector("#contador");
const busca = document.querySelector("#busca");
const editora = document.querySelector("#editora");
const ordenar = document.querySelector("#ordenar");

function criarCartao(heroi) {
  const artigo = document.createElement("article");
  artigo.className = "cartao";
  const img = document.createElement("img");
  img.src = heroi.imagem; img.alt = heroi.nome; img.loading = "lazy";
  img.addEventListener("error", () => { img.removeAttribute("src"); });
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
  lista.textContent = "";
  for (const heroi of herois) lista.append(criarCartao(heroi));
  contador.textContent = herois.length === 1
    ? "1 herói na tela"
    : `${herois.length} heróis na tela`;
}

// Monta as opções do filtro a partir dos próprios dados
function preencherEditoras() {
  const nomes = [];
  for (const heroi of HEROIS) {
    if (!nomes.includes(heroi.editora)) nomes.push(heroi.editora);
  }
  nomes.sort();
  for (const nome of nomes) {
    const opcao = document.createElement("option");
    opcao.value = nome;
    opcao.textContent = nome;
    editora.append(opcao);
  }
}

// Uma função só decide o que aparece, e os três eventos chamam ela
function aplicarFiltros() {
  const termo = busca.value.trim().toLowerCase();
  let resultado = [];

  for (const heroi of HEROIS) {
    const combinaNome = heroi.nome.toLowerCase().includes(termo);
    const combinaEditora = editora.value === "" || heroi.editora === editora.value;
    if (combinaNome && combinaEditora) resultado.push(heroi);
  }

  if (ordenar.checked) {
    resultado.sort((a, b) => b.poder - a.poder);
  }

  mostrar(resultado);
}

preencherEditoras();
mostrar(HEROIS);

busca.addEventListener("input", aplicarFiltros);     // a cada tecla
editora.addEventListener("change", aplicarFiltros);  // ao escolher no select
ordenar.addEventListener("change", aplicarFiltros);  // ao marcar a caixa
