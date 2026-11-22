import { useState, useEffect } from 'react';
import CardHeroi from './CardHeroi.jsx';

// Agora a API não é mais pública: é um servidor que roda na sua máquina,
// no lugar da API Spring Boot de cada equipe.
const API = 'http://localhost:3001/herois';

export default function App() {
  const [herois, setHerois] = useState([]);
  const [status, setStatus] = useState('carregando');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    async function carregar() {
      try {
        const resposta = await fetch(API);
        if (!resposta.ok) throw new Error('O servidor respondeu ' + resposta.status + '.');
        setHerois(await resposta.json());
        setStatus('sucesso');
      } catch (erro) {
        // Com o CORS desligado, a mensagem que chega aqui é só
        // "Failed to fetch". O motivo verdadeiro está no console.
        setMensagem(erro.message);
        setStatus('erro');
      }
    }
    carregar();
  }, []);

  return (
    <main className="container">
      <header>
        <span className="tag">ENCONTRO 10 &middot; ETAPA 1</span>
        <h1>Painel de heróis</h1>
        <p>A mesma leitura de sempre, agora contra uma API local.</p>
      </header>

      {status === 'carregando' && (
        <p className="estado" role="status"><span className="spinner" />Buscando heróis...</p>
      )}

      {status === 'erro' && (
        <div className="estado erro" role="alert">
          <strong>Não consegui carregar os heróis.</strong>
          <p>{mensagem} Abra o console: a mensagem de verdade está lá.</p>
        </div>
      )}

      {status === 'sucesso' && (
        <>
          <p className="contador">{herois.length} heróis vindos da API local</p>
          <section className="grid" aria-label="Heróis">
            {herois.map((heroi) => <CardHeroi key={heroi.id} heroi={heroi} />)}
          </section>
        </>
      )}
    </main>
  );
}
