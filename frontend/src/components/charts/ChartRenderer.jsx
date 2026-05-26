import ReactECharts from 'echarts-for-react'
import { resolveChart } from './engine/chartResolver'

export function ChartRenderer({ data }) {
    const option = resolveChart(data)

    return (
        <ReactECharts
            option={option}
            style={{ height: 400 }}
        />
    )
}