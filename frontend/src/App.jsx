import { useEffect, useState } from 'react'
import { ChartRenderer } from './components/charts/ChartRenderer'
import './App.css'

function App() {
  const API_URL = 'http://localhost:8000/api'

  const [charts, setCharts] = useState([])

  useEffect(() => {
    const fetchChart = async (filename) => {
      const response = await fetch(
        `${API_URL}/data/${filename}/`
      )

      if (!response.ok) {
        throw new Error('Erro ao buscar dados')
      }

      return response.json()
    }

    const files = [
      'data1',
      'data2',
      'data3',
      'data4',
      'data5',
      'data6',
    ]

    Promise.all(
      files.map((file) => fetchChart(file))
    )
      .then((results) => {
        setCharts(results)
      })
      .catch((err) => {
        console.error(
          'Erro ao buscar dados:',
          err
        )
      })
  }, [])

  return (
    <>
      <div className="App">
        <h1>Dashboard</h1>
      </div>

      <div>
        {charts.map((chart, index) => (
          <ChartRenderer
            key={index}
            data={chart}
          />
        ))}
      </div>
    </>
  )
}

export default App