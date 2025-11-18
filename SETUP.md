# React Template - Padrões Básicos

Estrutura React minimalista com tema, tradução e componentes reutilizáveis.

## 📁 Estrutura de Pastas

```
src/
├── theme/              # Sistema de cores (light/dark)
│   ├── colors.ts       # Cores dos temas
│   └── ThemeProvider.tsx
├── i18n/               # Internacionalização (PT-BR, EN-US)
│   ├── pt_BR.ts
│   ├── en_US.ts
│   └── I18nProvider.tsx
├── components/         # Componentes reutilizáveis
│   ├── Header.tsx
│   ├── Container.tsx
│   ├── Button.tsx
│   └── index.ts        # Exports
├── hooks/              # Custom hooks
│   ├── useFetch.ts     # Para requisições HTTP
│   ├── useLocalStorage.ts
│   └── index.ts
├── pages/              # Páginas da aplicação
│   ├── Home.tsx
│   └── index.ts
├── App.tsx             # Root component
└── main.tsx            # Entry point
```

## 🎨 Tema (Dark/Light)

Use o hook `useTheme()` em qualquer componente:

```tsx
import { useTheme } from "./theme";

function MyComponent() {
  const { theme, toggleTheme, mode } = useTheme();

  return (
    <div style={{ backgroundColor: theme.background, color: theme.text }}>
      <button onClick={toggleTheme}>Tema atual: {mode}</button>
    </div>
  );
}
```

**Cores disponíveis:** `background`, `surface`, `text`, `textSecondary`, `border`, `primary`, `primaryHover`, `secondary`, `success`, `warning`, `error`, `info`

**Persiste em localStorage** - tema é restaurado ao recarregar.

## 🌐 Tradução (i18n)

Use o hook `useI18n()`:

```tsx
import { useI18n } from "./i18n";

function MyComponent() {
  const { translations, language, setLanguage } = useI18n();

  return (
    <div>
      <p>{translations.common.welcome}</p>
      <button
        onClick={() => setLanguage(language === "pt_BR" ? "en_US" : "pt_BR")}
      >
        Idioma: {language}
      </button>
    </div>
  );
}
```

**Idiomas suportados:** `pt_BR`, `en_US`

**Adicionar novo idioma:**

1. Criar arquivo `src/i18n/es_ES.ts` com mesma estrutura
2. Adicionar ao `I18nProvider.tsx` no `getTranslations()`

**Persiste em localStorage**.

## 🧩 Componentes

### Header

Cabeçalho com controles de tema e idioma:

```tsx
<Header />
```

### Container

Wrapper com estilos responsivos:

```tsx
<Container>
  <YourContent />
</Container>
```

### Button

Botão com variantes (primary, secondary, danger):

```tsx
<Button label="Clique aqui" variant="primary" onClick={handleClick} />
```

## 🪝 Custom Hooks

### useFetch

Para requisições HTTP:

```tsx
const { data, loading, error, fetchData } = useFetch<DataType>("/api/endpoint");

// GET
const result = await fetchData();

// POST
const result = await fetchData({ name: "John" });
```

### useLocalStorage

Para persistência de dados:

```tsx
const [value, setValue, removeValue] = useLocalStorage("myKey", defaultValue);

setValue(newValue);
removeValue();
```

## 🚀 Desenvolvimento

```bash
# Iniciar servidor
npm run dev

# Build
npm run build

# Preview
npm run preview

# Lint
npm run lint
```

## 📝 Próximos Passos

- [ ] Adicionar roteamento (React Router)
- [ ] Integrar com API backend
- [ ] Adicionar testes (Vitest/Jest)
- [ ] Setup de CI/CD
