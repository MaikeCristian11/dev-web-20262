// v5: cadastro com validação acessível.
// O herói cadastrado entra na mesma lista da v4.

const lista = document.querySelector("#lista");
const contador = document.querySelector("#contador");
const form = document.querySelector("#form-heroi");
const nome = document.querySelector("#nome");
const nomeReal = document.querySelector("#nomeReal");
const editora = document.querySelector("#editora");
const poder = document.querySelector("#poder");
const status = document.querySelector("#status");

const herois = [...HEROIS];   // cópia, para não alterar o array original

function criarCartao(heroi) {
  const artigo = document.createElement("article");
  artigo.className = "cartao";
  const img = document.createElement("img");
  img.src = heroi.imagem || ""; img.alt = heroi.nome; img.loading = "lazy";
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
  stats.className = "stats"; stats.textContent = `Poder ${heroi.poder}`;
  corpo.append(titulo, real, marca, stats);
  artigo.append(img, corpo);
  return artigo;
}

function mostrar() {
  lista.textContent = "";
  for (const heroi of herois) lista.append(criarCartao(heroi));
  contador.textContent = `${herois.length} heróis na tela`;
}

// PONTO DE PARTIDA DO CÓDIGO AO VIVO
// Aqui o formulário cadastra qualquer coisa: nome vazio, poder 999, texto no lugar de número.
// Em aula vamos escrever juntos mostrarErro, limparErro e validar.

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  herois.unshift({
    id: Date.now(),
    nome: nome.value.trim(),
    nomeReal: nomeReal.value.trim(),
    editora: editora.value,
    poder: Number(poder.value),
    imagem: "",
  });

  mostrar();
  status.textContent = `${nome.value.trim()} entrou na lista.`;
  status.classList.add("ok");
  form.reset();
  nome.focus();
});

mostrar();
