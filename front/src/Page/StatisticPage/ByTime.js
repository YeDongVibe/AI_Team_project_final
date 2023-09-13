// 시간별 통계
import {Div} from '../../Component'
import {ResultClick} from '../../util'
import ReactApexChart from 'react-apexcharts'

export function ByTime() {
  // LineChart
  const state = {
    series: [
      {
        name: '탄소배출량',
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      },
      {
        name: '원재료 수익',
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      }
    ],
    options: {
      chart: {
        selection: {
          enabled: true
        },
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        },
        background: '#FFFFFF'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: '특정 기간의 탄소배출량 원자재수익 그래프',
        align: 'center'
      },
      grid: {
        row: {
          colors: ['#FFFFFF', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
      },
      toolbar: {
        tools: {
          download: '<img src="/static/icons/download.png" className="text-2xl ico-download" width="40">'
        },
        export: {
          csv: {
            filename: undefined,
            columnDelimiter: ',',
            headerCategory: 'category',
            headerValue: 'value',
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString()
            }
          },
          svg: {
            filename: 1
          },
          png: {
            filename: 2
          }
        }
      }
    }
  }

  const selfInput = () => {}

  return (
    <Div className="w-full h-1/2 bg-[#BBDCAB] py-11 ">
      <div className="flex justify-around flex-grow mb-8">
        <button className="btn-day">오늘</button>
        <button className="btn-day">1개월</button>
        <button className="btn-day">3개월</button>
        <button className="btn-day">6개월</button>
        <button className="btn-day">직접 입력</button>
      </div>
      <Div className="relative w-2/3 p-16 m-auto bg-white rounded-[45px]">
        <ResultClick />
        <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
      </Div>
    </Div>
  )
}
