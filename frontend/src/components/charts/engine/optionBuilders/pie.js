export function buildPie(data) {
    return {
        title: { text: data.titulo },

        tooltip: { trigger: 'item' },

        series: [
            {
                type: 'pie',
                radius: '50%',
                data: data.dados.map(d => ({
                    name: d.nome,
                    value: d.valor,
                })),
            },
        ],
    }
}