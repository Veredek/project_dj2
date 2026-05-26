import ReactECharts from 'echarts-for-react'

export function Data1Chart({ data }) {
    const option = {
        title: {
            text: data.titulo,
        },

        tooltip: {
            trigger: 'axis',
        },

        xAxis: {
            type: 'category',
            data: data.eixoX,
        },

        yAxis: {
            type: 'value',
        },

        series: data.series.map(item => ({
            name: item.nome,
            type: 'bar',
            data: item.dados,
        })),
    }

    return (
        <ReactECharts
            option={option}
        />
    )
}

export function Data2Chart({ data }) {
    const option = {
        title: {
            text: data.titulo,
        },

        tooltip: {
            trigger: 'axis',
        },

        xAxis: {
            type: 'category',
            data: data.eixoX,
        },

        yAxis: {
            type: 'value',
        },

        series: data.series.map(item => ({
            name: item.nome,
            type: 'line',
            data: item.dados,
        })),
    }

    return <ReactECharts option={option}/>
}

export function Data3Chart({ data }) {
    const option = {
        title: {
            text: data.titulo,
        },

        tooltip: {
            trigger: 'axis',
        },

        series: [
            {
                name: data.titulo,
                type: 'pie',
                radius: '50%',

                data: data.dados.map(item => ({
                    name: item.nome,
                    value: item.valor,
                }))
            }
        ],
    }

    return <ReactECharts option={option}/>
}

export function Data4Chart({ data }) {
    const option = {
        title: {
            text: data.titulo,
        },

        tooltip: {
            trigger: 'axis',
        },

        xAxis: {
            type: 'category',
            data: data.eixoX,
        },

        yAxis: {
            type: 'value',
        },

        series: data.series.map(item => ({
            name: item.nome,
            type: 'line',
            data: item.dados,

            showSymbol: item.mostrarPontos,
            lineStyle: {
                opacity: item.mostrarLinha ? 1 : 0,
            }
        })),
    }

    return <ReactECharts option={option}/>
}

export function Data5Chart({ data }) {
    const option = {
        title: {
            text: data.titulo,
        },

        tooltip: {
            trigger: 'axis',
        },

        legend: {
            top: 30,
        },

        xAxis: {
            type: 'category',
            data: data.eixoX,
        },

        yAxis: data.eixosY.map(item => ({
            name: item.nome,
            type: 'value',
            position: item.posicao
        })),

        series: data.series.map(item => ({
            name: item.nome,
            type: 'line',
            data: item.dados,

            yAxisIndex: data.eixosY.findIndex(
                eixo => eixo.id === item.eixoY
            )
        })),
    }

    return <ReactECharts option={option}/>
}