export default function CardHeroi({ nome, editora, poder }) {
  return (
    <article className="card">
      <h2>{nome}</h2>
      <p><strong>Editora:</strong> {editora}</p>
      <p><strong>Poder:</strong> {poder}</p>
    </article>
  );
}
