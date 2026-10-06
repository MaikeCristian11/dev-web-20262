// v3: transformar o array em cards na tela.

const lista = document.querySelector("#lista");
const contador = document.querySelector("#contador");

function criarCartao(heroi) {
  const artigo = document.createElement("article");
  artigo.className = "cartao";

  const img = document.createElement("img");
  img.src = heroi.imagem;
  img.alt = heroi.nome;
  img.loading = "lazy";
  img.addEventListener("error", () => { img.removeAttribute("src"); });

  const corpo = document.createElement("div");
  corpo.className = "corpo";

  const titulo = document.createElement("h3");
  titulo.textContent = heroi.nome;          // textContent, nunca innerHTML

  const real = document.createElement("p");
  real.className = "real";
  real.textContent = heroi.nomeReal;

  const editora = document.createElement("span");
  editora.className = "editora";
  editora.textContent = heroi.editora;

  const stats = document.createElement("p");
  stats.className = "stats";
  stats.textContent = `Poder ${heroi.poder} · Combate ${heroi.combate} · Velocidade ${heroi.velocidade}`;

  corpo.append(titulo, real, editora, stats);
  artigo.append(img, corpo);
  return artigo;
}

function mostrar(herois) {
  lista.textContent = "";                    // limpa o que estava lá
  for (const heroi of herois) {
    lista.append(criarCartao(heroi));
  }
  contador.textContent = `${herois.length} heróis na tela`;
}

mostrar(HEROIS);
