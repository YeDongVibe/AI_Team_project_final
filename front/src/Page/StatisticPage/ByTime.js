// 시간별 통계
import {useEffect} from 'react'
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

  useEffect(() => {
    //일자별 통계
    // fetch(`${process.env.REACT_APP_SERVER_URL}/days/${day}/${day2}`)
    //   .then(response => response.json())
    //   .then(data => console.log(data))
    //   .catch(err => err.message)
  }, [])

  const selfInput = () => {}

  return (
    <Div className="w-full h-1/2 bg-[#BBDCAB] py-11 ">
      <div className="flex justify-around flex-grow mb-8">
        <select className="btn-day" defaultChecked="오늘">
          <options className="text-black">오늘</options>
        </select>
        <button className="btn-day">1개월</button>
        <button className="btn-day">3개월</button>
        <button className="btn-day">6개월</button>
        <button className="btn-day" onClick={selfInput}>
          직접 입력
        </button>
      </div>

      {/* 시간대 input */}
      {/* <div>
        <select></select>
      </div> */}

      {/* 직접 입력 창 */}
      <div className="w-full ">
        <input type="date" />
        <span>~</span>
        <input type="date" />
      </div>

      <Div className="relative w-2/3 p-16 m-auto bg-white rounded-[45px]">
        <ResultClick />
        <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
      </Div>
    </Div>
  )
}
