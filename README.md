# Usabilidade, desenvolvimento web, mobile e jogos · 0006957

Código das aulas da parte Web, 2026/2. Cada pasta corresponde a um encontro, e as páginas são numeradas na ordem em que foram construídas em sala.

Os encontros 6 e 7 rodam direto no navegador, sem instalar nada, com uma exceção anotada mais abaixo. Os encontros 8, 9 e 10 usam React e precisam do Node.js.

Páginas no ar: https://maikecristian11.github.io/dev-web-20262/

## Encontro 6 · JavaScript na interface

Pasta `encontro-06-javascript`. O painel de super-heróis nasce de um array escrito no próprio arquivo.

| Arquivo | O que mostra |
|---|---|
| `v1-sem-script.html` | A página sem JavaScript. Três heróis escritos à mão no HTML |
| `v2-tipos.html` | Console, tipos e a soma que dá errado quando o número veio como texto |
| `v3-dom.html` | O array vira cards na tela, com `createElement` e `textContent` |
| `v4-eventos.html` | Busca e filtro reagindo a `input` e `change` |
| `v5-inicio.html` | Cadastro sem validação nenhuma: aceita herói sem nome |
| `v5-validacao.html` | O mesmo cadastro com validação, foco no primeiro erro e mensagem anunciada |

Abra o `index.html` da pasta para a lista completa.

## Encontro 7 · Listas, assíncrono e API

Pasta `encontro-07-api`. Os mesmos cards, agora com os dados vindos de fora.

| Arquivo | O que mostra |
|---|---|
| `v6-inicio.html` | Ponto de partida: sabe desenhar os cards, não sabe buscar os dados |
| `v6-fetch.html` | `fetch`, `await`, `resposta.ok` e `try/catch` |
| `v7-estados.html` | Carregando, sucesso, vazio e erro, com botões que forçam cada estado |

As versões 1 a 5 estão repetidas nesta pasta, para que ela funcione sozinha.

## Encontro 8 · React e Vite

Pasta `encontro-08-react`. O painel volta com componentes React, em cinco etapas. Cada etapa é um projeto separado.

| Pasta | O que mostra |
|---|---|
| `01-card-fixo` | Um componente funcional com JSX e dados escritos à mão |
| `02-componente-separado` | O card vai para o próprio arquivo, com `import` e `export` |
| `03-props` | O mesmo componente reutilizado com dados diferentes |
| `04-lista-map` | Os cards saem de um array com `map`, e cada um recebe uma `key` |
| `05-usabilidade` | CSS Grid, tela pequena, legibilidade e semântica |

O desafio da aula e o passo a passo para rodar estão no README da pasta. Estas páginas não aparecem no endereço publicado: precisam ser rodadas na sua máquina.

## Encontro 9 · Estado, eventos e dados

Pasta `encontro-09-react-estado`. O painel passa a reagir ao usuário e aos dados.

| Pasta | O que mostra |
|---|---|
| `01-sem-estado` | O problema: a variável muda no console, a tela não |
| `02-usestate` | Uma linha de diferença, e a tela passa a acompanhar |
| `03-eventos-busca` | `onChange`, `onClick`, campo controlado e estado derivado |
| `04-useeffect-fetch` | `useEffect`, lista de dependências e o `fetch` do encontro 7 |
| `05-quatro-estados` | Carregando, sucesso, vazio e erro por renderização condicional |

Vale abrir o `encontro-07-api/v7-estados.js` ao lado do `05-quatro-estados/src/App.jsx`: as duas telas fazem a mesma coisa. O desafio da aula e o passo a passo para rodar estão no README da pasta. Estas páginas não aparecem no endereço publicado: precisam ser rodadas na sua máquina.

## Encontro 10 · Escrevendo na API

Pasta `encontro-10-escrita-api`. A tela deixa de só ler e passa a cadastrar, editar e excluir.

| Pasta | O que mostra |
|---|---|
| `01-cors` | O erro que não diz o nome, e por que o Postman funciona |
| `02-post-cadastro` | `POST`, cabeçalho, corpo em JSON e o 400 com erros por campo |
| `03-put-edicao` | `PUT`, e o mesmo formulário servindo para cadastrar e editar |
| `04-delete-confirmacao` | `DELETE`, o 204 sem corpo e a confirmação antes de excluir |
| `05-completo` | Tudo junto, com as chamadas separadas em `src/api.js` |

A pasta `servidor` traz uma API local que faz o papel de uma API Spring Boot: mesmos métodos, mesmos códigos de resposta e CORS que liga e desliga. Não tem dependência nenhuma.

```
cd encontro-10-escrita-api/servidor
node api.js          # CORS desligado, para a etapa 1
node api.js --cors   # CORS ligado, para as etapas 2 a 5
```

Sobe em `http://localhost:3001` com `GET`, `POST`, `PUT` e `DELETE` em `/herois`. Os dados ficam na memória: reiniciar devolve a lista original.

O passo a passo para rodar está no README da pasta. Estas páginas não aparecem no endereço publicado: dependem da API local rodando na sua máquina.

## As APIs usadas

**Super-heróis**, a mesma base do aplicativo Android das terças:

```
https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json
https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/70.json
```

**ViaCEP**, usada na atividade do encontro 7:

```
https://viacep.com.br/ws/80010010/json/
```

A pasta `postman` traz as coleções prontas, incluindo os casos de erro. No Postman, use Import e selecione o arquivo.

| Arquivo | Para quê |
|---|---|
| `0006957-encontro-7.postman_collection.json` | Seis requisições às APIs de super-heróis e ViaCEP |
| `0006957-encontro-10.postman_collection.json` | Oito requisições à API local do encontro 10, incluindo o preflight de CORS |

A mesma coleção do encontro 10 está em `bruno/0006957-encontro-10`, para quem usa o Bruno: Open Collection e selecione a pasta.

## Como rodar

Abra o arquivo `.html` no navegador. Duplo clique resolve.

A exceção é usar o arquivo local `dados/herois.json` em vez da API: nesse caso o navegador bloqueia a leitura e a página precisa de um servidor. No VS Code, instale a extensão Live Server e use o botão Go Live. Pelo terminal, dentro da pasta:

```
python -m http.server 8000
```

E abra `http://localhost:8000`.

Nos encontros 8, 9 e 10, instale o Node.js e rode `npm install` e `npm run dev` dentro da pasta da etapa. O README de cada pasta explica os detalhes. No encontro 10, a API local precisa estar rodando em outro terminal antes de abrir a página.

## Sem internet

As imagens dos heróis vêm de uma CDN. Sem conexão, o card aparece com um retângulo cinza e o resto continua funcionando. Para os dados, troque a constante `API` por `./dados/herois.json`, que tem os 563 heróis já enxutos, e rode com servidor local.
