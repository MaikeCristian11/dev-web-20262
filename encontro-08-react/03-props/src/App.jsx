import CardHeroi from './CardHeroi.jsx';

export default function App() {
  return (
    <main className="container">
      <header>
        <span className="tag">ENCONTRO 8</span>
        <h1>Painel de heróis</h1>
        <p>Os mesmos dados, agora com componentes React.</p>
      </header>
      <section className="grid" aria-label="Heróis cadastrados">
        <CardHeroi nome="Batman" editora="DC Comics" poder={47} />
        <CardHeroi nome="Homem de Ferro" editora="Marvel Comics" poder={100} />
      </section>
    </main>
  );
}
