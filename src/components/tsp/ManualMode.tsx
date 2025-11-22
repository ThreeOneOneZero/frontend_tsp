import React, { useState } from "react";
import { tspApi } from "../../services/tspApi";
import { useI18n } from "../../i18n";
import type {
  TSPConfig,
  PopulationStats,
  RouteIndividual,
  City,
} from "../../types/tsp";
import { GraphVisualization } from "./GraphVisualization";
import * as Separator from "@radix-ui/react-separator";

interface ManualModeProps {
  config: TSPConfig;
  cities: Record<string, City>;
}

export const ManualMode: React.FC<ManualModeProps> = ({ config, cities }) => {
  const { translations: t } = useI18n();
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentGeneration, setCurrentGeneration] = useState(0);
  const [stats, setStats] = useState<PopulationStats | null>(null);
  const [population, setPopulation] = useState<RouteIndividual[]>([]);
  const [bestRoute, setBestRoute] = useState<RouteIndividual | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInitialize = async () => {
    try {
      setLoading(true);
      await tspApi.initialize(config);

      // Carregar dados iniciais
      const [statsData, popData, bestData] = await Promise.all([
        tspApi.getStats(),
        tspApi.getTopRoutes(20),
        tspApi.getBestRoute(),
      ]);

      setStats(statsData);
      setPopulation(popData);
      setBestRoute(bestData);
      setCurrentGeneration(0);
      setIsInitialized(true);
    } catch (error) {
      console.error("Erro ao inicializar:", error);
      alert("Erro ao inicializar população");
    } finally {
      setLoading(false);
    }
  };

  const handleEvolve = async () => {
    try {
      setLoading(true);
      await tspApi.evolve();

      // Atualizar dados após evolução
      const [statsData, popData, bestData] = await Promise.all([
        tspApi.getStats(),
        tspApi.getTopRoutes(20),
        tspApi.getBestRoute(),
      ]);

      setStats(statsData);
      setPopulation(popData);
      setBestRoute(bestData);
      setCurrentGeneration((prev) => prev + 1);
    } catch (error) {
      console.error("Erro ao evoluir:", error);
      alert("Erro ao evoluir geração");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t.tsp.manual.title}
        </h3>

        <div className="flex gap-3">
          {!isInitialized ? (
            <button
              onClick={handleInitialize}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? t.tsp.manual.initializing
                : `${t.tsp.manual.initialize}`}
            </button>
          ) : (
            <button
              onClick={handleEvolve}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t.tsp.manual.evolving : `${t.tsp.manual.evolve}`}
            </button>
          )}
        </div>
      </div>

      {isInitialized && stats && bestRoute && (
        <>
          {/* Progress Stats */}
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {t.tsp.manual.currentGen}: {currentGeneration}
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {t.tsp.manual.population}: {stats.size}{" "}
                {t.tsp.manual.individuals}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <p className="text-xs font-medium text-green-700 dark:text-green-400 mb-1">
                  {t.tsp.manual.bestDistance}
                </p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {stats.bestDistance.toFixed(2)}
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-xs font-medium text-blue-700 dark:text-blue-400 mb-1">
                  {t.tsp.manual.avgDistance}
                </p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {stats.averageDistance.toFixed(2)}
                </p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-xs font-medium text-red-700 dark:text-red-400 mb-1">
                  {t.tsp.manual.worstDistance}
                </p>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                  {stats.worstDistance.toFixed(2)}
                </p>
              </div>
            </div>

            <Separator.Root className="bg-gray-200 dark:bg-gray-700 h-px my-4" />

            {/* Best Route Info */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-4 border border-indigo-200 dark:border-indigo-800">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                🏆 {t.tsp.manual.bestRoute}
              </p>
              <p className="text-lg font-mono font-semibold text-indigo-900 dark:text-indigo-200">
                {stats.bestRoute.join(" → ")}
              </p>
            </div>
          </div>

          {/* Graph Visualization */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              🗺️ {t.tsp.manual.graphTitle}
            </h3>
            <GraphVisualization cities={cities} route={bestRoute.cityNames} />
          </div>

          {/* Top 20 Population */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              🏅 {t.tsp.manual.topTitle}
            </h3>
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
              {population.map((individual, index) => {
                const rankColor =
                  index === 0
                    ? "from-yellow-400 to-amber-500"
                    : index === 1
                    ? "from-gray-300 to-gray-400"
                    : index === 2
                    ? "from-amber-600 to-amber-700"
                    : "from-blue-500 to-indigo-600";

                const rankEmoji =
                  index === 0
                    ? "🥇"
                    : index === 1
                    ? "🥈"
                    : index === 2
                    ? "🥉"
                    : `#${index + 1}`;

                return (
                  <div
                    key={index}
                    className={`bg-gradient-to-r ${rankColor} rounded-lg p-4 text-white shadow-md`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold">{rankEmoji}</span>
                        <div>
                          <p className="text-sm opacity-90 font-medium">
                            {t.tsp.manual.route}
                          </p>
                          <p className="text-xs font-mono opacity-75 truncate max-w-md">
                            {individual.cityNames.join(" → ")}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">
                          {individual.totalDistance.toFixed(2)}
                        </p>
                        <p className="text-xs opacity-75">
                          {t.tsp.manual.fitness}:{" "}
                          {individual.fitness.toFixed(6)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
