export function buildMultiAxisLine(data) {
    return {
        title: { text: data.titulo },

        tooltip: { trigger: 'axis' },

        legend: {},

        xAxis: {
            type: 'category',
            data: data.eixoX,
        },

        yAxis: data.eixosY.map(e => ({
            name: e.nome,
            type: 'value',
            position: e.posicao,
        })),

        series: data.series.map(s => ({
            name: s.nome,
            type: 'line',
            data: s.dados,
            yAxisIndex: data.eixosY.findIndex(
                e => e.id === s.eixoY
            ),
        })),
    }
}