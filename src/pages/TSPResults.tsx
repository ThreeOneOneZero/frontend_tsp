import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { TSPResult, City } from "../types/tsp";
import { useI18n } from "../i18n";
import { GraphVisualization, TSPInsights } from "../components/tsp";

interface TSPResultsProps {
  result: TSPResult | null;
  cities: Record<string, City>;
}

export const TSPResults: React.FC<TSPResultsProps> = ({ result, cities }) => {
  const { translations: t } = useI18n();

  if (!result) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm text-center">
        <p className="text-gray-500 dark:text-gray-400">
          {t.tsp.results.noResults}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Estatísticas */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {t.tsp.results.statistics}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t.tsp.results.bestDistance}
            </p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {result.bestDistance.toFixed(2)}
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t.tsp.results.executionTime}
            </p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {result.executionTimeMs}ms
            </p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t.tsp.results.totalGenerations}
            </p>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {result.totalGenerations}
            </p>
          </div>
        </div>
      </div>

      {/* Melhor Rota */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {t.tsp.results.bestRoute}
        </h3>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {t.tsp.results.routeSequence}
          </p>
          <p className="text-lg font-mono font-semibold text-gray-900 dark:text-white">
            {result.bestRoute.cityNames.join(" → ")}
          </p>
        </div>
      </div>

      {/* Visualização do Grafo */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {t.tsp.graph.title}
        </h3>
        <GraphVisualization
          cities={cities}
          route={result.bestRoute.cityNames}
        />
      </div>

      {/* Gráfico de Convergência */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {t.tsp.results.convergenceChart}
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={result.generationHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="generation"
              label={{
                value: t.tsp.results.generation,
                position: "insideBottom",
                offset: -5,
              }}
            />
            <YAxis
              label={{
                value: t.tsp.results.distance,
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="bestDistance"
              stroke="#10b981"
              name={t.tsp.results.best}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="averageDistance"
              stroke="#f59e0b"
              name={t.tsp.results.average}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="worstDistance"
              stroke="#ef4444"
              name={t.tsp.results.worst}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Insights Avançados */}
      <TSPInsights />
    </div>
  );
};
