// Todas as conversas com o servidor ficam neste arquivo.
// A tela chama estas funcoes e nao precisa saber de URL nem de metodo.

const BASE = 'http://localhost:3001/herois';

async function responder(resposta) {
  if (resposta.status === 400) {
    const corpo = await resposta.json();
    const erro = new Error('Dados inválidos.');
    erro.erros = corpo.erros || {};
    throw erro;
  }
  if (!resposta.ok) throw new Error('O servidor respondeu ' + resposta.status + '.');
  if (resposta.status === 204) return null;   // sem corpo para ler
  return resposta.json();
}

const comJson = (metodo, corpo) => ({
  method: metodo,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(corpo),
});

export async function listar() {
  return responder(await fetch(BASE));
}

export async function criar(heroi) {
  return responder(await fetch(BASE, comJson('POST', heroi)));
}

export async function atualizar(id, heroi) {
  return responder(await fetch(BASE + '/' + id, comJson('PUT', heroi)));
}

export async function remover(id) {
  return responder(await fetch(BASE + '/' + id, { method: 'DELETE' }));
}
