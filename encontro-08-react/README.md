# Encontro 8 · React e Vite

O mesmo painel de super-heróis, agora montado com componentes React. São cinco etapas, cada uma um projeto completo e independente. Compare uma pasta com a seguinte para ver o que mudou.

| Pasta | O que mostra |
|---|---|
| `01-card-fixo` | Um componente funcional com JSX e dados escritos à mão |
| `02-componente-separado` | O card vai para o próprio arquivo, com `import` e `export` |
| `03-props` | O mesmo componente reutilizado com dados diferentes |
| `04-lista-map` | Os cards saem de um array com `map`, e cada um recebe uma `key` |
| `05-usabilidade` | CSS Grid, tela pequena, legibilidade e semântica |

Esta versão não usa `useState`, `useEffect` nem API externa. Os dados ficam no próprio `App.jsx`. Buscar da API, como no encontro 7, fica para os próximos encontros.

## Como rodar

Aqui o duplo clique no `index.html` não funciona. O React precisa do Node.js, que pode ser baixado em [nodejs.org](https://nodejs.org) (versão LTS).

Dentro da pasta da etapa:

```
npm install
npm run dev
```

E abra o endereço que aparecer no terminal, normalmente `http://localhost:5173`.

O `npm install` é necessário uma vez por pasta. Para trocar de etapa, pare com `Ctrl+C`, entre na outra pasta e rode `npm run dev` de novo. Se duas etapas estiverem rodando ao mesmo tempo, o Vite usa outra porta para a segunda.

## Desafio

Parta da etapa 5 e:

1. Acrescente dois heróis ao array.
2. Crie a propriedade `universo` e mostre no card.
3. Destaque de forma visível os heróis com `poder >= 90`, sem criar um componente novo.
4. Confira o layout no modo de dispositivo móvel do navegador (F12, ícone de celular).
