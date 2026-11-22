# Encontro 10 · Escrevendo na API

O painel deixa de só ler e passa a cadastrar, editar e excluir. São cinco etapas, cada uma um projeto completo e independente, mais a pasta `servidor` com a API local. Compare uma pasta com a seguinte para ver o que mudou.

| Pasta | O que mostra |
|---|---|
| `01-cors` | O erro que não diz o nome, e por que o Postman funciona |
| `02-post-cadastro` | `POST`, cabeçalho, corpo em JSON e o 400 com erros por campo |
| `03-put-edicao` | `PUT`, e o mesmo formulário servindo para cadastrar e editar |
| `04-delete-confirmacao` | `DELETE`, o 204 sem corpo e a confirmação antes de excluir |
| `05-completo` | Tudo junto, com as chamadas separadas em `src/api.js` |
| `servidor` | API local que faz o papel de uma API Spring Boot |

## A API local

A pasta `servidor` imita a API Spring Boot de cada equipe: mesmos métodos, mesmos códigos de resposta e CORS que liga e desliga. Não tem dependência nenhuma, basta o Node.js.

```
cd servidor
node api.js          # CORS desligado, para a etapa 1
node api.js --cors   # CORS ligado, para as etapas 2 a 5
```

Sobe em `http://localhost:3001` com `GET`, `POST`, `PUT` e `DELETE` em `/herois`. Os dados ficam na memória: reiniciar devolve a lista original.

As requisições prontas para testar a API sem a tela estão na raiz do repositório: `postman/0006957-encontro-10.postman_collection.json` para o Postman e `bruno/0006957-encontro-10` para o Bruno. O Postman não aplica a regra de CORS, então elas funcionam mesmo sem `--cors`.

## Como rodar

Aqui o duplo clique no `index.html` não funciona. O React precisa do Node.js, que pode ser baixado em [nodejs.org](https://nodejs.org) (versão LTS).

São dois terminais. No primeiro, a API local, como mostrado acima. No segundo, dentro da pasta da etapa:

```
npm install
npm run dev
```

E abra o endereço que aparecer no terminal, normalmente `http://localhost:5173`.

O `npm install` é necessário uma vez por pasta. Para trocar de etapa, pare com `Ctrl+C`, entre na outra pasta e rode `npm run dev` de novo. A API pode continuar rodando entre uma etapa e outra.

## Publicação

O README da etapa 5 mostra como gerar o build. A página publicada continua apontando para `http://localhost:3001`, então só funciona se a API também estiver em um endereço público. Por isso estas páginas não aparecem no GitHub Pages.
