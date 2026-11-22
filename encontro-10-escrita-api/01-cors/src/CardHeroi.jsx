export default function CardHeroi({ heroi }) {
  return (
    <article className="card">
      {heroi.imagem
        ? <img src={heroi.imagem} alt={heroi.nome} loading="lazy" />
        : <div className="sem-imagem" aria-hidden="true">{heroi.nome.charAt(0)}</div>}
      <div className="corpo">
        <h2>{heroi.nome}</h2>
        <p className="real">{heroi.nomeReal}</p>
        <span className="editora">{heroi.editora}</span>
        <p className="stats">Poder {heroi.poder}</p>
      </div>
    </article>
  );
}
