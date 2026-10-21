# Como subir este repositório no GitHub

O repositório `MaikeCristian11/dev-web-20262` já existe e está vazio, que é exatamente o estado necessário. O histórico local também já está pronto, com os commits dos encontros 6 e 7. Falta só apontar o remoto e enviar.

## 1. Enviar

Abra o terminal dentro desta pasta (a que tem o README.md e as pastas dos encontros) e rode:

```
git remote add origin https://github.com/MaikeCristian11/dev-web-20262.git
git branch -M main
git push -u origin main
```

Se o GitHub pedir senha, use um token de acesso pessoal, em Settings, Developer settings, Personal access tokens, Tokens (classic), com o escopo `repo`. A senha da conta não funciona mais para envio.

Se a pasta tiver perdido a pasta `.git` no caminho, rode antes:

```
git init
git add .
git commit -m "Codigos das aulas da parte Web"
```

## 2. Conferir

Abra https://github.com/MaikeCristian11/dev-web-20262 no navegador. O README aparece na página inicial, com a tabela dos dois encontros.

## Se preferir sem terminal

No repositório vazio, use **Add file**, depois **Upload files**, e arraste as duas pastas de encontro mais o README. O histórico dos commits se perde, mas o conteúdo sobe igual.

## 3. Publicar as páginas

Settings, Pages, Build and deployment, origem Deploy from a branch, branch `main`, pasta `/ (root)`, Save. Em um ou dois minutos as páginas ficam no ar:

```
https://maikecristian11.github.io/dev-web-20262/
https://maikecristian11.github.io/dev-web-20262/encontro-06-javascript/
https://maikecristian11.github.io/dev-web-20262/encontro-07-api/
```

Com as páginas publicadas, as versões do encontro 7 rodam sem servidor local: o `fetch` do arquivo `dados/herois.json` passa a funcionar porque tudo vem por https, não por `file://`.

## 4. Deixar a turma contribuir, se for o caminho da A3

Duas opções, dependendo de como você quiser conduzir a evolução até a A3:

- **Fork e pull request**: cada dupla dá fork, trabalha no próprio repositório e abre PR. Você revisa e comenta no PR. Dá mais trabalho de revisão, mas é o fluxo que o mercado usa.
- **Colaboradores no mesmo repositório**: Settings, Collaborators, Add people, cada aluno em uma branch própria. Mais simples de começar, exige combinar que ninguém faz push direto na `main`.

A decisão pode esperar; nada aqui depende dela.
