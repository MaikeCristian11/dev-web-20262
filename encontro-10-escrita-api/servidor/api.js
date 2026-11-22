// API local de demonstracao - encontro 10
//
// Faz o papel da API Spring Boot de cada equipe: mesmos metodos, mesmos
// codigos de resposta, mesmo problema de CORS.
//
//   node api.js            -> CORS DESLIGADO (o navegador bloqueia)
//   node api.js --cors     -> CORS LIGADO    (funciona)
//
// Nao tem dependencia nenhuma: roda so com o Node instalado.

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORTA = 3001;
const CORS_LIGADO = process.argv.includes("--cors");
const ATRASO = 400; // ms, para dar tempo de ver o estado de enviando

// ------------------------------------------------------------ dados
const SEMENTE = path.join(__dirname, "herois-semente.json");
let herois = JSON.parse(fs.readFileSync(SEMENTE, "utf8"));
let proximoId = Math.max(...herois.map((h) => h.id)) + 1;

// ------------------------------------------------------------ ajudantes
function json(res, status, corpo) {
  const cabecalhos = { "Content-Type": "application/json; charset=utf-8" };
  if (CORS_LIGADO) {
    cabecalhos["Access-Control-Allow-Origin"] = "*";
    cabecalhos["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
    cabecalhos["Access-Control-Allow-Headers"] = "Content-Type";
  }
  res.writeHead(status, cabecalhos);
  res.end(corpo === undefined ? "" : JSON.stringify(corpo));
}

function lerCorpo(req) {
  return new Promise((resolve, reject) => {
    let bruto = "";
    req.on("data", (p) => { bruto += p; });
    req.on("end", () => {
      if (!bruto) return resolve({});
      try { resolve(JSON.parse(bruto)); } catch { reject(new Error("JSON inválido")); }
    });
    req.on("error", reject);
  });
}

// Validacao de servidor: o front valida para ajudar, o servidor valida
// para valer. Devolve a lista de problemas, no formato campo/mensagem.
function validar(corpo) {
  const erros = {};
  const nome = (corpo.nome || "").trim();
  if (nome.length < 2) erros.nome = "O nome precisa ter pelo menos 2 letras.";
  if (!corpo.editora) erros.editora = "Escolha a editora.";
  const poder = Number(corpo.poder);
  if (!Number.isInteger(poder) || poder < 0 || poder > 100) {
    erros.poder = "O poder precisa ser um número inteiro de 0 a 100.";
  }
  return erros;
}

function normalizar(corpo) {
  return {
    nome: String(corpo.nome).trim(),
    nomeReal: String(corpo.nomeReal || "Desconhecido").trim(),
    editora: corpo.editora,
    poder: Number(corpo.poder),
    imagem: corpo.imagem || "",
  };
}

// ------------------------------------------------------------ servidor
const servidor = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORTA}`);
  const partes = url.pathname.split("/").filter(Boolean);
  const metodo = req.method;

  setTimeout(() => responder(), ATRASO);

  async function responder() {
    // A requisicao de verificacao que o navegador manda antes de POST,
    // PUT e DELETE. Sem CORS ligado, ela morre aqui e nada mais acontece.
    if (metodo === "OPTIONS") {
      return json(res, CORS_LIGADO ? 204 : 403);
    }

    if (partes[0] !== "herois") {
      return json(res, 404, { erro: "Rota não encontrada." });
    }

    const id = partes[1] ? Number(partes[1]) : null;

    // GET /herois
    if (metodo === "GET" && id === null) {
      const busca = (url.searchParams.get("nome") || "").toLowerCase();
      const lista = busca
        ? herois.filter((h) => h.nome.toLowerCase().includes(busca))
        : herois;
      return json(res, 200, lista);
    }

    // GET /herois/:id
    if (metodo === "GET" && id !== null) {
      const achado = herois.find((h) => h.id === id);
      if (!achado) return json(res, 404, { erro: "Herói não encontrado." });
      return json(res, 200, achado);
    }

    // POST /herois
    if (metodo === "POST" && id === null) {
      let corpo;
      try { corpo = await lerCorpo(req); }
      catch { return json(res, 400, { erro: "Corpo da requisição inválido." }); }

      const erros = validar(corpo);
      if (Object.keys(erros).length) return json(res, 400, { erros });

      const novo = { id: proximoId++, ...normalizar(corpo) };
      herois = [novo, ...herois];
      return json(res, 201, novo);
    }

    // PUT /herois/:id
    if (metodo === "PUT" && id !== null) {
      const indice = herois.findIndex((h) => h.id === id);
      if (indice === -1) return json(res, 404, { erro: "Herói não encontrado." });

      let corpo;
      try { corpo = await lerCorpo(req); }
      catch { return json(res, 400, { erro: "Corpo da requisição inválido." }); }

      const erros = validar(corpo);
      if (Object.keys(erros).length) return json(res, 400, { erros });

      // PUT substitui o recurso inteiro. Aqui preservamos a imagem quando
      // ela nao vem no corpo, para o card nao ficar em branco depois da
      // edicao: e uma escolha do servidor, nao uma regra do metodo.
      const atual = herois[indice];
      const atualizado = { id, ...normalizar(corpo) };
      if (!corpo.imagem) atualizado.imagem = atual.imagem;
      herois = herois.map((h) => (h.id === id ? atualizado : h));
      return json(res, 200, atualizado);
    }

    // DELETE /herois/:id
    if (metodo === "DELETE" && id !== null) {
      const existe = herois.some((h) => h.id === id);
      if (!existe) return json(res, 404, { erro: "Herói não encontrado." });
      herois = herois.filter((h) => h.id !== id);
      return json(res, 204);
    }

    return json(res, 405, { erro: `Método ${metodo} não vale para essa rota.` });
  }
});

servidor.listen(PORTA, () => {
  console.log("");
  console.log("  API de demonstração no ar em http://localhost:" + PORTA);
  console.log("  CORS: " + (CORS_LIGADO ? "LIGADO" : "DESLIGADO  (o navegador vai bloquear)"));
  console.log("");
  console.log("  GET    /herois");
  console.log("  GET    /herois/:id");
  console.log("  POST   /herois");
  console.log("  PUT    /herois/:id");
  console.log("  DELETE /herois/:id");
  console.log("");
  console.log("  Os dados ficam na memória: reiniciar devolve a lista original.");
  console.log("");
});
