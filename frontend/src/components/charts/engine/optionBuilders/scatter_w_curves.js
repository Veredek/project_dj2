export function buildScatterWCurves(data) {
  const series = []

  // curves
  if (Array.isArray(data.curves)) {
    data.curves.forEach((curve) => {
      series.push({
        id: curve.id,
        name: curve.label,
        type: 'line',
        showSymbol: false,
        symbol: 'none',
        smooth: true,
        connectNulls: false,
        lineStyle: {
          color: curve.style?.color,
          width: curve.style?.lineWidth ?? 2,
        },
        data: curve.data.map((point) =>
          point.x == null || point.y == null
            ? [null, null]
            : [point.x, point.y]
        ),
      })
    })
  }

  // scatter
  if (data.scatter) {
    series.push({
      id: data.scatter.id,
      name: data.scatter.label,
      type: 'scatter',
      symbol: 'circle',
      symbolSize: data.scatter.style?.size ?? 8,
      itemStyle: {
        color: data.scatter.style?.color,
      },
      data: data.scatter.data.map((point) => [point.x, point.y]),
    })
  }

  const ellipseColor =
    data.curves?.find((curve) => curve.label === 'Elipse')?.style?.color

  const linesColor =
    data.curves?.find((curve) => curve.label === 'Retas')?.style?.color

  return {
    tooltip: {
      trigger: 'axis',
    },

    legend: {
      top: 10,
      data: [
        {
          name: 'Elipse',
          icon: 'roundRect',
          itemStyle: {
            color: ellipseColor,
          },
        },
        {
          name: 'Retas',
          icon: 'roundRect',
          itemStyle: {
            color: linesColor,
          },
        },
        {
          name: 'Pontos',
          icon: 'circle',
          itemStyle: {
            color: data.scatter?.style?.color,
          },
        },
      ],
    },

    xAxis: {
      type: 'value',
      name: 'X',
      nameLocation: 'middle',
      nameGap: 30,
    },

    yAxis: {
      type: 'value',
      name: 'Y',
      nameLocation: 'middle',
      nameRotate: 0,
      nameGap: 45,
    },

    series,
  }
}