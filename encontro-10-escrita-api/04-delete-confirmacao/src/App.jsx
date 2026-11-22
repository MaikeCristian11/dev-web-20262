import { useState, useEffect } from 'react';
import CardHeroi from './CardHeroi.jsx';

const API = 'http://localhost:3001/herois';

export default function App() {
  const [herois, setHerois] = useState([]);
  const [status, setStatus] = useState('carregando');
  const [aviso, setAviso] = useState(null);
  const [aConfirmar, setAConfirmar] = useState(null);  // herói aguardando confirmação
  const [excluindo, setExcluindo] = useState(null);    // id que está saindo

  useEffect(() => {
    async function carregar() {
      try {
        const resposta = await fetch(API);
        setHerois(await resposta.json());
        setStatus('sucesso');
      } catch {
        setStatus('erro');
      }
    }
    carregar();
  }, []);

  async function excluir(heroi) {
    setExcluindo(heroi.id);
    setAConfirmar(null);
    setAviso(null);

    try {
      const resposta = await fetch(API + '/' + heroi.id, { method: 'DELETE' });

      // 204 quer dizer: deu certo e não tem corpo para ler.
      // Chamar resposta.json() aqui quebraria.
      if (!resposta.ok) throw new Error('O servidor respondeu ' + resposta.status + '.');

      setHerois((atuais) => atuais.filter((h) => h.id !== heroi.id));
      setAviso({ tipo: 'sucesso', texto: heroi.nome + ' foi excluído.' });
    } catch (erro) {
      setAviso({ tipo: 'falha', texto: 'Não consegui excluir. ' + erro.message });
    } finally {
      setExcluindo(null);
    }
  }

  return (
    <main className="container">
      <header>
        <span className="tag">ENCONTRO 10 &middot; ETAPA 4</span>
        <h1>Painel de heróis</h1>
        <p>Excluir é a única ação que não dá para desfazer. Ela pergunta antes.</p>
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

      {status === 'carregando' && (
        <p className="estado" role="status"><span className="spinner" />Buscando heróis...</p>
      )}

      {status === 'erro' && (
        <div className="estado erro" role="alert">
          <strong>Não consegui carregar os heróis.</strong>
          <p>A API local está rodando? Confira o terminal.</p>
        </div>
      )}

      {status === 'sucesso' && (
        <>
          <p className="contador">{herois.length} heróis cadastrados</p>
          <section className="grid" aria-label="Heróis">
            {herois.map((heroi) => (
              <CardHeroi
                key={heroi.id}
                heroi={heroi}
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
