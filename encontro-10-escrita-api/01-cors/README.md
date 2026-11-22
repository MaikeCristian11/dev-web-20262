# Etapa 1 — O erro que não diz o nome: CORS

**Antes de tudo**, em outro terminal, suba a API local **sem CORS**:

```
cd ../servidor
node api.js
```

Depois, nesta pasta: `npm install` e `npm run dev`.

A tela mostra erro. Abra o console: a mensagem fala em CORS policy, não em rede. Abra a aba Network e veja que a requisição saiu e voltou — o servidor respondeu, quem recusou foi o navegador.

Chame o mesmo endereço no Postman ou no navegador direto: funciona. É essa diferença que confunde todo mundo.

Agora derrube a API e suba de novo **com CORS**:

```
node api.js --cors
```

Recarregue a página. Nada mudou no React.

Este é um projeto independente; não é necessário copiar os arquivos das outras etapas.
