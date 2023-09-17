// 재활용 판별 결과박스
import {useEffect, useState} from 'react'
import {Div} from '../../Component'
import {json, useLocation} from 'react-router-dom'
import ReactApexChart from 'react-apexcharts'

export function ResultBox() {
  const location = useLocation()

  const [chart, setChart] = useState()

  useEffect(() => {
    console.log(location.state)

    if (location.state.chart === undefined) {
      const jsonString = location.state.linechart
      const parseObject = JSON.parse(jsonString)
      setChart(
        <Div className="relative w-2/3 p-16 m-auto bg-white rounded-[45px]">
          <ReactApexChart options={parseObject.options} series={parseObject.series} type="line" height={350} />
        </Div>
      )
      console.log(parseObject)
    } else {
      const chartdata = location.state.chart.map((data, index) => (
        <div className="w-1/3" key={index}>
          <ReactApexChart options={data.options} series={data.series} type="bar" height={350} />
        </div>
      ))
      setChart(chartdata)
    }
  }, [])

  return (
    <Div className="w-full h-1/2 bg-[#BBDCAB] py-11 ">
      <Div className="relative flex w-11/12 p-16 m-auto bg-white rounded-[45px]">{chart}</Div>
    </Div>
  )
}
