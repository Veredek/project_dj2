import { buildBar } from './optionBuilders/bar'
import { buildLine } from './optionBuilders/line'
import { buildPie } from './optionBuilders/pie'
import { buildMultiAxisLine } from './optionBuilders/multiAxisLine'
import { buildScatterWCurves } from './optionBuilders/scatter_w_curves'

export function resolveChart(
    data,
    { xUnit, yUnit, xMeta, yMeta } = {}
) {
    switch (data.tipo ?? data.type) {
        case 'barras':
            return buildBar(data)

        case 'linha':
            return buildLine(data)

        case 'pizza':
            return buildPie(data)

        case 'linha_3_eixos':
            return buildMultiAxisLine(data)

        case 'linha_com_pontos':
            return buildLine(data, { xUnit, yUnit, xMeta, yMeta, points: true })

        case 'scatter_w_curves':
            return buildScatterWCurves(data)

        default:
            throw new Error(`Tipo desconhecido: ${data.tipo ?? data.type}`)
    }
}