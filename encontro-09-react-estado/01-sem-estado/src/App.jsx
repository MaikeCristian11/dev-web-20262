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

// ATENCAO: termo e uma variavel comum do modulo.
// Ela muda quando digitamos, mas nada avisa o React de que a tela
// precisa ser desenhada de novo. Abra o console e veja a diferenca.
let termo = '';

export default function App() {
  function aoDigitar(evento) {
    termo = evento.target.value;
    console.log('termo agora vale:', termo);
  }

  const visiveis = HEROIS.filter((heroi) =>
    heroi.nome.toLowerCase().includes(termo.toLowerCase())
  );

  return (
    <main className="container">
      <header>
        <span className="tag">ENCONTRO 9 &middot; ETAPA 1</span>
        <h1>Painel de heróis</h1>
        <p>A variável muda no console. A tela continua igual.</p>
      </header>

      <div className="controles">
        <div className="campo">
          <label htmlFor="busca">Buscar por nome</label>
          <input id="busca" type="search" onChange={aoDigitar} placeholder="Digite e veja o console" />
        </div>
      </div>

      <p className="contador">{visiveis.length} de {HEROIS.length} heróis na tela</p>

      <section className="grid" aria-label="Heróis encontrados">
        {visiveis.map((heroi) => (
          <CardHeroi key={heroi.id} heroi={heroi} />
        ))}
      </section>
    </main>
  );
}
