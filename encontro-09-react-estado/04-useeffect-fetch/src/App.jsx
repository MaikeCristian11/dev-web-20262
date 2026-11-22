import { useState, useEffect } from 'react';
import CardHeroi from './CardHeroi.jsx';

const API = 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json';
// Sem internet, troque a linha acima por:
// const API = '/herois.json';   // copia local, ja simplificada, na pasta public

const LIMITE = 30;

// A API devolve muito mais campos do que a tela usa.
// simplificar mantem so o que o card precisa, como no encontro 7.
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

export default function App() {
  const [herois, setHerois] = useState([]);

  // O array vazio no fim diz: rode este efeito uma vez, quando o
  // componente aparece. Sem ele, cada desenho dispararia outra busca.
  useEffect(() => {
    async function carregar() {
      const resposta = await fetch(API);
      const dados = await resposta.json();
      setHerois(dados.slice(0, LIMITE).map(simplificar));
    }
    carregar();
  }, []);

  return (
    <main className="container">
      <header>
        <span className="tag">ENCONTRO 9 &middot; ETAPA 4</span>
        <h1>Painel de heróis</h1>
        <p>Os dados não estão mais no arquivo. Vêm da API.</p>
      </header>

      <p className="contador">{herois.length} heróis carregados</p>

      <section className="grid" aria-label="Heróis carregados da API">
        {herois.map((heroi) => (
          <CardHeroi key={heroi.id} heroi={heroi} />
        ))}
      </section>
    </main>
  );
}
