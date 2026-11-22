# Encontro 9 · Estado, eventos e dados

O painel de super-heróis do encontro 8 passa a reagir ao usuário e aos dados. São cinco etapas, cada uma um projeto completo e independente. Compare uma pasta com a seguinte para ver o que mudou.

| Pasta | O que mostra |
|---|---|
| `01-sem-estado` | O problema: a variável muda no console, a tela não |
| `02-usestate` | Uma linha de diferença, e a tela passa a acompanhar |
| `03-eventos-busca` | `onChange`, `onClick`, campo controlado e estado derivado |
| `04-useeffect-fetch` | `useEffect`, lista de dependências e o `fetch` do encontro 7 |
| `05-quatro-estados` | Carregando, sucesso, vazio e erro por renderização condicional |

A progressão é a mesma do encontro 7, de propósito: mesma API, mesmos quatro estados, mesmo painel. O que muda é como a tela é descrita. Vale abrir o `encontro-07-api/v7-estados.js` ao lado do `05-quatro-estados/src/App.jsx`.

## Como rodar

Aqui o duplo clique no `index.html` não funciona. O React precisa do Node.js, que pode ser baixado em [nodejs.org](https://nodejs.org) (versão LTS).

Dentro da pasta da etapa:

```
npm install
npm run dev
```

E abra o endereço que aparecer no terminal, normalmente `http://localhost:5173`.

O `npm install` é necessário uma vez por pasta. Para trocar de etapa, pare com `Ctrl+C`, entre na outra pasta e rode `npm run dev` de novo. Se duas etapas estiverem rodando ao mesmo tempo, o Vite usa outra porta para a segunda.

Sem internet, nas etapas 4 e 5, troque a constante `API` por `'/herois.json'`. A cópia local fica na pasta `public` de cada etapa.

## Desafio

Parta da etapa 5 e:

1. Acrescente um botão de favoritar em cada card.
2. Crie o filtro "só favoritos".
3. Mostre um contador com quantos heróis estão favoritados.
