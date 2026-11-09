import CardHeroi from './CardHeroi.jsx';

const HEROIS = [
  { id: 1, nome: 'Batman', editora: 'DC Comics', poder: 47 },
  { id: 2, nome: 'Homem de Ferro', editora: 'Marvel Comics', poder: 100 },
  { id: 3, nome: 'Mulher-Maravilha', editora: 'DC Comics', poder: 100 },
];

export default function App() {
  return (
    <main className="container">
      <header>
        <span className="tag">ENCONTRO 8</span>
        <h1>Painel de heróis</h1>
        <p>Os mesmos dados, agora com componentes React.</p>
      </header>
      <section className="grid" aria-label="Heróis cadastrados">
        {HEROIS.map((heroi) => (
          <CardHeroi key={heroi.id} nome={heroi.nome} editora={heroi.editora} poder={heroi.poder} />
        ))}
      </section>
    </main>
  );
}
