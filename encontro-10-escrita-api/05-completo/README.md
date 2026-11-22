# Etapa 5 — O painel completo

Suba a API com CORS. Depois `npm install` e `npm run dev`.

Tudo junto: listar, buscar, cadastrar, editar e excluir, com os quatro estados e aviso de resultado em cada operação.

A diferença de organização está no `src/api.js`: toda conversa com o servidor mora ali, e a tela só chama funções com nome de ação. É esse formato que vale levar para a A3.

Este é um projeto independente; não é necessário copiar os arquivos das outras etapas.

## Build e publicação

```
npm run build      # gera a pasta dist
npm run preview    # serve a dist para conferir antes de publicar
```

O `vite.config.js` já tem `base: './'`, que faz o build gerar caminhos relativos — sem isso a página publicada em subdiretório não acha os arquivos.

**O aviso que importa para a A3:** a pasta `dist` publicada no GitHub Pages continua apontando para `http://localhost:3001`. Quem abrir a página não tem essa API rodando, então a tela carrega e não acha dados. Publicar o front só resolve se a API também estiver em um endereço público. Para a entrega da A3, o caminho realista é rodar os dois na máquina durante a apresentação.
