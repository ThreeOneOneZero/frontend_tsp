- Configurar parâmetros do Algoritmo Genético

### Pré-requisitos

- Node.js 18+
- Backend rodando em `http://localhost:8080` ou usando ngrok

### Instalação

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev

# Build para produção
npm run build
```

## Funcionalidades Implementadas

### Configuração do Algoritmo

- Tamanho da População (mín: 100)
- Taxa de Cruzamento (60-80%)
- Taxa de Mutação (0.5-1%)
- Número de Gerações (mín: 20)
- Quantidade de Elitismo
- Seleção de Cidade Inicial (F, G, H, E, K, N, C, L)

### Visualização de Resultados

- **Estatísticas**: Melhor distância, tempo de execução, total de gerações
- **Melhor Rota**: Sequência de cidades formatada
- **Gráfico de Convergência**: 3 linhas (melhor, média, pior) usando Recharts
- **Visualização do Grafo**: SVG interativo com cidades e rotas

## Estrutura do Projeto

```
src/
├── components/
│   └── tsp/
│       ├── GraphVisualization.tsx   # Visualização SVG do grafo
│       └── GraphInfo.tsx             # Modal de informações
├── pages/
│   ├── TSP.tsx                       # Página principal
│   └── TSPResults.tsx                # Exibição de resultados
├── services/
│   └── tspApi.ts                     # Comunicação com backend
├── types/
│   └── tsp.ts                        # Tipos TypeScript
└── i18n/
    ├── pt_BR.ts                      # Traduções PT
    └── en_US.ts                      # Traduções EN
```

## API Backend

**Base URL**: `http://localhost:8080/api`

| Método | Endpoint              | Descrição                   |
| ------ | --------------------- | --------------------------- |
| GET    | `/tsp/config/default` | Buscar configuração padrão  |
| GET    | `/tsp/cities`         | Buscar cidades do grafo     |
| POST   | `/tsp/run`            | Executar algoritmo genético |

Tem outros para teste direto...

## Grafo do Problema

**8 Cidades**: F, G, H, E, K, N, C, L

**Arestas com distâncias**:

- F-N: 30, F-C: 20, F-L: 10, F-G: 55
- N-C: 47, N-K: 60
- C-K: 70, C-E: 10, C-H: 30, C-L: 10
- K-E: 10, K-G: 90, K-H: 73
- E-H: 60, E-G: 40, E-L: 5
- H-G: 80, H-L: 40

## Como Testar

1. Certifique-se que o backend está rodando em `localhost:8080`
2. Execute `npm run dev`
3. Acesse `http://localhost:5173`
4. A tela TSP será exibida automaticamente
5. Ajuste os parâmetros ou use os valores padrão
6. Clique em "Executar Algoritmo"
7. Observe os resultados aparecerem aparecerem
8. Visualizar históricos

```
 Ignorar outras abas adicionais do template base
```

---

## Desenvolvimento

**Trabalho T3 - Grafos**  
Usado template base de frontend react.

---
