# Relatório Técnico-Acadêmico — Case de Práticas de Programação

## Identificação

- **Aluno:** Jorgyvan Lima  
- **Instituição:** Faculdade Gran  
- **Curso:** Bacharelado em Sistemas de Informação  
- **Disciplina:** Práticas de Programação  
- **Ano:** 2026

---

## Resumo

Este documento apresenta a análise, implementação e validação de uma solução web para alternância de temas visuais (modo claro e modo escuro), conforme os requisitos do case da disciplina Práticas de Programação. A proposta prioriza separação de responsabilidades entre HTML (estrutura), CSS (estilo) e JavaScript (comportamento), além de critérios de acessibilidade, experiência do usuário e manutenibilidade. A solução adota variáveis CSS para centralização de tokens visuais, persistência de preferência por meio de `localStorage` e compatibilidade com preferência nativa do sistema operacional via `prefers-color-scheme`.

---

## 1. Introdução

A alternância entre temas claro e escuro tornou-se uma prática amplamente adotada em aplicações web contemporâneas, por contribuir com legibilidade, conforto visual e personalização da experiência do usuário. No contexto acadêmico, esse tipo de implementação é relevante por envolver conceitos fundamentais de front-end, como semântica HTML, arquitetura de estilos, manipulação de DOM e boas práticas de acessibilidade.

Este relatório documenta o processo de desenvolvimento da solução, com foco nos critérios técnicos e pedagógicos solicitados no case.

---

## 2. Objetivos

### 2.1 Objetivo geral

Implementar uma interface web com alternância funcional entre modo claro e modo escuro, atendendo aos requisitos do case e às boas práticas modernas de desenvolvimento front-end.

### 2.2 Objetivos específicos

1. Estruturar a página com HTML semântico e componentes claros.
2. Implementar estratégia de temas usando CSS Custom Properties.
3. Desenvolver lógica JavaScript para alternância, persistência e sincronização com o sistema.
4. Garantir acessibilidade básica no componente de alternância.
5. Documentar tecnicamente a solução, incluindo código-fonte completo.

---

## 3. Metodologia de desenvolvimento

A implementação foi conduzida de forma incremental, com validações sucessivas:

1. Definição da estrutura base em HTML.
2. Aplicação do tema claro como padrão no CSS.
3. Inclusão do tema escuro por sobrescrita seletiva de variáveis.
4. Desenvolvimento da lógica JavaScript para alternância e persistência.
5. Testes manuais de comportamento, acessibilidade e consistência visual.

Essa estratégia minimiza regressões e facilita a depuração em cada etapa.

---

## 4. Arquitetura da solução

### 4.1 Camada HTML (estrutura)

A camada HTML define os elementos semânticos da página, incluindo:

- cabeçalho com identificação acadêmica;
- botão de alternância de tema;
- seções de conteúdo com objetivo e critérios atendidos;
- rodapé institucional.

Não há regras de estilo embutidas e não há lógica de negócio no HTML, preservando a separação de responsabilidades.

### 4.2 Camada CSS (apresentação)

A camada CSS utiliza variáveis em `:root` para representar tokens de design (cores, bordas, sombra, etc.).

- **Tema claro:** definido em `:root`.
- **Tema escuro:** definido em `:root[data-theme="dark"]`.

Com isso, o tema é alterado com uma única mudança de atributo no elemento raiz, sem duplicar regras de componentes.

### 4.3 Camada JavaScript (comportamento)

A camada JavaScript é responsável por:

1. Determinar o tema inicial (preferência salva ou sistema).
2. Aplicar o tema no atributo `data-theme` do `<html>`.
3. Atualizar estado acessível do botão (`aria-pressed`, rótulo e título).
4. Persistir escolha em `localStorage`.
5. Reagir a mudanças do sistema quando não houver preferência fixa do usuário.

---

## 5. Avaliação técnica da solução

### 5.1 Conformidade com o case

A solução atende integralmente aos três eixos solicitados:

- estratégia de CSS para temas;
- lógica de alternância em JavaScript;
- justificativa técnica da separação entre HTML, CSS e JS.

### 5.2 Acessibilidade

Foram adotadas práticas essenciais:

- uso de `<button>` semântico;
- atributo `aria-pressed` sincronizado ao estado;
- foco visível com `:focus-visible`;
- atualização textual do controle de alternância;
- atenção a contraste com `prefers-contrast: more`.

### 5.3 Manutenibilidade

A estratégia baseada em variáveis CSS reduz acoplamento visual e facilita evolução futura (novas paletas, ajustes de contraste e expansão para temas adicionais).

### 5.4 Performance e UX

A solução utiliza JavaScript mínimo e sem dependências externas. Um script inicial no `<head>` reduz flash de tema incorreto na abertura da página, melhorando a percepção de qualidade.

---

## 6. Resultados

A aplicação final apresenta:

- alternância funcional entre claro/escuro;
- persistência de preferência entre recarregamentos;
- compatibilidade com tema nativo do sistema;
- interface consistente em diferentes tamanhos de tela;
- organização de código adequada para ensino e manutenção.

---

## 7. Conclusão

A implementação proposta cumpre os requisitos acadêmicos e técnicos do case, demonstrando domínio de fundamentos de desenvolvimento front-end e boas práticas de engenharia de software em interfaces web. A solução é simples, robusta, acessível e extensível, sendo adequada tanto para avaliação da disciplina quanto para uso pedagógico em monitoria.

---

## 8. Referências

- MDN Web Docs — CSS Custom Properties: https://developer.mozilla.org/docs/Web/CSS/Using_CSS_custom_properties  
- MDN Web Docs — prefers-color-scheme: https://developer.mozilla.org/docs/Web/CSS/@media/prefers-color-scheme  
- MDN Web Docs — ARIA: aria-pressed: https://developer.mozilla.org/docs/Web/Accessibility/ARIA/Attributes/aria-pressed

---

## Apêndice A — Código-fonte completo

### A.1 `index.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Case de Práticas de Programação: alternância de tema claro/escuro com acessibilidade e persistência." />
    <title>Case | Alternância de Tema</title>

    <script>
      (function () {
        var STORAGE_KEY = 'pp_theme';
        var root = document.documentElement;
        var preferred = null;

        try {
          preferred = localStorage.getItem(STORAGE_KEY);
        } catch (_) {
          preferred = null;
        }

        var valid = preferred === 'dark' || preferred === 'light';
        var theme = valid
          ? preferred
          : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

        root.setAttribute('data-theme', theme);
      })();
    </script>

    <link rel="stylesheet" href="assets/styles.css" />
  </head>
  <body>
    <header class="container header">
      <div>
        <h1 class="title">Práticas de Programação — Case Tema Claro/Escuro</h1>
        <p class="author-info">
          Aluno: <strong>Jorgyvan Lima</strong> • Faculdade Gran • Bacharelado em Sistemas de Informação
        </p>
      </div>

      <button
        id="theme-toggle"
        class="theme-toggle"
        type="button"
        aria-label="Alternar tema"
        aria-pressed="false"
        title="Alternar tema"
      >
        <span class="icon" aria-hidden="true">🌙</span>
        <span class="label">Modo escuro</span>
      </button>
    </header>

    <main class="container" id="conteudo">
      <section class="card" aria-labelledby="objetivo-title">
        <h2 id="objetivo-title">Objetivo do case</h2>
        <p>
          Implementar a alternância entre modo claro e escuro com boa separação de responsabilidades:
          <strong>HTML</strong> para estrutura, <strong>CSS</strong> para apresentação e temas, e <strong>JavaScript</strong>
          para comportamento.
        </p>
      </section>

      <section class="card" aria-labelledby="criterios-title">
        <h2 id="criterios-title">Critérios atendidos</h2>
        <ul>
          <li>Estratégia de tema com variáveis CSS.</li>
          <li>Alternância por atributo único (<code>data-theme</code> no <code>&lt;html&gt;</code>).</li>
          <li>Persistência da escolha com <code>localStorage</code>.</li>
          <li>Respeito à preferência do sistema com <code>prefers-color-scheme</code>.</li>
          <li>Acessibilidade com botão semântico, <code>aria-pressed</code> e foco visível.</li>
        </ul>
        <a class="btn" href="#" aria-disabled="true">Exemplo de botão de ação</a>
      </section>
    </main>

    <footer class="container footer">
      <small>Desenvolvido para o processo seletivo de monitoria — 2026</small>
    </footer>

    <script src="assets/script.js" defer></script>
  </body>
</html>
```

### A.2 `assets/styles.css`

```css
:root {
  --bg: #ffffff;
  --text: #111827;
  --muted: #6b7280;
  --surface: #f3f4f6;
  --card: #ffffff;
  --border: #e5e7eb;
  --primary: #2563eb;
  --primary-contrast: #ffffff;
  --shadow: 0 1px 2px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.1);

  --radius: 12px;
  --space: 16px;
  --transition: 200ms ease;
}

:root[data-theme="dark"] {
  --bg: #0f172a;
  --text: #e5e7eb;
  --muted: #9ca3af;
  --surface: #111827;
  --card: #0b1220;
  --border: #1f2937;
  --primary: #60a5fa;
  --primary-contrast: #0b1220;
  --shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
}

* {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

body {
  margin: 0;
  font: 16px/1.5 system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji";
  color: var(--text);
  background: radial-gradient(1200px 600px at 10% -20%, rgba(99, 102, 241, 0.12), transparent 60%),
    radial-gradient(800px 400px at 100% 0%, rgba(59, 130, 246, 0.1), transparent 50%), var(--bg);
  transition: background-color var(--transition), color var(--transition);
}

.container {
  width: min(960px, calc(100% - 2 * var(--space)));
  margin-inline: auto;
}

.header,
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 24px 0;
}

.title {
  font-size: 1.25rem;
  margin: 0;
}

.author-info {
  margin: 6px 0 0;
  color: var(--muted);
  font-size: 0.95rem;
}

.footer {
  color: var(--muted);
}

.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: clamp(16px, 3vw, 28px);
  margin: 0 0 20px 0;
  box-shadow: var(--shadow);
}

.card h2 {
  margin-top: 0;
}

.btn {
  display: inline-block;
  background: var(--primary);
  color: var(--primary-contrast);
  text-decoration: none;
  padding: 10px 16px;
  border-radius: 10px;
  box-shadow: var(--shadow);
  transition: transform var(--transition), filter var(--transition);
}

.btn:hover {
  transform: translateY(-1px);
  filter: brightness(1.05);
}

.btn:active {
  transform: translateY(0);
}

.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  cursor: pointer;
  box-shadow: var(--shadow);
  transition: background-color var(--transition), color var(--transition), border-color var(--transition);
}

.theme-toggle .icon {
  font-size: 1.1rem;
}

.theme-toggle .label {
  font-size: 0.95rem;
}

.theme-toggle:focus-visible {
  outline: 3px solid #93c5fd;
  outline-offset: 2px;
}

@media (prefers-contrast: more) {
  .theme-toggle {
    border-width: 2px;
  }
}

@media (max-width: 640px) {
  .header,
  .footer {
    flex-direction: column;
    align-items: flex-start;
  }
}
```

### A.3 `assets/script.js`

```javascript
(function () {
  const STORAGE_KEY = 'pp_theme';
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  const icon = btn.querySelector('.icon');
  const label = btn.querySelector('.label');
  const mq = window.matchMedia('(prefers-color-scheme: dark)');

  function currentTheme() {
    let saved = null;

    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch (_) {
      saved = null;
    }

    if (saved === 'dark' || saved === 'light') return saved;
    return mq.matches ? 'dark' : 'light';
  }

  function apply(theme) {
    const isDark = theme === 'dark';

    root.setAttribute('data-theme', theme);
    btn.setAttribute('aria-pressed', String(isDark));

    icon.textContent = isDark ? '🌞' : '🌙';
    label.textContent = isDark ? 'Modo claro' : 'Modo escuro';
    btn.title = isDark ? 'Alternar para modo claro' : 'Alternar para modo escuro';
  }

  function save(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (_) {
      // Ignora em ambientes bloqueados (modo privado, políticas, etc.)
    }
  }

  apply(currentTheme());

  btn.addEventListener('click', function () {
    const newTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(newTheme);
    save(newTheme);
  });

  mq.addEventListener('change', function (event) {
    let saved = null;

    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch (_) {
      saved = null;
    }

    if (saved !== 'dark' && saved !== 'light') {
      apply(event.matches ? 'dark' : 'light');
    }
  });
})();
```

---

## Apêndice B — Repositório oficial

- **URL:** https://github.com/jorgyvanlima/desafio-gran-pratica-programacao
