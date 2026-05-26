export function buildBar(data) {
    return {
        title: { text: data.titulo },

        tooltip: { trigger: 'axis' },

        xAxis: {
            type: 'category',
            data: data.eixoX,
        },

        yAxis: {
            type: 'value',
        },

        series: data.series.map(s => ({
            name: s.nome,
            type: 'bar',
            data: s.dados,
        })),
    }
}