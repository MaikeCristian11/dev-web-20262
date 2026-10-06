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

function mostrarErro(campo, texto) {
  document.querySelector(`#erro-${campo.id}`).textContent = texto;
  campo.setAttribute("aria-invalid", "true");
}

function limparErro(campo) {
  document.querySelector(`#erro-${campo.id}`).textContent = "";
  campo.removeAttribute("aria-invalid");
}

function validar() {
  const erros = [];

  if (nome.value.trim().length < 2) {
    mostrarErro(nome, "Digite o nome do herói, com pelo menos 2 letras.");
    erros.push(nome);
  } else { limparErro(nome); }

  if (nomeReal.value.trim() === "") {
    mostrarErro(nomeReal, "Digite o nome real, ou escreva Desconhecido.");
    erros.push(nomeReal);
  } else { limparErro(nomeReal); }

  if (editora.value === "") {
    mostrarErro(editora, "Escolha a editora.");
    erros.push(editora);
  } else { limparErro(editora); }

  const valorPoder = Number(poder.value);            // texto vira número
  if (poder.value.trim() === "" || Number.isNaN(valorPoder)) {
    mostrarErro(poder, "Digite o poder em números, de 0 a 100.");
    erros.push(poder);
  } else if (valorPoder < 0 || valorPoder > 100) {
    mostrarErro(poder, "O poder vai de 0 a 100.");
    erros.push(poder);
  } else { limparErro(poder); }

  if (erros.length > 0) erros[0].focus();            // foco no primeiro erro
  return erros.length === 0;
}

form.addEventListener("submit", (evento) => {
  evento.preventDefault();                           // não recarrega a página
  status.textContent = "";
  status.classList.remove("ok");

  if (!validar()) return;

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

for (const campo of [nome, nomeReal, editora, poder]) {
  campo.addEventListener("input", () => {
    if (campo.getAttribute("aria-invalid") === "true") limparErro(campo);
  });
}

mostrar();
