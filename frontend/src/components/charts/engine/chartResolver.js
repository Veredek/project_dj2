import { buildBar } from './optionBuilders/bar'
import { buildLine } from './optionBuilders/line'
import { buildPie } from './optionBuilders/pie'
import { buildMultiAxisLine } from './optionBuilders/multiAxisLine'

export function resolveChart(data) {
    switch (data.tipo) {
        case 'barras':
            return buildBar(data)

        case 'linha':
            return buildLine(data)

        case 'pizza':
            return buildPie(data)

        case 'linha_3_eixos':
            return buildMultiAxisLine(data)

        case 'linha_com_pontos':
            return buildLine(data, { points: true })

        default:
            throw new Error(`Tipo desconhecido: ${data.tipo}`)
    }
}