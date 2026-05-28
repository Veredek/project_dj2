export function getAxisRange(values, paddingPercent = 0, decimals = 1) {
    if (!values.length) return {}

    const min = Math.min(...values)
    const max = Math.max(...values)

    const span = max - min || Math.abs(max) || 1
    const padding = span * paddingPercent
    const factor = decimals >= 1 ? 10 ** decimals : 1

    return {
        min: Math.floor((min - padding) * factor) / factor,
        max: Math.ceil((max + padding) * factor) / factor,
    }
}