import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { InfoCircledIcon, Cross2Icon } from "@radix-ui/react-icons";
import { tspApi } from "../../services/tspApi";
import type { City } from "../../types/tsp";
import { GraphVisualization } from "./GraphVisualization";
import { useI18n } from "../../i18n";

export const GraphInfo: React.FC = () => {
  const { translations: t } = useI18n();
  const [cities, setCities] = useState<Record<string, City>>({});
  const [loading, setLoading] = useState(false);

  const loadCities = async () => {
    try {
      setLoading(true);
      const citiesData = await tspApi.getCities();
      setCities(citiesData);
    } catch (err) {
      console.error("Erro ao carregar cidades:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className="inline-flex items-center gap-2 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors border border-blue-200 dark:border-blue-800"
          onClick={loadCities}
        >
          <InfoCircledIcon className="w-4 h-4" />
          {t.tsp.graph.info.title}
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 animate-fade-in z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden z-50 animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <Dialog.Title className="text-2xl font-bold text-gray-900 dark:text-white">
              📊 {t.tsp.graph.info.title}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
                <Cross2Icon className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          {/* Content with Tabs */}
          <Tabs.Root
            defaultValue="visualization"
            className="flex flex-col h-[calc(90vh-140px)]"
          >
            <Tabs.List className="flex border-b border-gray-200 dark:border-gray-700 px-6">
              <Tabs.Trigger
                value="visualization"
                className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 transition-all"
              >
                🎨 {t.tsp.graph.info.tabs.visualization}
              </Tabs.Trigger>
              <Tabs.Trigger
                value="data"
                className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 transition-all"
              >
                📋 {t.tsp.graph.info.tabs.data}
              </Tabs.Trigger>
            </Tabs.List>

            <div className="overflow-y-auto p-6">
              {/* Tab: Visualização */}
              <Tabs.Content value="visualization" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {t.tsp.graph.info.visualization.title}
                  </h3>
                  {loading ? (
                    <div className="flex items-center justify-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                  ) : Object.keys(cities).length > 0 ? (
                    <div className="flex justify-center">
                      <GraphVisualization cities={cities} />
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                      {t.tsp.graph.info.loadingGraph}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                      🏙️ {t.tsp.graph.info.visualization.citiesCount} (
                      {Object.keys(cities).length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {Object.keys(cities).map((cityId) => (
                        <span
                          key={cityId}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                        >
                          {cityId}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 dark:text-green-200 mb-2">
                      🔗 {t.tsp.graph.info.visualization.connectionsCount}
                    </h4>
                    <p className="text-3xl font-bold text-green-700 dark:text-green-300">
                      18
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      {t.tsp.graph.info.visualization.edges}
                    </p>
                  </div>
                </div>
              </Tabs.Content>

              {/* Tab: Dados */}
              <Tabs.Content value="data" className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {t.tsp.graph.info.data.title}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                      <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-2">
                        {t.tsp.graph.info.data.groupF}
                      </p>
                      <div className="space-y-1 text-sm">
                        <p className="font-mono">
                          <strong>F-N:</strong> 30
                        </p>
                        <p className="font-mono">
                          <strong>F-C:</strong> 20
                        </p>
                        <p className="font-mono">
                          <strong>F-L:</strong> 10
                        </p>
                        <p className="font-mono">
                          <strong>F-G:</strong> 55
                        </p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2">
                        {t.tsp.graph.info.data.groupN}
                      </p>
                      <div className="space-y-1 text-sm">
                        <p className="font-mono">
                          <strong>N-C:</strong> 47
                        </p>
                        <p className="font-mono">
                          <strong>N-K:</strong> 60
                        </p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                      <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-2">
                        {t.tsp.graph.info.data.groupC}
                      </p>
                      <div className="space-y-1 text-sm">
                        <p className="font-mono">
                          <strong>C-K:</strong> 70
                        </p>
                        <p className="font-mono">
                          <strong>C-E:</strong> 10
                        </p>
                        <p className="font-mono">
                          <strong>C-H:</strong> 30
                        </p>
                        <p className="font-mono">
                          <strong>C-L:</strong> 10
                        </p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <p className="text-xs font-semibold text-yellow-600 dark:text-yellow-400 mb-2">
                        {t.tsp.graph.info.data.groupK}
                      </p>
                      <div className="space-y-1 text-sm">
                        <p className="font-mono">
                          <strong>K-E:</strong> 10
                        </p>
                        <p className="font-mono">
                          <strong>K-G:</strong> 90
                        </p>
                        <p className="font-mono">
                          <strong>K-H:</strong> 73
                        </p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 p-3 rounded-lg border border-pink-200 dark:border-pink-800">
                      <p className="text-xs font-semibold text-pink-600 dark:text-pink-400 mb-2">
                        {t.tsp.graph.info.data.groupE}
                      </p>
                      <div className="space-y-1 text-sm">
                        <p className="font-mono">
                          <strong>E-H:</strong> 60
                        </p>
                        <p className="font-mono">
                          <strong>E-G:</strong> 40
                        </p>
                        <p className="font-mono">
                          <strong>E-L:</strong> 5
                        </p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-3 rounded-lg border border-orange-200 dark:border-orange-800">
                      <p className="text-xs font-semibold text-orange-600 dark:text-orange-400 mb-2">
                        {t.tsp.graph.info.data.groupH}
                      </p>
                      <div className="space-y-1 text-sm">
                        <p className="font-mono">
                          <strong>H-G:</strong> 80
                        </p>
                        <p className="font-mono">
                          <strong>H-L:</strong> 40
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-yellow-900 dark:text-yellow-200 mb-2 flex items-center gap-2">
                    ⚠️ {t.tsp.graph.info.data.impossibleRoutes}
                  </h4>
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    {t.tsp.graph.info.data.impossibleRoutesDesc}
                  </p>
                </div>
              </Tabs.Content>
            </div>
          </Tabs.Root>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <Dialog.Close asChild>
              <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                {t.tsp.graph.info.closeButton}
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
