// Props: informações fornecidas por quem usa o componente.
export default function CardHeroi({ nome, editora, poder }) {
  return (
    <article className="card">
      <h2>{nome}</h2>
      <p>Editora: {editora}</p>
      <p>Poder: {poder}</p>
    </article>
  );
}
