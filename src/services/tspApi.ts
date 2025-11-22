import type {
  ApiResponse,
  TSPConfig,
  TSPResult,
  City,
  PopulationStats,
  GenerationHistory,
  RouteIndividual,
} from "../types/tsp";

const API_URL = "https://incipient-elsie-unslung.ngrok-free.dev/api";
// const API_URL = "http://localhost:8080/api";

export const tspApi = {
  /**
   * Busca a configuração padrão do algoritmo genético
   */
  async getDefaultConfig(): Promise<TSPConfig> {
    const response = await fetch(`${API_URL}/tsp/config/default`, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
    if (!response.ok) {
      throw new Error("Erro ao buscar configuração padrão");
    }
    const json: ApiResponse<TSPConfig> = await response.json();
    return json.data;
  },

  /**
   * Busca todas as cidades disponíveis no grafo
   */
  async getCities(): Promise<Record<string, City>> {
    const response = await fetch(`${API_URL}/tsp/cities`, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
    if (!response.ok) {
      throw new Error("Erro ao buscar cidades");
    }
    const json: ApiResponse<Record<string, City>> = await response.json();
    return json.data;
  },

  /**
   * Executa o algoritmo genético com a configuração fornecida
   */
  async runGA(config: TSPConfig): Promise<TSPResult> {
    const response = await fetch(`${API_URL}/tsp/run`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(config),
    });

    if (!response.ok) {
      throw new Error("Erro ao executar algoritmo genético");
    }

    const json: ApiResponse<TSPResult> = await response.json();
    return json.data;
  },

  /**
   * Busca estatísticas da população atual
   */
  async getStats(): Promise<PopulationStats> {
    const response = await fetch(`${API_URL}/tsp/stats`, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
    if (!response.ok) {
      throw new Error("Erro ao buscar estatísticas");
    }
    const json: ApiResponse<PopulationStats> = await response.json();
    return json.data;
  },

  /**
   * Busca histórico de todas as gerações
   */
  async getHistory(): Promise<GenerationHistory[]> {
    const response = await fetch(`${API_URL}/tsp/history`, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
    if (!response.ok) {
      throw new Error("Erro ao buscar histórico");
    }
    const json: ApiResponse<GenerationHistory[]> = await response.json();
    return json.data;
  },

  /**
   * Busca top N melhores rotas da população
   */
  async getTopRoutes(top: number = 10): Promise<RouteIndividual[]> {
    const response = await fetch(`${API_URL}/tsp/population?top=${top}`, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
    if (!response.ok) {
      throw new Error("Erro ao buscar top rotas");
    }
    const json: ApiResponse<RouteIndividual[]> = await response.json();
    return json.data;
  },

  /**
   * Busca a melhor rota atual
   */
  async getBestRoute(): Promise<RouteIndividual> {
    const response = await fetch(`${API_URL}/tsp/best`, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
    if (!response.ok) {
      throw new Error("Erro ao buscar melhor rota");
    }
    const json: ApiResponse<RouteIndividual> = await response.json();
    return json.data;
  },
};
