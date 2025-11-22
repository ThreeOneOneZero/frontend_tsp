import React, { useState, useEffect } from "react";
import { tspApi } from "../services/tspApi";
import type { TSPConfig, TSPResult, City } from "../types/tsp";
import { useI18n } from "../i18n";
import { TSPResults } from "./TSPResults";
import { GraphInfo } from "../components/tsp";
import * as Separator from "@radix-ui/react-separator";

export const TSP: React.FC = () => {
  const { translations: t } = useI18n();
  const [config, setConfig] = useState<TSPConfig | null>(null);
  const [cities, setCities] = useState<Record<string, City>>({});
  const [result, setResult] = useState<TSPResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingConfig, setLoadingConfig] = useState(true);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoadingConfig(true);
        const [defaultConfig, citiesData] = await Promise.all([
          tspApi.getDefaultConfig(),
          tspApi.getCities(),
        ]);
        setConfig(defaultConfig);
        setCities(citiesData);
      } catch (err) {
        setError(t.tsp.errors.loadConfig);
        console.error("Erro ao carregar dados iniciais:", err);
      } finally {
        setLoadingConfig(false);
      }
    };

    loadInitialData();
  }, [t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config) return;

    try {
      setLoading(true);
      setError(null);
      const result = await tspApi.runGA(config);
      setResult(result);
    } catch (err) {
      setError(t.tsp.errors.runAlgorithm);
      console.error("Erro ao executar algoritmo:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      const defaultConfig = await tspApi.getDefaultConfig();
      setConfig(defaultConfig);
      setResult(null);
      setError(null);
    } catch (err) {
      setError(t.tsp.errors.loadConfig);
      console.error("Erro ao resetar configuração:", err);
    }
  };

  if (loadingConfig) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            {t.tsp.config.loadingConfig}
          </p>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="text-center text-red-600 dark:text-red-400">
        {error || t.tsp.errors.loadConfig}
      </div>
    );
  }

  const cityOptions = Object.values(cities).map((city) => city.id);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t.tsp.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {t.tsp.description}
            </p>
          </div>
          <GraphInfo />
        </div>
      </div>

      {/* Formulário de Configuração */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {t.tsp.config.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          {t.tsp.config.description}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tamanho da População */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.tsp.config.populationSize}
              </label>
              <input
                type="number"
                value={config.populationSize}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= 100) {
                    setConfig({
                      ...config,
                      populationSize: value,
                    });
                  } else if (e.target.value === "") {
                    setConfig({
                      ...config,
                      populationSize: 100,
                    });
                  }
                }}
                min="100"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {t.tsp.config.populationSizeHint}
              </p>
            </div>

            {/* Taxa de Cruzamento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.tsp.config.crossoverRate}
              </label>
              <input
                type="number"
                step="1"
                value={Math.round(config.crossoverRate)}
                onChange={(e) => {
                  const displayValue = parseFloat(e.target.value);
                  if (
                    !isNaN(displayValue) &&
                    displayValue >= 60 &&
                    displayValue <= 80
                  ) {
                    setConfig({
                      ...config,
                      crossoverRate: displayValue,
                    });
                  } else if (e.target.value === "") {
                    setConfig({
                      ...config,
                      crossoverRate: 0.7,
                    });
                  }
                }}
                min="60"
                max="80"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {t.tsp.config.crossoverRateHint}
              </p>
            </div>

            {/* Taxa de Mutação */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.tsp.config.mutationRate}
              </label>
              <input
                type="number"
                step="0.1"
                value={config.mutationRate}
                onChange={(e) => {
                  const displayValue = parseFloat(e.target.value);
                  if (
                    !isNaN(displayValue) &&
                    displayValue >= 0.5 &&
                    displayValue <= 1
                  ) {
                    setConfig({
                      ...config,
                      mutationRate: displayValue,
                    });
                  } else if (e.target.value === "") {
                    setConfig({
                      ...config,
                      mutationRate: 0.008,
                    });
                  }
                }}
                min="0.5"
                max="1"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {t.tsp.config.mutationRateHint}
              </p>
            </div>

            {/* Número de Gerações */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.tsp.config.maxGenerations}
              </label>
              <input
                type="number"
                value={config.maxGenerations}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= 20) {
                    setConfig({
                      ...config,
                      maxGenerations: value,
                    });
                  } else if (e.target.value === "") {
                    setConfig({
                      ...config,
                      maxGenerations: 100,
                    });
                  }
                }}
                min="20"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {t.tsp.config.maxGenerationsHint}
              </p>
            </div>

            {/* Elitismo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.tsp.config.elitismCount}
              </label>
              <input
                type="number"
                value={config.elitismCount}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    elitismCount: parseInt(e.target.value) || 5,
                  })
                }
                min="1"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {t.tsp.config.elitismCountHint}
              </p>
            </div>

            {/* Cidade Inicial */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.tsp.config.startCity}
              </label>
              <select
                value={config.startCityId}
                onChange={(e) =>
                  setConfig({ ...config, startCityId: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {cityOptions.map((cityId) => (
                  <option key={cityId} value={cityId}>
                    {cityId}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {t.tsp.config.startCityHint}
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? t.tsp.config.running : t.tsp.config.runAlgorithm}
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={loading}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t.tsp.config.reset}
            </button>
          </div>
        </form>
      </div>

      <Separator.Root className="h-px bg-gray-200 dark:bg-gray-700" />

      {/* Resultados */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          {t.tsp.results.title}
        </h2>
        <TSPResults result={result} cities={cities} />
      </div>
    </div>
  );
};
