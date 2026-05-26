import { useEffect, useState } from 'react'
import { Data1Chart, Data2Chart, Data3Chart, Data4Chart, Data5Chart } from './components/charts'
import './App.css'

function App() {
  const API_URL = 'http://localhost:8000/api'
  const [data1, setData1] = useState(null)
  const [data2, setData2] = useState(null)
  const [data3, setData3] = useState(null)
  const [data4, setData4] = useState(null)
  const [data5, setData5] = useState(null)

  useEffect(() => {
    const fetchChart = async (filename) => {
      const response = await fetch(`${API_URL}/data/${filename}/`)
      if (!response.ok) {
        throw new Error('Erro ao buscar dados')
      }

      return response.json()
    }

    Promise.all([
      fetchChart('data1'),
      fetchChart('data2'),
      fetchChart('data3'),
      fetchChart('data4'),
      fetchChart('data5'),
    ])
      .then(([chart1, chart2, chart3, chart4, chart5]) => {
        setData1(chart1)
        setData2(chart2)
        setData3(chart3)
        setData4(chart4)
        setData5(chart5)
      })
      .catch((err) => {
        console.error('Erro ao buscar dados:', err)
      })
  }, [])

  return (
    <>
      <div className="App">
        <h1>Dashboard</h1>
      </div>
      <div>
        {data1 && <Data1Chart data={data1} />}
        {data2 && <Data2Chart data={data2} />}
        {data3 && <Data3Chart data={data3} />}
        {data4 && <Data4Chart data={data4} />}
        {data5 && <Data5Chart data={data5} />}
      </div>
    </>
  )
}

export default App

