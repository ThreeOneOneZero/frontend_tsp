# ⚛️ Frontend React Template — PURPOSE

## O Que Este Template Contém

- React 18 com TypeScript
- Vite como build tool (rápido!)
- Estrutura de pastas (components, pages, services, hooks, types, styles)
- Padrão de resposta HTTP esperado (sucesso e erro)
- API client centralizado
- Exemplo mínimo: componente health check, fetch hook
- `package.json` com dependências essenciais
- `.env.example` com variáveis documentadas

## Filosofia Pessoal (React)

### Componentes Funcionais e Hooks

Sempre componentes funcionais:

```typescript
// ✅ Bom
function UserCard({ user, onDelete }: UserCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteUser(user.id);
    } finally {
      setIsDeleting(false);
    }
  };

  return <div>...</div>;
}
```

### Props Tipadas Sempre

```typescript
interface UserCardProps {
  user: User;
  onDelete?: (id: string) => void;
}

function UserCard({ user, onDelete }: UserCardProps) {
  /* ... */
}
```

### Lógica em Hooks Customizados

```typescript
// ✅ Bom
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // lógica aqui
  }, [url]);

  return { data, loading, error };
}

// Uso
function UsersList() {
  const { data: users } = useFetch<User[]>("/api/users");
  return (
    <div>
      {users?.map((u) => (
        <UserCard key={u.id} user={u} />
      ))}
    </div>
  );
}
```

### API Client Centralizado

```typescript
// services/api-client.ts
class ApiClient {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url);
    const json = await response.json();

    if (!json.success) {
      throw new Error(json.error?.message);
    }

    return json.data;
  }
}

export const apiClient = new ApiClient();
```

### Estado Simples

Para estado simples: `useState`  
Para estado complexo: `useReducer` ou Context  
Para estado global: Context API ou Zustand

## Como Este Template Evolui

### Agora

- ✅ Estrutura base com React + Vite
- ✅ API client
- ✅ Custom hooks pattern

### Próxima Iteração

- [ ] Roteamento (React Router)
- [ ] Testes (Vitest, React Testing Library)
- [ ] Tailwind CSS para styling
- [ ] Formulários (React Hook Form)

### Futuro

- [ ] Estado global (Redux/Zustand)
- [ ] Storybook para documentação
- [ ] E2E testes (Playwright)
- [ ] PWA features
- [ ] Internacionalização (i18n)

## Boas Práticas Específicas

### Nomeação

- Componentes: `PascalCase` → `UserCard.tsx`
- Hooks: `camelCase` com `use` → `useFetch.ts`
- Funções: `camelCase` → `formatDate`
- Constantes: `UPPER_SNAKE_CASE` → `MAX_RETRIES`

### Pastas

- `src/components/` — componentes reutilizáveis (Button, Input, Card)
- `src/pages/` — páginas completas (HomePage, UserPage)
- `src/services/` — API client, chamadas HTTP
- `src/hooks/` — custom React hooks
- `src/types/` — tipos TypeScript compartilhados
- `src/styles/` — CSS global e tailwind config

### Estrutura de Componente

```typescript
import { ReactNode } from "react";
import styles from "./Button.module.css"; // ou tailwind

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

export function Button({
  children,
  onClick,
  variant = "primary",
}: ButtonProps) {
  return (
    <button onClick={onClick} className={styles[variant]}>
      {children}
    </button>
  );
}
```

### Handling de Dados

```typescript
function UsersList() {
  const { data: users, loading, error } = useFetch<User[]>("/api/users");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!users) return <p>No users found</p>;

  return (
    <div>
      {users.map((u) => (
        <UserCard key={u.id} user={u} />
      ))}
    </div>
  );
}
```

## Stack Padrão

- **React 18+**
- **TypeScript 5+**
- **Vite 4+**
- **Node.js 18+**

## Checklist para Começar

- [ ] Rodar `npm install`
- [ ] Copiar `.env.example` para `.env.local`
- [ ] Configurar `VITE_API_BASE_URL` em `.env.local`
- [ ] Rodar `npm run dev`
- [ ] Acessar `http://localhost:5173`
- [ ] Começar a adicionar componentes e páginas

---

**Próximo:** Abra `README.md` para instruções de setup.
