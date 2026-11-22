# Etapa 4 — DELETE: excluir com confirmação

Suba a API com CORS. Depois `npm install` e `npm run dev`.

Excluir é a única operação sem volta, e por isso pergunta antes. Repare que o DELETE responde 204, sem corpo: chamar `resposta.json()` aqui quebraria a aplicação.

Enquanto a exclusão acontece, o card fica esmaecido e o botão desabilitado, para ninguém clicar duas vezes.

Este é um projeto independente; não é necessário copiar os arquivos das outras etapas.
