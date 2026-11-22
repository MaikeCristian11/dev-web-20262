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

  async function cadastrar(valores) {
    setEnviando(true);
    setErros({});
    setAviso(null);

    try {
      // Ler é só a URL. Escrever precisa de três coisas a mais:
      // o método, o cabeçalho dizendo o formato, e o corpo em JSON.
      const resposta = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...valores, poder: Number(valores.poder) }),
      });

      // 400 é resposta: o fetch não lança erro. Quem confere é você.
      if (resposta.status === 400) {
        const corpo = await resposta.json();
        setErros(corpo.erros || {});
        setAviso({ tipo: 'falha', texto: 'Confira os campos marcados.' });
        return;
      }

      if (!resposta.ok) throw new Error('O servidor respondeu ' + resposta.status + '.');

      // 201 devolve o registro criado, já com o id que o servidor deu.
      const criado = await resposta.json();
      setHerois((atuais) => [criado, ...atuais]);
      setAviso({ tipo: 'sucesso', texto: criado.nome + ' foi cadastrado.' });
    } catch (erro) {
      setAviso({ tipo: 'falha', texto: 'Não consegui salvar. ' + erro.message });
    } finally {
      // finally roda dando certo ou dando errado: o botão sempre volta.
      setEnviando(false);
    }
  }

  return (
    <main className="container">
      <header>
        <span className="tag">ENCONTRO 10 &middot; ETAPA 2</span>
        <h1>Painel de heróis</h1>
        <p>A tela deixa de só ler e passa a escrever.</p>
      </header>

      {aviso && (
        <p className={'aviso ' + aviso.tipo} role={aviso.tipo === 'falha' ? 'alert' : 'status'}>
          {aviso.texto}
        </p>
      )}

      <FormularioHeroi enviando={enviando} erros={erros} aoEnviar={cadastrar} />

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
            {herois.map((heroi) => <CardHeroi key={heroi.id} heroi={heroi} />)}
          </section>
        </>
      )}
    </main>
  );
}
