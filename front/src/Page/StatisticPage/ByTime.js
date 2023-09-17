// 시간별 통계
import {useEffect, useState, useRef} from 'react'
import {Div} from '../../Component'
import {ResultClick} from '../../util'
import ReactApexChart from 'react-apexcharts'

export function ByTime() {
  const startDateRef = useRef(null)
  const endDateRef = useRef(null)

  const [isTime, setIsTime] = useState(false)
  const [fetchData, setFetchData] = useState({})
  const [fetchCE, setFetchCE] = useState([])
  const [fetchRM, setFetchRM] = useState([])

  // 오늘 날짜
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0')
  const currentDay = currentDate.getDate().toString().padStart(2, '0')

  const oneMonthAgoDate = new Date(currentDate)
  oneMonthAgoDate.setMonth(currentDate.getMonth() - 1)
  const oneMonthAgoYear = oneMonthAgoDate.getFullYear()
  const oneMonthAgoMonth = (oneMonthAgoDate.getMonth() + 1).toString().padStart(2, '0')
  const oneMonthAgoDay = oneMonthAgoDate.getDate().toString().padStart(2, '0')

  const threeMonthsAgoDate = new Date(currentDate)
  threeMonthsAgoDate.setMonth(currentDate.getMonth() - 3)
  const threeMonthsAgoYear = threeMonthsAgoDate.getFullYear()
  const threeMonthsAgoMonth = (threeMonthsAgoDate.getMonth() + 1).toString().padStart(2, '0')
  const threeMonthsAgoDay = threeMonthsAgoDate.getDate().toString().padStart(2, '0')

  const sixMonthsAgoDate = new Date(currentDate)
  sixMonthsAgoDate.setMonth(currentDate.getMonth() - 6)
  const sixMonthsAgoYear = sixMonthsAgoDate.getFullYear()
  const sixMonthsAgoMonth = (sixMonthsAgoDate.getMonth() + 1).toString().padStart(2, '0')
  const sixMonthsAgoDay = sixMonthsAgoDate.getDate().toString().padStart(2, '0')

  const today = `${currentYear}-${currentMonth}-${currentDay}`
  const oneMonthBtn = `${oneMonthAgoYear}-${oneMonthAgoMonth}-${oneMonthAgoDay}`
  const threeMonthBtn = `${threeMonthsAgoYear}-${threeMonthsAgoMonth}-${threeMonthsAgoDay}`
  const sixMonthBtn = `${sixMonthsAgoYear}-${sixMonthsAgoMonth}-${sixMonthsAgoDay}`

  const monthType = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const minite = [0, 10, 20, 30, 40, 50]

  // redux로 뺄지 고민 중
  const [isSelfInput, setIsSelfInput] = useState(false)
  const timeRanges = [
    {start: '00:00', end: '01:00'},
    {start: '01:00', end: '02:00'},
    {start: '02:00', end: '03:00'},
    {start: '03:00', end: '04:00'},
    {start: '04:00', end: '05:00'},
    {start: '05:00', end: '06:00'},
    {start: '06:00', end: '07:00'},
    {start: '07:00', end: '08:00'},
    {start: '08:00', end: '09:00'},
    {start: '09:00', end: '10:00'},
    {start: '10:00', end: '11:00'},
    {start: '11:00', end: '12:00'},
    {start: '12:00', end: '13:00'},
    {start: '13:00', end: '14:00'},
    {start: '14:00', end: '15:00'},
    {start: '15:00', end: '16:00'},
    {start: '16:00', end: '17:00'},
    {start: '17:00', end: '18:00'},
    {start: '18:00', end: '19:00'},
    {start: '19:00', end: '20:00'},
    {start: '20:00', end: '21:00'},
    {start: '21:00', end: '22:00'},
    {start: '22:00', end: '23:00'},
    {start: '23:00', end: '00:00'}
  ]

  // LineChart
  const state = {
    series: [
      {
        name: '탄소배출량',
        data: fetchCE
      },
      {
        name: '원재료 수익',
        data: fetchRM
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
          colors: ['#FFFFFF', 'transparent'],
          opacity: 0.5
        }
      },
      xaxis: {
        categories: isTime ? minite : monthType
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
    FetchByTime(today, today)
  }, [])

  const selfInput = () => {
    if (!isSelfInput) setIsSelfInput(true)
    else setIsSelfInput(false)
  }

  const TimeSelectOnChange = e => {
    // 시간별 통계
    const selectValue = e.target.value
    setIsTime(true)
    // console.log(selectValue)

    if (selectValue === '오늘') {
      setIsTime(false)
    } else {
      const startTime = selectValue.slice(0, 5)
      const endTime = selectValue.slice(8)

      fetch(`${process.env.REACT_APP_SERVER_URL}/public/statistics/times/${startTime}/${endTime}`)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => error.message)
    }
  }

  const DateSelectOnClicked = () => {
    const startDate = startDateRef.current?.value
    const endDate = endDateRef.current?.value
    FetchByTime(startDate, endDate)
  }

  const FetchByTime = (date1, date2) => {
    setFetchData({})
    setIsTime(false)

    console.log(`${process.env.REACT_APP_SERVER_URL}/public/statistics/days/${date1}/${date2}`)
    fetch(`${process.env.REACT_APP_SERVER_URL}/public/statistics/days/${date1}/${date2}`)
      .then(response => response.json())
      .then(datalist => {
        console.log(datalist)
        // 데이터를 날짜로 그룹화하는 객체 생성
        const dataByDate = {}

        // 데이터를 날짜별로 그룹화
        datalist.forEach(data => {
          const dateKey = monthType[data['date'][1]]
          if (!dataByDate[dateKey]) {
            dataByDate[dateKey] = []
          }
          dataByDate[dateKey].push(data)
        })

        // 그룹화된 데이터 확인
        setFetchData(dataByDate)
        const CEData = []
        const RMData = []
        monthType.forEach(month => {
          if (dataByDate[month]) {
            const ceSum = dataByDate[month].reduce((accumulator, currentValue) => accumulator + currentValue['ce'], 0)
            const rmSum = dataByDate[month].reduce((accumulator, currentValue) => accumulator + currentValue['rm'], 0)
            CEData.push(ceSum)
            RMData.push(rmSum)
          } else {
            CEData.push(0)
            RMData.push(0)
          }
        })
        setFetchCE(CEData)
        setFetchRM(RMData)
      })
      .catch(err => err.message)
  }

  return (
    <Div className="w-full h-1/2 bg-[#BBDCAB] py-11 ">
      <div className="flex justify-around flex-grow mb-8">
        <select className="h-full px-8 py-2 text-black bg-white btn" onChange={TimeSelectOnChange}>
          <option value="오늘">오늘</option>
          {timeRanges.map((timeRange, index) => (
            <option key={index} value={`${timeRange.start} ~ ${timeRange.end}`}>
              {`${timeRange.start} ~ ${timeRange.end}`}
            </option>
          ))}
        </select>
        <button className="btn-day" onClick={() => FetchByTime(oneMonthBtn, today)}>
          1개월
        </button>
        <button className="btn-day" onClick={() => FetchByTime(threeMonthBtn, today)}>
          3개월
        </button>
        <button className="btn-day" onClick={() => FetchByTime(sixMonthBtn, today)}>
          6개월
        </button>
        <button className="btn-day" onClick={selfInput}>
          직접 입력
        </button>
      </div>

      {/* 직접 입력 창 */}
      {isSelfInput && (
        <div className="flex justify-center w-full mb-10">
          <input type="date" className="input" ref={startDateRef} /> {/* 시작 */}
          <span className="mx-4 font-bold text-center align-items">~</span>
          <input type="date" className="input" ref={endDateRef} /> {/* 끝 */}
          <button className="ml-6 btn" onClick={DateSelectOnClicked}>
            확인
          </button>
        </div>
      )}

      <Div className="relative w-2/3 p-16 m-auto bg-white rounded-[45px]">
        <ResultClick />
        <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
      </Div>
    </Div>
  )
}
