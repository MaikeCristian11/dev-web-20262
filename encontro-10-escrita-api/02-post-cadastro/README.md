# Etapa 2 — POST: o formulário que cadastra

Suba a API com CORS: `cd ../servidor && node api.js --cors`. Depois `npm install` e `npm run dev`.

O formulário envia de verdade. Três coisas aparecem aqui pela primeira vez: o `method`, o cabeçalho `Content-Type` e o `body` com `JSON.stringify`.

Para ver o erro de validação do servidor, deixe o nome com uma letra só e o poder em 500. O servidor devolve 400 com a lista de problemas por campo, e o formulário marca cada um.

Este é um projeto independente; não é necessário copiar os arquivos das outras etapas.
