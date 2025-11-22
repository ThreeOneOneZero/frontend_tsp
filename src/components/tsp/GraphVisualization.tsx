import React, { useMemo } from "react";
import type { City } from "../../types/tsp";

interface GraphVisualizationProps {
  cities: Record<string, City>;
  route?: string[];
}

export const GraphVisualization: React.FC<GraphVisualizationProps> = ({
  cities,
  route,
}) => {
  // Definir todas as conexões do grafo
  const allConnections = [
    ["F", "N"],
    ["F", "C"],
    ["F", "L"],
    ["F", "G"],
    ["N", "C"],
    ["N", "K"],
    ["C", "K"],
    ["C", "E"],
    ["C", "H"],
    ["C", "L"],
    ["K", "E"],
    ["K", "G"],
    ["K", "H"],
    ["E", "H"],
    ["E", "G"],
    ["E", "L"],
    ["H", "G"],
    ["H", "L"],
  ];

  const { scaledCities } = useMemo(() => {
    const cityList = Object.values(cities);

    if (cityList.length === 0) {
      return { scaledCities: {} };
    }

    const xs = cityList.map((c) => c.x);
    const ys = cityList.map((c) => c.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    // Escalar para caber no SVG com padding
    const padding = 50;
    const svgWidth = 600;
    const svgHeight = 400;
    const scaleX = (svgWidth - 2 * padding) / (maxX - minX || 1);
    const scaleY = (svgHeight - 2 * padding) / (maxY - minY || 1);
    const scale = Math.min(scaleX, scaleY);

    const scaledCities: Record<string, { x: number; y: number }> = {};
    Object.entries(cities).forEach(([id, city]) => {
      scaledCities[id] = {
        x: (city.x - minX) * scale + padding,
        y: svgHeight - ((city.y - minY) * scale + padding), // Inverter Y
      };
    });

    return { scaledCities };
  }, [cities]);

  const renderAllConnections = () => {
    return allConnections.map(([cityA, cityB]) => {
      const from = scaledCities[cityA];
      const to = scaledCities[cityB];

      if (!from || !to) return null;

      return (
        <line
          key={`${cityA}-${cityB}`}
          x1={from.x}
          y1={from.y}
          x2={to.x}
          y2={to.y}
          stroke="#d1d5db"
          strokeWidth="1.5"
          className="dark:stroke-gray-600"
        />
      );
    });
  };

  const renderConnections = () => {
    if (!route || route.length < 2) return null;

    return route.map((cityId, index) => {
      if (index === route.length - 1) return null;
      const nextCityId = route[index + 1];
      const from = scaledCities[cityId];
      const to = scaledCities[nextCityId];

      if (!from || !to) return null;

      return (
        <line
          key={`${cityId}-${nextCityId}`}
          x1={from.x}
          y1={from.y}
          x2={to.x}
          y2={to.y}
          stroke="#3b82f6"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />
      );
    });
  };

  const renderInitialNode = () => {
    if (!route || route.length === 0) return null;
    const initialCityId = route[0];
    const initialCity = scaledCities[initialCityId];

    if (!initialCity) return null;

    return (
      <circle
        cx={initialCity.x}
        cy={initialCity.y}
        r="12"
        fill="#0af157"
        stroke="#0af157"
        strokeWidth="2"
      />
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <svg
        width="600"
        height="400"
        className="border border-gray-200 dark:border-gray-700 rounded"
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
          </marker>
        </defs>

        {/* Renderizar todas as conexões do grafo */}
        {renderAllConnections()}

        {/* Renderizar conexões da rota (se existir) */}
        {renderConnections()}

        {/* Renderizar node inicial */}
        {renderInitialNode()}
        {/* Renderizar cidades */}
        {Object.entries(scaledCities).map(([id, pos]) => (
          <g key={id}>
            <circle
              cx={pos.x}
              cy={pos.y}
              r="8"
              fill={route?.includes(id) ? "#3b82f6" : "#9ca3af"}
              stroke="white"
              strokeWidth="2"
            />
            <text
              x={pos.x}
              y={pos.y - 15}
              textAnchor="middle"
              className="text-sm font-semibold fill-gray-900 dark:fill-white"
            >
              {id}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};
