import { useState } from 'react';
import CardHeroi from './CardHeroi.jsx';

const HEROIS = [
  { id: 70, nome: 'Batman', nomeReal: 'Bruce Wayne', editora: 'DC Comics', poder: 47, combate: 100, velocidade: 27, imagem: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/70-batman.jpg' },
  { id: 346, nome: 'Iron Man', nomeReal: 'Tony Stark', editora: 'Marvel Comics', poder: 100, combate: 64, velocidade: 58, imagem: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/346-iron-man.jpg' },
  { id: 226, nome: 'Doctor Strange', nomeReal: 'Stephen Strange', editora: 'Marvel Comics', poder: 100, combate: 60, velocidade: 12, imagem: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/226-doctor-strange.jpg' },
  { id: 720, nome: 'Wonder Woman', nomeReal: 'Diana Prince', editora: 'DC Comics', poder: 100, combate: 100, velocidade: 79, imagem: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/720-wonder-woman.jpg' },
  { id: 263, nome: 'Flash', nomeReal: 'Jay Garrick', editora: 'DC Comics', poder: 68, combate: 32, velocidade: 100, imagem: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/263-flash.jpg' },
  { id: 620, nome: 'Spider-Man', nomeReal: 'Peter Parker', editora: 'Marvel Comics', poder: 74, combate: 85, velocidade: 67, imagem: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/620-spider-man.jpg' },
  { id: 332, nome: 'Hulk', nomeReal: 'Bruce Banner', editora: 'Marvel Comics', poder: 98, combate: 85, velocidade: 63, imagem: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/332-hulk.jpg' },
  { id: 106, nome: 'Black Panther', nomeReal: 'T\'Challa', editora: 'Marvel Comics', poder: 41, combate: 100, velocidade: 30, imagem: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/106-black-panther.jpg' },
];

const EDITORAS = ['DC Comics', 'Marvel Comics'];

export default function App() {
  // Tres estados independentes, um para cada controle da tela.
  const [termo, setTermo] = useState('');
  const [editora, setEditora] = useState('');
  const [ordenarPorPoder, setOrdenarPorPoder] = useState(false);

  // visiveis NAO e estado: e calculado a cada desenho, a partir do estado.
  // Guardar isso em useState criaria duas verdades sobre a mesma coisa.
  let visiveis = HEROIS.filter((heroi) => {
    const combinaNome = heroi.nome.toLowerCase().includes(termo.trim().toLowerCase());
    const combinaEditora = editora === '' || heroi.editora === editora;
    return combinaNome && combinaEditora;
  });

  if (ordenarPorPoder) {
    // [...visiveis] copia a lista: sort altera o array no lugar
    visiveis = [...visiveis].sort((a, b) => b.poder - a.poder);
  }

  function limpar() {
    setTermo('');
    setEditora('');
    setOrdenarPorPoder(false);
  }

  return (
    <main className="container">
      <header>
        <span className="tag">ENCONTRO 9 &middot; ETAPA 3</span>
        <h1>Painel de heróis</h1>
        <p>Três controles, três estados. O resto é calculado.</p>
      </header>

      <div className="controles">
        <div className="campo">
          <label htmlFor="busca">Buscar por nome</label>
          <input
            id="busca"
            type="search"
            value={termo}
            onChange={(evento) => setTermo(evento.target.value)}
            placeholder="Batman, Flash, Hulk..."
          />
        </div>

        <div className="campo">
          <label htmlFor="editora">Editora</label>
          <select id="editora" value={editora} onChange={(evento) => setEditora(evento.target.value)}>
            <option value="">Todas</option>
            {EDITORAS.map((nome) => (
              <option key={nome} value={nome}>{nome}</option>
            ))}
          </select>
        </div>

        <button type="button" onClick={() => setOrdenarPorPoder(!ordenarPorPoder)}>
          {ordenarPorPoder ? 'Ordem original' : 'Ordenar por poder'}
        </button>

        <button type="button" className="secundario" onClick={limpar}>
          Limpar
        </button>
      </div>

      <p className="contador">{visiveis.length} de {HEROIS.length} heróis na tela</p>

      {visiveis.length === 0 ? (
        <p className="estado vazio" role="status">
          Nenhum herói combina com esses filtros. Tente outro nome ou outra editora.
        </p>
      ) : (
        <section className="grid" aria-label="Heróis encontrados">
          {visiveis.map((heroi) => (
            <CardHeroi key={heroi.id} heroi={heroi} />
          ))}
        </section>
      )}
    </main>
  );
}
