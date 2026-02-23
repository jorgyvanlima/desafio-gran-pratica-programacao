# Desafio GRAN — Práticas de Programação

Projeto desenvolvido para o case da monitoria da disciplina **Práticas de Programação**, com foco na implementação de alternância entre **modo claro** e **modo escuro** em uma página web.

## 🎯 Objetivo

Implementar uma solução de tema claro/escuro explicando:

1. A estratégia de CSS para os dois temas.
2. A lógica em JavaScript para alternância de tema.
3. A justificativa da abordagem com separação de responsabilidades entre HTML, CSS e JS.

---

## 🧱 Estrutura do projeto

```text
desafio-gran-pratica-programacao/
├── index.html
├── README.md
└── assets/
    ├── styles.css
    └── script.js
```

---

## 🧠 Estratégia adotada

### 1) CSS para temas (claro e escuro)

A implementação usa **CSS Custom Properties** (variáveis) para representar tokens visuais, como:

- cor de fundo
- cor de texto
- bordas
- sombras
- cor primária

O tema padrão (claro) fica em `:root` e o tema escuro em `:root[data-theme="dark"]`.

Isso permite:

- manter componentes desacoplados de paletas fixas;
- reduzir duplicação de regras;
- facilitar manutenção e evolução do design.

### 2) JavaScript para alternância

O JavaScript atua apenas no comportamento:

- alterna o atributo `data-theme` no elemento `<html>`;
- persiste a preferência em `localStorage`;
- respeita a preferência inicial do sistema com `prefers-color-scheme`;
- atualiza feedback acessível (`aria-pressed`, rótulo textual e `title`).

### 3) Evitar FOUC (Flash of Unstyled Content)

Um script curto no `<head>` define o tema **antes** do CSS ser processado, evitando “piscadas” de tema errado na carga inicial.

---

## ♿ Acessibilidade aplicada

- uso de botão semântico (`<button>`);
- atributo `aria-pressed` refletindo estado ligado/desligado;
- texto de apoio no botão para leitores de tela;
- estilo de foco visível com `:focus-visible`;
- suporte básico a `prefers-contrast: more`.

---

## ✅ Separação de responsabilidades

- **HTML**: estrutura semântica da interface;
- **CSS**: aparência visual e definição dos temas;
- **JavaScript**: comportamento de alternância e persistência.

Essa separação melhora legibilidade, testabilidade e manutenção.

---

## 🚀 Como executar localmente

Não há dependências nem etapa de build.

1. Abra o arquivo `index.html` em um navegador moderno.
2. Clique no botão de tema para alternar entre claro e escuro.

---

## 🔍 Como validar a solução

Checklist rápido:

- [x] Alternância de tema funciona ao clicar no botão.
- [x] Estado do botão (`aria-pressed`) atualiza corretamente.
- [x] Preferência persiste após recarregar a página.
- [x] Sem preferência salva, respeita o tema do sistema.
- [x] Não há “flash” de tema incorreto no carregamento inicial.

---

## 📝 Mensagem de commit sugerida

`feat: implementar alternância claro/escuro com CSS variables, persistência e acessibilidade`

---

## 📌 Observações finais

A abordagem prioriza simplicidade, robustez e clareza arquitetural, atendendo diretamente aos critérios do case: estratégia de CSS, lógica em JS e justificativa técnica da separação entre estrutura, estilo e comportamento.
