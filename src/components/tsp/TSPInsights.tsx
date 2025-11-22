import React, { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import * as HoverCard from "@radix-ui/react-hover-card";
import * as Separator from "@radix-ui/react-separator";
import { useI18n } from "../../i18n";
import { tspApi } from "../../services/tspApi";
import type {
  PopulationStats,
  RouteIndividual,
  GenerationHistory,
} from "../../types/tsp";

export const TSPInsights: React.FC = () => {
  const { translations: t } = useI18n();
  const [stats, setStats] = useState<PopulationStats | null>(null);
  const [history, setHistory] = useState<GenerationHistory[]>([]);
  const [bestRoute, setBestRoute] = useState<RouteIndividual | null>(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [loadingBest, setLoadingBest] = useState(false);

  const loadStats = async () => {
    setLoadingStats(true);
    try {
      const data = await tspApi.getStats();
      setStats(data);
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoadingStats(false);
    }
  };

  const loadHistory = async () => {
    setLoadingHistory(true);
    try {
      const data = await tspApi.getHistory();
      setHistory(data);
    } catch (error) {
      console.error("Error loading history:", error);
    } finally {
      setLoadingHistory(false);
    }
  };

  const loadBestRoute = async () => {
    setLoadingBest(true);
    try {
      const data = await tspApi.getBestRoute();
      setBestRoute(data);
    } catch (error) {
      console.error("Error loading best route:", error);
    } finally {
      setLoadingBest(false);
    }
  };

  const getImprovementColor = (current: number, previous: number) => {
    if (current < previous) return "text-green-600 dark:text-green-400";
    if (current > previous) return "text-red-600 dark:text-red-400";
    return "text-gray-600 dark:text-gray-400";
  };

  const calculateImprovement = (current: number, previous: number) => {
    const diff = previous - current;
    const percent = ((diff / previous) * 100).toFixed(2);
    return diff > 0
      ? `↓ ${diff.toFixed(2)} (${percent}%)`
      : diff < 0
      ? `↑ ${Math.abs(diff).toFixed(2)} (${percent}%)`
      : "=";
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t.tsp.insights.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {t.tsp.insights.description}
        </p>
      </div>

      <Tabs.Root defaultValue="stats" className="w-full">
        <Tabs.List className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <Tabs.Trigger
            value="stats"
            className="px-6 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 border-b-2 border-transparent hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-600 dark:hover:border-blue-400 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:border-blue-600 dark:data-[state=active]:border-blue-400 transition-all"
          >
            📊 {t.tsp.insights.tabs.stats}
          </Tabs.Trigger>
          <Tabs.Trigger
            value="population"
            className="px-6 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 border-b-2 border-transparent hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-600 dark:hover:border-purple-400 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400 data-[state=active]:border-purple-600 dark:data-[state=active]:border-purple-400 transition-all"
          >
            📈 {t.tsp.insights.tabs.population}
          </Tabs.Trigger>
          <Tabs.Trigger
            value="best"
            className="px-6 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 border-b-2 border-transparent hover:text-green-600 dark:hover:text-green-400 hover:border-green-600 dark:hover:border-green-400 data-[state=active]:text-green-600 dark:data-[state=active]:text-green-400 data-[state=active]:border-green-600 dark:data-[state=active]:border-green-400 transition-all"
          >
            🏆 {t.tsp.insights.tabs.best}
          </Tabs.Trigger>
        </Tabs.List>

        {/* Stats Tab */}
        <Tabs.Content value="stats" className="outline-none">
          {!stats ? (
            <div className="text-center py-12">
              <button
                onClick={loadStats}
                disabled={loadingStats}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingStats
                  ? t.tsp.insights.stats.loading
                  : t.tsp.insights.stats.load}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-end">
                <button
                  onClick={loadStats}
                  disabled={loadingStats}
                  className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  {loadingStats
                    ? t.tsp.insights.stats.loading
                    : t.tsp.insights.stats.load}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Population Size */}
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-5 text-white shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm opacity-90">
                      {t.tsp.insights.stats.size}
                    </p>
                    <span className="text-2xl">👥</span>
                  </div>
                  <p className="text-3xl font-bold">{stats.size}</p>
                  <p className="text-xs opacity-75 mt-1">
                    {t.tsp.insights.stats.individuals}
                  </p>
                </div>

                {/* Best Distance */}
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg p-5 text-white shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm opacity-90">
                      {t.tsp.insights.stats.bestDistance}
                    </p>
                    <span className="text-2xl">🎯</span>
                  </div>
                  <p className="text-3xl font-bold">
                    {stats.bestDistance.toFixed(2)}
                  </p>
                </div>

                {/* Average Distance */}
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg p-5 text-white shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm opacity-90">
                      {t.tsp.insights.stats.avgDistance}
                    </p>
                    <span className="text-2xl">📊</span>
                  </div>
                  <p className="text-3xl font-bold">
                    {stats.averageDistance.toFixed(2)}
                  </p>
                </div>

                {/* Worst Distance */}
                <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-lg p-5 text-white shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm opacity-90">
                      {t.tsp.insights.stats.worstDistance}
                    </p>
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <p className="text-3xl font-bold">
                    {stats.worstDistance.toFixed(2)}
                  </p>
                </div>
              </div>

              <Separator.Root className="bg-gray-200 dark:bg-gray-700 h-px my-6" />

              {/* Best Route from Stats */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-5 border border-indigo-200 dark:border-indigo-800">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.tsp.insights.stats.bestRoute}
                </p>
                <p className="text-lg font-mono font-semibold text-indigo-900 dark:text-indigo-200">
                  {stats.bestRoute.join(" → ")}
                </p>
              </div>
            </div>
          )}
        </Tabs.Content>

        {/* Population Tab */}
        <Tabs.Content value="population" className="outline-none">
          {history.length === 0 ? (
            <div className="text-center py-12">
              <button
                onClick={loadHistory}
                disabled={loadingHistory}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingHistory
                  ? t.tsp.insights.population.loading
                  : t.tsp.insights.population.load}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t.tsp.insights.population.subtitle}
                </p>
                <button
                  onClick={loadHistory}
                  disabled={loadingHistory}
                  className="px-4 py-2 bg-purple-500 text-white text-sm rounded-lg hover:bg-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  {loadingHistory
                    ? t.tsp.insights.population.loading
                    : t.tsp.insights.population.load}
                </button>
              </div>

              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                {history.map((gen, index) => {
                  const prevGen = index > 0 ? history[index - 1] : null;

                  return (
                    <HoverCard.Root key={gen.generation} openDelay={200}>
                      <HoverCard.Trigger asChild>
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                          <div className="flex items-center justify-between gap-6">
                            {/* Left: Generation Number */}
                            <div className="flex items-center gap-3 flex-shrink-0">
                              <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center">
                                <span className="text-sm font-bold text-white">
                                  {gen.generation}
                                </span>
                              </div>
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Geração {gen.generation}
                              </span>
                            </div>

                            {/* Right: Metrics */}
                            <div className="flex items-center gap-6">
                              {/* Best Distance - Highlighted */}
                              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg px-4 py-2">
                                <p className="text-xs font-medium text-green-700 dark:text-green-400 mb-1">
                                  {t.tsp.insights.population.best}
                                </p>
                                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                                  {gen.bestDistance.toFixed(2)}
                                </p>
                              </div>

                              {/* Average */}
                              <div className="text-center">
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                  {t.tsp.insights.population.average}
                                </p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                  {gen.averageDistance.toFixed(2)}
                                </p>
                              </div>

                              {/* Worst */}
                              <div className="text-center">
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                  {t.tsp.insights.population.worst}
                                </p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                  {gen.worstDistance.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </HoverCard.Trigger>
                      <HoverCard.Portal>
                        <HoverCard.Content
                          className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-xl border border-gray-200 dark:border-gray-700 w-80"
                          sideOffset={5}
                        >
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                {t.tsp.insights.population.hover.generation}
                              </p>
                              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                #{gen.generation}
                              </p>
                            </div>
                            <Separator.Root className="bg-gray-200 dark:bg-gray-700 h-px" />
                            <div className="grid grid-cols-3 gap-2">
                              <div>
                                <p className="text-xs text-green-600 dark:text-green-400 uppercase tracking-wide">
                                  {t.tsp.insights.population.best}
                                </p>
                                <p className="text-lg font-bold text-gray-900 dark:text-white">
                                  {gen.bestDistance.toFixed(2)}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                                  {t.tsp.insights.population.average}
                                </p>
                                <p className="text-lg font-bold text-gray-900 dark:text-white">
                                  {gen.averageDistance.toFixed(2)}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-red-600 dark:text-red-400 uppercase tracking-wide">
                                  {t.tsp.insights.population.worst}
                                </p>
                                <p className="text-lg font-bold text-gray-900 dark:text-white">
                                  {gen.worstDistance.toFixed(2)}
                                </p>
                              </div>
                            </div>
                            {prevGen && (
                              <>
                                <Separator.Root className="bg-gray-200 dark:bg-gray-700 h-px" />
                                <div>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                                    {
                                      t.tsp.insights.population.hover
                                        .improvement
                                    }
                                  </p>
                                  <p
                                    className={`text-sm font-semibold ${getImprovementColor(
                                      gen.bestDistance,
                                      prevGen.bestDistance
                                    )}`}
                                  >
                                    {calculateImprovement(
                                      gen.bestDistance,
                                      prevGen.bestDistance
                                    )}
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                          <HoverCard.Arrow className="fill-white dark:fill-gray-800" />
                        </HoverCard.Content>
                      </HoverCard.Portal>
                    </HoverCard.Root>
                  );
                })}
              </div>
            </div>
          )}
        </Tabs.Content>

        {/* Best Route Tab */}
        <Tabs.Content value="best" className="outline-none">
          {!bestRoute ? (
            <div className="text-center py-12">
              <button
                onClick={loadBestRoute}
                disabled={loadingBest}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingBest
                  ? t.tsp.insights.best.loading
                  : t.tsp.insights.best.load}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-end">
                <button
                  onClick={loadBestRoute}
                  disabled={loadingBest}
                  className="px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  {loadingBest
                    ? t.tsp.insights.best.loading
                    : t.tsp.insights.best.load}
                </button>
              </div>
              <div className="bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 rounded-xl p-8 text-white shadow-2xl border-4 border-yellow-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl">🏆</span>
                  <div>
                    <h3 className="text-2xl font-bold">
                      {t.tsp.insights.best.title}
                    </h3>
                    <p className="text-sm opacity-90">
                      {t.tsp.insights.best.subtitle}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-sm opacity-90 mb-1">
                      {t.tsp.insights.best.distance}
                    </p>
                    <p className="text-3xl font-bold">
                      {bestRoute.totalDistance.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-sm opacity-90 mb-1">
                      {t.tsp.insights.best.fitness}
                    </p>
                    <p className="text-2xl font-bold">
                      {bestRoute.fitness.toFixed(6)}
                    </p>
                  </div>
                </div>

                <div className="bg-white/30 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-sm font-medium mb-2">
                    {t.tsp.insights.best.route}
                  </p>
                  <p className="text-lg font-mono font-semibold break-words">
                    {bestRoute.cityNames.join(" → ")}
                  </p>
                  <p className="text-xs opacity-75 mt-2">
                    {bestRoute.cityNames.length} {t.tsp.insights.best.cities}
                  </p>
                </div>
              </div>

              {/* Cities Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {bestRoute.cities.map((city) => (
                  <div
                    key={city.id}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">📍</span>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">
                          {city.name}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          ({city.x}, {city.y})
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};
