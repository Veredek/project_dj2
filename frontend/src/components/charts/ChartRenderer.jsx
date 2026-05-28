import ReactECharts from "echarts-for-react";
import { useState } from "react";
import { resolveChart } from "./engine/chartResolver";
import { resolveAxisMeta } from "./helpers/axisMetaResolver";

export function ChartRenderer({ data }) {
  const xLabel = data?.eixos?.x;
  const yLabel = data?.eixos?.y;
  const xMeta = resolveAxisMeta(xLabel);
  const yMeta = resolveAxisMeta(yLabel);
  const xUnits = Object.keys(xMeta?.units ?? {});
  const yUnits = Object.keys(yMeta?.units ?? {});
  const [xUnit, setXUnit] = useState(xMeta.default);
  const [yUnit, setYUnit] = useState(yMeta.default);

  const option = resolveChart(data, { xUnit, yUnit, xMeta, yMeta });

  return (
    <div>
      <ReactECharts option={option} style={{ height: 400 }} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 16,
          marginBottom: 12,
        }}
      >
        {/* eixo X */}
        {xUnits.length > 0 && (
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span>{xLabel}</span>
            <select value={xUnit} onChange={(e) => setXUnit(e.target.value)}>
              {xUnits.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </label>
        )}

        {/* eixo Y */}
        {yUnits.length > 0 && (
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span>{yLabel}</span>
            <select value={yUnit} onChange={(e) => setYUnit(e.target.value)}>
              {yUnits.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>
    </div>
  );
}
