export default function CardHeroi({ heroi }) {
  return (
    <article className="card">
      <img src={heroi.imagem} alt={heroi.nome} loading="lazy" />
      <div className="corpo">
        <h2>{heroi.nome}</h2>
        <p className="real">{heroi.nomeReal}</p>
        <span className="editora">{heroi.editora}</span>
        <p className="stats">
          Poder {heroi.poder} &middot; Combate {heroi.combate} &middot; Velocidade {heroi.velocidade}
        </p>
      </div>
    </article>
  );
}
