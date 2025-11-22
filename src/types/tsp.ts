export interface TSPConfig {
  populationSize: number;
  crossoverRate: number;
  mutationRate: number;
  maxGenerations: number;
  elitismCount: number;
  crossoverPoint1?: number;
  crossoverPoint2?: number;
  startCityId: string;
}

export interface City {
  id: string;
  name: string;
  x: number;
  y: number;
}

export interface Route {
  cityNames: string[];
  totalDistance: number;
}

export interface GenerationHistory {
  generation: number;
  bestDistance: number;
  averageDistance: number;
  worstDistance: number;
}

export interface TSPResult {
  bestRoute: Route;
  bestDistance: number;
  totalGenerations: number;
  executionTimeMs: number;
  generationHistory: GenerationHistory[];
}

export interface PopulationStats {
  size: number;
  bestDistance: number;
  averageDistance: number;
  worstDistance: number;
  bestRoute: string[];
}

export interface RouteIndividual {
  cityNames: string[];
  totalDistance: number;
  fitness: number;
  cities: City[];
  startCity: City;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
