# Usabilidade, desenvolvimento web, mobile e jogos · 0006957

Código das aulas da parte Web, 2026/2. Cada pasta corresponde a um encontro, e as páginas são numeradas na ordem em que foram construídas em sala.

Tudo roda direto no navegador, sem instalar nada, com uma exceção anotada mais abaixo.

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

A pasta `postman` traz a coleção com seis requisições prontas, incluindo os casos de erro. No Postman, use Import e selecione o arquivo.

## Como rodar

Abra o arquivo `.html` no navegador. Duplo clique resolve.

A exceção é usar o arquivo local `dados/herois.json` em vez da API: nesse caso o navegador bloqueia a leitura e a página precisa de um servidor. No VS Code, instale a extensão Live Server e use o botão Go Live. Pelo terminal, dentro da pasta:

```
python -m http.server 8000
```

E abra `http://localhost:8000`.

## Sem internet

As imagens dos heróis vêm de uma CDN. Sem conexão, o card aparece com um retângulo cinza e o resto continua funcionando. Para os dados, troque a constante `API` por `./dados/herois.json`, que tem os 563 heróis já enxutos, e rode com servidor local.
