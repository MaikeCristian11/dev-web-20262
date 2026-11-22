export default function CardHeroi({ heroi, aoEditar, aoExcluir, saindo }) {
  return (
    <article className={saindo ? 'card saindo' : 'card'}>
      {heroi.imagem
        ? <img src={heroi.imagem} alt={heroi.nome} loading="lazy" />
        : <div className="sem-imagem" aria-hidden="true">{heroi.nome.charAt(0)}</div>}
      <div className="corpo">
        <h2>{heroi.nome}</h2>
        <p className="real">{heroi.nomeReal}</p>
        <span className="editora">{heroi.editora}</span>
        <p className="stats">Poder {heroi.poder}</p>

        <div className="botoes">
          {aoEditar && (
            <button type="button" className="secundario" onClick={() => aoEditar(heroi)}>
              Editar
            </button>
          )}
          {aoExcluir && (
            <button type="button" className="perigo" onClick={() => aoExcluir(heroi)} disabled={saindo}>
              {saindo ? 'Excluindo...' : 'Excluir'}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
