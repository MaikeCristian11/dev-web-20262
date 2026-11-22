import { useState, useEffect } from 'react';
import CardHeroi from './CardHeroi.jsx';
import FormularioHeroi from './FormularioHeroi.jsx';
import { listar, criar, atualizar, remover } from './api.js';

export default function App() {
  const [herois, setHerois] = useState([]);
  const [status, setStatus] = useState('carregando');
  const [termo, setTermo] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [erros, setErros] = useState({});
  const [aviso, setAviso] = useState(null);
  const [emEdicao, setEmEdicao] = useState(null);
  const [aConfirmar, setAConfirmar] = useState(null);
  const [excluindo, setExcluindo] = useState(null);

  useEffect(() => {
    let cancelado = false;
    async function carregar() {
      try {
        const lista = await listar();
        if (cancelado) return;
        setHerois(lista);
        setStatus('sucesso');
      } catch {
        if (!cancelado) setStatus('erro');
      }
    }
    carregar();
    return () => { cancelado = true; };
  }, []);

  async function salvar(valores) {
    setEnviando(true);
    setErros({});
    setAviso(null);
    const corpo = { ...valores, poder: Number(valores.poder) };

    try {
      if (emEdicao) {
        const salvo = await atualizar(emEdicao.id, corpo);
        setHerois((atuais) => atuais.map((h) => (h.id === salvo.id ? salvo : h)));
        setEmEdicao(null);
        setAviso({ tipo: 'sucesso', texto: salvo.nome + ' foi atualizado.' });
      } else {
        const salvo = await criar(corpo);
        setHerois((atuais) => [salvo, ...atuais]);
        setAviso({ tipo: 'sucesso', texto: salvo.nome + ' foi cadastrado.' });
      }
    } catch (erro) {
      if (erro.erros) {
        setErros(erro.erros);
        setAviso({ tipo: 'falha', texto: 'Confira os campos marcados.' });
      } else {
        setAviso({ tipo: 'falha', texto: 'Não consegui salvar. ' + erro.message });
      }
    } finally {
      setEnviando(false);
    }
  }

  async function excluir(heroi) {
    setExcluindo(heroi.id);
    setAConfirmar(null);
    setAviso(null);
    try {
      await remover(heroi.id);
      setHerois((atuais) => atuais.filter((h) => h.id !== heroi.id));
      if (emEdicao && emEdicao.id === heroi.id) setEmEdicao(null);
      setAviso({ tipo: 'sucesso', texto: heroi.nome + ' foi excluído.' });
    } catch (erro) {
      setAviso({ tipo: 'falha', texto: 'Não consegui excluir. ' + erro.message });
    } finally {
      setExcluindo(null);
    }
  }

  const visiveis = herois.filter((h) =>
    h.nome.toLowerCase().includes(termo.trim().toLowerCase())
  );

  return (
    <main className="container">
      <header>
        <span className="tag">ENCONTRO 10 &middot; ETAPA 5</span>
        <h1>Painel de heróis</h1>
        <p>Listar, cadastrar, editar e excluir. O mesmo que a A3 pede.</p>
      </header>

      {aviso && (
        <p className={'aviso ' + aviso.tipo} role={aviso.tipo === 'falha' ? 'alert' : 'status'}>
          {aviso.texto}
        </p>
      )}

      {aConfirmar && (
        <div className="confirmacao" role="alertdialog" aria-label="Confirmar exclusão">
          <p>Excluir {aConfirmar.nome} de vez? Isso não tem volta.</p>
          <div className="acoes">
            <button type="button" className="perigo" onClick={() => excluir(aConfirmar)}>
              Sim, excluir
            </button>
            <button type="button" className="secundario" onClick={() => setAConfirmar(null)}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      <FormularioHeroi
        emEdicao={emEdicao}
        enviando={enviando}
        erros={erros}
        aoEnviar={salvar}
        aoCancelar={() => setEmEdicao(null)}
      />

      <div className="controles">
        <div className="campo">
          <label htmlFor="busca">Buscar por nome</label>
          <input
            id="busca"
            type="search"
            value={termo}
            disabled={status !== 'sucesso'}
            onChange={(e) => setTermo(e.target.value)}
            placeholder="Batman, Flash, Hulk..."
          />
        </div>
      </div>

      {status === 'carregando' && (
        <p className="estado" role="status"><span className="spinner" />Buscando heróis...</p>
      )}

      {status === 'erro' && (
        <div className="estado erro" role="alert">
          <strong>Não consegui carregar os heróis.</strong>
          <p>A API local está rodando? Confira o terminal.</p>
        </div>
      )}

      {status === 'sucesso' && visiveis.length === 0 && (
        <p className="estado vazio" role="status">
          Nenhum herói por aqui. Tente outro nome ou cadastre um novo.
        </p>
      )}

      {status === 'sucesso' && visiveis.length > 0 && (
        <>
          <p className="contador">{visiveis.length} de {herois.length} heróis</p>
          <section className="grid" aria-label="Heróis">
            {visiveis.map((heroi) => (
              <CardHeroi
                key={heroi.id}
                heroi={heroi}
                aoEditar={(h) => { setErros({}); setEmEdicao(h); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                aoExcluir={setAConfirmar}
                saindo={excluindo === heroi.id}
              />
            ))}
          </section>
        </>
      )}
    </main>
  );
}
