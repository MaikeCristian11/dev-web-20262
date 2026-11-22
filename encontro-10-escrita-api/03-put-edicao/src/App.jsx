import { useState, useEffect } from 'react';
import CardHeroi from './CardHeroi.jsx';
import FormularioHeroi from './FormularioHeroi.jsx';

const API = 'http://localhost:3001/herois';

export default function App() {
  const [herois, setHerois] = useState([]);
  const [status, setStatus] = useState('carregando');
  const [enviando, setEnviando] = useState(false);
  const [erros, setErros] = useState({});
  const [aviso, setAviso] = useState(null);
  const [emEdicao, setEmEdicao] = useState(null);   // null = cadastrando

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

  // Cadastrar e editar mudam em duas coisas: o método e a URL.
  // O resto do caminho é o mesmo, então é uma função só.
  async function salvar(valores) {
    setEnviando(true);
    setErros({});
    setAviso(null);

    const editando = Boolean(emEdicao);
    const url = editando ? API + '/' + emEdicao.id : API;
    const metodo = editando ? 'PUT' : 'POST';

    try {
      const resposta = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...valores, poder: Number(valores.poder) }),
      });

      if (resposta.status === 400) {
        const corpo = await resposta.json();
        setErros(corpo.erros || {});
        setAviso({ tipo: 'falha', texto: 'Confira os campos marcados.' });
        return;
      }
      if (!resposta.ok) throw new Error('O servidor respondeu ' + resposta.status + '.');

      const salvo = await resposta.json();

      if (editando) {
        // Troca só o item alterado, montando uma lista nova.
        setHerois((atuais) => atuais.map((h) => (h.id === salvo.id ? salvo : h)));
        setEmEdicao(null);
        setAviso({ tipo: 'sucesso', texto: salvo.nome + ' foi atualizado.' });
      } else {
        setHerois((atuais) => [salvo, ...atuais]);
        setAviso({ tipo: 'sucesso', texto: salvo.nome + ' foi cadastrado.' });
      }
    } catch (erro) {
      setAviso({ tipo: 'falha', texto: 'Não consegui salvar. ' + erro.message });
    } finally {
      setEnviando(false);
    }
  }

  function editar(heroi) {
    setErros({});
    setAviso(null);
    setEmEdicao(heroi);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <main className="container">
      <header>
        <span className="tag">ENCONTRO 10 &middot; ETAPA 3</span>
        <h1>Painel de heróis</h1>
        <p>O mesmo formulário serve para cadastrar e para editar.</p>
      </header>

      {aviso && (
        <p className={'aviso ' + aviso.tipo} role={aviso.tipo === 'falha' ? 'alert' : 'status'}>
          {aviso.texto}
        </p>
      )}

      <FormularioHeroi
        emEdicao={emEdicao}
        enviando={enviando}
        erros={erros}
        aoEnviar={salvar}
        aoCancelar={() => setEmEdicao(null)}
      />

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
              <CardHeroi key={heroi.id} heroi={heroi} aoEditar={editar} />
            ))}
          </section>
        </>
      )}
    </main>
  );
}
