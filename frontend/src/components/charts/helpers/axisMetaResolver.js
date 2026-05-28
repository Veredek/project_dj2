export const resolveAxisMeta = (axisLabel) => {
    switch (axisLabel?.toLowerCase()) {
        case 'temperatura':
        case 'temperature':
            return {
                default: '°C',
                units: {
                    '°C': (c) => c,
                    '°F': (c) =>  (c * 9/5) + 32,
                    'K': (c) => c + 273.15,
                },
            }

        case 'pressão':
        case 'pression':
            return {
                default: 'Pa',
                units: {
                    'Pa': (pa) => pa,
                    'atm': (pa) => pa * 0.000009869233,
                    'Bar': (pa) => pa * 0.00001,
                    'mBar': (pa) => pa * 0.01,
                }
            }

        default:
            return {
                default: '',
                units: {},
            }
    }
}