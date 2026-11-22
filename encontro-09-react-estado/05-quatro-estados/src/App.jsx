import { useState, useEffect } from 'react';
import CardHeroi from './CardHeroi.jsx';

const API = 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json';
const API_QUEBRADA = 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/nao-existe.json';
const LIMITE = 30;

function simplificar(h) {
  return {
    id: h.id,
    nome: h.name,
    nomeReal: h.biography.fullName || 'Desconhecido',
    editora: h.biography.publisher || 'Sem editora',
    poder: h.powerstats.power,
    combate: h.powerstats.combat,
    velocidade: h.powerstats.speed,
    imagem: h.images.md,
  };
}

function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function App() {
  const [herois, setHerois] = useState([]);
  const [status, setStatus] = useState('carregando'); // carregando | sucesso | erro
  const [mensagem, setMensagem] = useState('');
  const [termo, setTermo] = useState('');
  const [tentativa, setTentativa] = useState({ url: API, atraso: 0, n: 0 });

  useEffect(() => {
    let cancelado = false;

    async function carregar() {
      setStatus('carregando');
      try {
        if (tentativa.atraso > 0) await esperar(tentativa.atraso);

        const resposta = await fetch(tentativa.url);
        if (!resposta.ok) throw new Error('O servidor respondeu ' + resposta.status + '.');

        const dados = await resposta.json();
        if (cancelado) return;

        setHerois(dados.slice(0, LIMITE).map(simplificar));
        setStatus('sucesso');
      } catch (erro) {
        if (cancelado) return;
        setMensagem(erro.message + ' Confira sua conexão e tente de novo.');
        setStatus('erro');
      }
    }

    carregar();

    // Limpeza: se o componente sair da tela antes da resposta chegar,
    // cancelado evita mexer em estado que ninguem mais usa.
    return () => { cancelado = true; };
  }, [tentativa]);

  function tentar(url, atraso) {
    setTentativa((anterior) => ({ url, atraso, n: anterior.n + 1 }));
  }

  const visiveis = herois.filter((heroi) =>
    heroi.nome.toLowerCase().includes(termo.trim().toLowerCase())
  );

  return (
    <main className="container">
      <header>
        <span className="tag">ENCONTRO 9 &middot; ETAPA 5</span>
        <h1>Painel de heróis</h1>
        <p>Quatro estados possíveis, um de cada vez, decididos pelos dados.</p>
      </header>

      <div className="controles">
        <div className="campo">
          <label htmlFor="busca">Buscar por nome</label>
          <input
            id="busca"
            type="search"
            value={termo}
            disabled={status !== 'sucesso'}
            onChange={(evento) => setTermo(evento.target.value)}
            placeholder="Batman, Flash, Hulk..."
          />
        </div>

        <button type="button" onClick={() => tentar(API, 0)}>Recarregar</button>
        <button type="button" className="secundario" onClick={() => tentar(API, 3000)}>Simular rede lenta</button>
        <button type="button" className="secundario" onClick={() => tentar(API_QUEBRADA, 0)}>Simular erro</button>
      </div>

      {status === 'carregando' && (
        <p className="estado carregando" role="status">
          <span className="spinner" />
          Buscando heróis na API...
        </p>
      )}

      {status === 'erro' && (
        <div className="estado erro" role="alert">
          <strong>Não consegui carregar os heróis.</strong>
          <p>{mensagem}</p>
          <button type="button" onClick={() => tentar(API, 0)}>Tentar de novo</button>
        </div>
      )}

      {status === 'sucesso' && visiveis.length === 0 && (
        <p className="estado vazio" role="status">
          Nenhum herói combina com "{termo}". Tente outro nome.
        </p>
      )}

      {status === 'sucesso' && visiveis.length > 0 && (
        <>
          <p className="contador">{visiveis.length} de {herois.length} heróis na tela</p>
          <section className="grid" aria-label="Heróis encontrados">
            {visiveis.map((heroi) => (
              <CardHeroi key={heroi.id} heroi={heroi} />
            ))}
          </section>
        </>
      )}
    </main>
  );
}
