import { useState, useEffect } from 'react';

const VAZIO = { nome: '', nomeReal: '', editora: '', poder: '' };

export default function FormularioHeroi({ emEdicao, enviando, erros, aoEnviar, aoCancelar }) {
  const [valores, setValores] = useState(VAZIO);

  // Quando o pai escolhe um herói para editar, o formulário se preenche.
  // emEdicao vazio volta o formulário para o estado de cadastro.
  useEffect(() => {
    setValores(emEdicao ? { ...emEdicao, poder: String(emEdicao.poder) } : VAZIO);
  }, [emEdicao]);

  function trocar(campo, valor) {
    setValores((atuais) => ({ ...atuais, [campo]: valor }));
  }

  function enviar(evento) {
    evento.preventDefault();      // sem isso a página recarrega
    aoEnviar(valores);
  }

  return (
    <form className="formulario" onSubmit={enviar} noValidate>
      <h2>{emEdicao ? 'Editando ' + emEdicao.nome : 'Cadastrar herói'}</h2>
      <p className="dica">
        {emEdicao
          ? 'Altere o que precisar e salve. O registro é atualizado na API.'
          : 'Os campos são conferidos aqui e conferidos de novo no servidor.'}
      </p>

      <div className="linha">
        <div className="campo">
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            value={valores.nome}
            onChange={(e) => trocar('nome', e.target.value)}
            aria-invalid={Boolean(erros.nome)}
            aria-describedby="erro-nome"
            disabled={enviando}
          />
          <p className="erro-campo" id="erro-nome">{erros.nome || ''}</p>
        </div>

        <div className="campo">
          <label htmlFor="nomeReal">Nome real</label>
          <input
            id="nomeReal"
            value={valores.nomeReal}
            onChange={(e) => trocar('nomeReal', e.target.value)}
            disabled={enviando}
          />
          <p className="erro-campo"> </p>
        </div>
      </div>

      <div className="linha">
        <div className="campo">
          <label htmlFor="editora">Editora</label>
          <select
            id="editora"
            value={valores.editora}
            onChange={(e) => trocar('editora', e.target.value)}
            aria-invalid={Boolean(erros.editora)}
            aria-describedby="erro-editora"
            disabled={enviando}
          >
            <option value="">Escolha</option>
            <option value="DC Comics">DC Comics</option>
            <option value="Marvel Comics">Marvel Comics</option>
          </select>
          <p className="erro-campo" id="erro-editora">{erros.editora || ''}</p>
        </div>

        <div className="campo">
          <label htmlFor="poder">Poder (0 a 100)</label>
          <input
            id="poder"
            type="number"
            min="0"
            max="100"
            value={valores.poder}
            onChange={(e) => trocar('poder', e.target.value)}
            aria-invalid={Boolean(erros.poder)}
            aria-describedby="erro-poder"
            disabled={enviando}
          />
          <p className="erro-campo" id="erro-poder">{erros.poder || ''}</p>
        </div>
      </div>

      <div className="acoes">
        <button type="submit" disabled={enviando}>
          {enviando ? 'Salvando...' : emEdicao ? 'Salvar alterações' : 'Cadastrar'}
        </button>
        {emEdicao && (
          <button type="button" className="secundario" onClick={aoCancelar} disabled={enviando}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
