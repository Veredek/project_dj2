import { getAxisRange } from '../../helpers/axisRangeResolver'

function interpolateY(pontos, x) {
    const ordered = [...(pontos ?? [])]
        .sort((a, b) => a.x - b.x)

    if (!ordered.length) {
        return null
    }

    // fora do domínio
    if (x < ordered[0].x ||
        x > ordered[ordered.length - 1].x) {
        return null
    }

    for (
        let i = 0;
        i < ordered.length - 1;
        i++
    ) {
        const p1 = ordered[i]
        const p2 = ordered[i + 1]

        if (x >= p1.x &&
            x <= p2.x) {
            const ratio = (x - p1.x) / (p2.x - p1.x)

            return (p1.y + ratio * (p2.y - p1.y))
        }
    }

    return null
}

export function buildLine(data, options = {}) {
    const titulo = data?.titulo

    const eixoX = data?.eixoX
    const eixos = data?.eixos

    const xUnit = options?.xUnit
    const yUnit = options?.yUnit

    const convertX = options?.xMeta?.units?.[xUnit] ?? ((v) => v)
    const convertY = options?.yMeta?.units?.[yUnit] ?? ((v) => v)

    const seriesData = data?.series
    const linhas = data?.linhas

    const areas = data?.areas ?? []

    const hasSeries =
        Array.isArray(seriesData) &&
        seriesData.length > 0

    const hasLinhas =
        Array.isArray(linhas) &&
        linhas.length > 0

    let xAxis = {}
    let yAxis = {}
    let tooltip = {}
    let series = []

    // -------------------------
    // FORMATO 1
    // eixoX + series
    // -------------------------
    if (hasSeries) {
        const yValues = seriesData.flatMap((s) => (s.dados ?? []).map(convertY))

        tooltip = {
            trigger: 'axis',
        }

        xAxis = {
            type: 'category',
            data: eixoX?.map(convertX) ?? [],
        }

        yAxis = {
            type: 'value',

            ...getAxisRange(yValues),

            name:
                yUnit
                    ? `${eixos?.y} (${yUnit})`
                    : eixos?.y,
        }

        series = seriesData.map((s) => ({
            name: s.nome,

            type: 'line',

            data: (s.dados ?? []).map(convertY),

            showSymbol:
                options.points ??
                s.mostrarPontos ??
                false,

            lineStyle: {
                opacity:
                    s.mostrarLinha === false
                        ? 0
                        : 1,
            },
        }))
    }

    // -------------------------
    // FORMATO 2
    // linhas com pontos XY
    // -------------------------
    if (hasLinhas) {
        const allPoints = linhas.flatMap((linha) => linha.pontos ?? [])
        const xValues = allPoints.map((p) => convertX(p.x))
        const yValues = allPoints.map((p) => convertY(p.y))
        const xRange = getAxisRange(xValues)
        const yRange = getAxisRange(yValues)

        tooltip = {
            trigger: 'axis',
        }

        xAxis = {
            type: 'value',
            ...xRange,
            name:
                xUnit
                    ? `${eixos?.x} (${xUnit})`
                    : eixos?.x,
            nameLocation: 'middle'
        }

        yAxis = {
            type: 'value',
            ...yRange,
            name:
                yUnit
                    ? `${eixos?.y} (${yUnit})`
                    : eixos?.y,
        }

        const linhasById =
            Object.fromEntries(
                linhas.map((l) => [
                    l.id,
                    l,
                ])
            )

        const lineSeries =
            linhas.map((linha) => ({
                name: linha.nome,

                type: 'line',

                showSymbol: true,

                data:
                    linha.pontos?.map(
                        (p) => [
                            convertX(p.x),
                            convertY(p.y),
                        ]
                    ) ?? [],
            }))

        // -------------------------
        // áreas entre curvas
        // -------------------------
        const areaSeries = []

        if (areas.length > 0) {
            areas.forEach(
                ([idA, idB]) => {
                    const linhaA = linhasById[idA]
                    const linhaB = linhasById[idB]

                    if (!linhaA || !linhaB)
                        return

                    const xs = [...linhaA.pontos.map((p) => p.x),
                    ...linhaB.pontos.map((p) => p.x),]
                        .sort((a, b) => a - b)
                        .filter((x, index, arr) => arr.indexOf(x) === index) // remove x duplicado

                    const validPoints = []

                    // Pontos onde ambas curvas existem
                    xs.forEach((x) => {
                        const yA = interpolateY(linhaA.pontos, x)
                        const yB = interpolateY(linhaB.pontos, x)

                        if (yA !== null &&
                            yB !== null) {
                            validPoints.push({ x, yA, yB })
                        }
                    })

                    if (validPoints.length < 2)
                        return

                    const polygon = []

                    // ida pela curva A
                    validPoints.forEach((p) => { polygon.push([convertX(p.x), convertY(p.yA),]) })

                        // volta pela curva B
                        ;[...validPoints,].reverse()
                            .forEach((p) => { polygon.push([convertX(p.x), convertY(p.yB),]) })


                    areaSeries.push(
                        {
                            name: '',
                            type: 'line',
                            symbol: 'none',
                            lineStyle: { opacity: 0, },
                            areaStyle: { opacity: 0.25, },
                            data: polygon,
                        }
                    )
                }
            )
        }
        series = [
            ...lineSeries,
            ...areaSeries,
        ]
    }

    // -------------------------
    // retorno único
    // -------------------------
    return {
        title: {
            text: titulo,
        },

        tooltip,

        legend: {},

        xAxis,

        yAxis,

        series,
    }
}