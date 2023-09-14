// 종류별 통계
import {Div} from '../../Component'
import {ResultClick} from '../../util'
import {useState, useEffect} from 'react'
import ReactApexChart from 'react-apexcharts'

export function ByType() {
  const byType = {
    type: ['플라스틱', '유리', '종이', '종이팩', '비닐', '패트', '캔'],
    types: ['plastic', 'glass', 'paper', 'paperpack', 'vinyl', 'pet', 'can'],
    ce: [30, 40, 45, 50, 39, 60, 70],
    rm: [30, 40, 45, 50, 39, 60, 70]
  }

  const [trashYearType, setTrashYearType] = useState(byType)
  const [trashMonthType, setTrashMonthType] = useState(byType)
  const [trashTodayType, setTrashTodayType] = useState(byType)

  // 재활용 종류별 통계를 가져오는 함수
  const fetchTrashStatisticsByType = async type => {
    const currentDate = new Date()
    const [currentYear, currentMonth, currentDay] = [
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate()
    ]

    const index = byType['types'].indexOf(type)
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/public/statistics/types/${type}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const datalist = await response.json()

      // 데이터 가공
      const matchingYearData = datalist.filter(dataa => {
        const dataYear = dataa['date'][0]
        return dataYear === currentYear
      })
      const matchingMonthData = datalist.filter(dataa => {
        const [dataYear, dataMonth, dataDay] = dataa['date']
        return dataYear === currentYear && dataMonth === currentMonth
      })
      const matchingTodayData = datalist.filter(dataa => {
        const [dataYear, dataMonth, dataDay] = dataa['date']
        return dataYear === currentYear && dataMonth === currentMonth && dataDay === currentDay
      })
      // 년별 원자재 수익 합, 탄소 배출량 합
      const dataYearrm = matchingYearData.map(data => data['rm'])
      const rmYearSum = dataYearrm.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      const dataYearce = matchingYearData.map(data => data['ce'])
      const ceYearSum = dataYearce.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

      // 월별 원자재 수익 합, 탄소 배출량 합
      const dataMonthrm = matchingMonthData.map(data => data['rm'])
      const rmMonthSum = dataMonthrm.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      const dataMonthce = matchingMonthData.map(data => data['ce'])
      const ceMonthSum = dataMonthce.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

      // 일별 원자재 수익 합, 탄소 배출량 합
      const dataTodayrm = matchingTodayData.map(data => data['rm'])
      const rmTodaySum = dataTodayrm.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      const dataTodayce = matchingTodayData.map(data => data['ce'])
      const ceTodaySum = dataTodayce.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

      // 가공한 데이터로 상태 업데이트
      setTrashYearType(prev => {
        const updatedCE = [...prev.ce]
        updatedCE[index] = ceYearSum

        const updatedRM = [...prev.rm]
        updatedRM[index] = rmYearSum
        return {
          ...prev,
          ce: updatedCE,
          rm: updatedRM
        }
      })
      setTrashMonthType(prev => {
        const updatedCE = [...prev.ce]
        updatedCE[index] = ceMonthSum

        const updatedRM = [...prev.rm]
        updatedRM[index] = rmMonthSum
        return {
          ...prev,
          ce: updatedCE,
          rm: updatedRM
        }
      })
      setTrashTodayType(prev => {
        const updatedCE = [...prev.ce]
        updatedCE[index] = ceTodaySum

        const updatedRM = [...prev.rm]
        updatedRM[index] = rmTodaySum
        return {
          ...prev,
          ce: updatedCE,
          rm: updatedRM
        }
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    // 재활용 종류별 통계
    byType.types.forEach(type => {
      fetchTrashStatisticsByType(type)
    })
  }, [])

  // 일별 막대 그래프 데이터
  const day = {
    options: {
      chart: {
        type: 'bar',
        id: 'basic-bar'
      },
      title: {
        text: '일별 막대 그래프',
        align: 'center'
      },
      xaxis: {
        categories: trashTodayType.type
      }
    },
    series: [
      {
        name: '탄소배출량',
        data: trashTodayType.ce
      },
      {
        name: '원재료 수익',
        data: trashTodayType.rm
      }
    ]
  }
  // 월별 막대 그래프 데이터
  const month = {
    options: {
      chart: {
        type: 'bar',
        id: 'basic-bar'
      },
      title: {
        text: '월별 막대 그래프',
        align: 'center'
      },
      xaxis: {
        categories: trashMonthType.type
      }
    },
    series: [
      {
        name: '탄소배출량',
        data: trashMonthType.ce
      },
      {
        name: '원재료 수익',
        data: trashMonthType.rm
      }
    ]
  }
  // 년별 막대 그래프 데이터
  const year = {
    options: {
      chart: {
        type: 'bar',
        id: 'basic-bar'
      },
      title: {
        text: '년별 종류별 그래프',
        align: 'center'
      },
      xaxis: {
        categories: trashYearType.type
      }
    },
    series: [
      {
        name: '탄소배출량',
        data: trashYearType.ce
      },
      {
        name: '원재료 수익',
        data: trashYearType.rm
      }
    ]
  }

  const TypeClicked = types => {
    setTrashYearType(prev => {
      if (prev.type.includes(types)) {
        const updatedType = prev.type.filter(item => item !== types)
        const updatedCE = prev.ce.filter((_, index) => updatedType.includes(prev.type[index]))
        const updatedRM = prev.rm.filter((_, index) => updatedType.includes(prev.type[index]))
        return {...prev, type: updatedType, ce: updatedCE, rm: updatedRM}
      } else {
        const index = byType['type'].indexOf(types)

        fetchTrashStatisticsByType(byType['types'][index])

        const updatedType = [...prev.type, types]
        const updatedCE = [...prev.ce, trashYearType.ce[index]]
        const updatedRM = [...prev.rm, trashYearType.rm[index]]

        return {
          ...prev,
          type: updatedType,
          ce: updatedCE,
          rm: updatedRM
        }
      }
    })
  }

  const AllTypeClicked = () => {
    setTrashYearType(prev => {
      return {
        ...prev,
        type: ['플라스틱', '유리', '종이', '종이팩', '비닐', '패트', '캔'],
        ce: [30, 40, 45, 50, 39, 60, 70],
        rm: [30, 40, 45, 50, 39, 60, 70]
      }
    })
    setTrashMonthType(prev => {
      return {
        ...prev,
        type: ['플라스틱', '유리', '종이', '종이팩', '비닐', '패트', '캔'],
        ce: [30, 40, 45, 50, 39, 60, 70],
        rm: [30, 40, 45, 50, 39, 60, 70]
      }
    })
    setTrashTodayType(prev => {
      return {
        ...prev,
        type: ['플라스틱', '유리', '종이', '종이팩', '비닐', '패트', '캔'],
        ce: [30, 40, 45, 50, 39, 60, 70],
        rm: [30, 40, 45, 50, 39, 60, 70]
      }
    })
  }

  return (
    <Div className="w-full h-1/2 bg-[#BBDCAB] py-11 border-y-2">
      <div className="flex justify-around flex-grow mb-8">
        {byType.type.map((type, key) => (
          <button className="btn-day" key={key} onClick={() => TypeClicked(type)}>
            {type}
          </button>
        ))}
        <button className="btn-day" onClick={AllTypeClicked}>
          전체 보기
        </button>
      </div>

      <Div className="relative flex w-11/12 p-16 m-auto bg-white rounded-[45px]">
        {/*  */}
        <ResultClick />
        {/*  */}
        <div className="w-1/3">
          <ReactApexChart options={day.options} series={day.series} type="bar" height={350} />
        </div>
        <div className="w-1/3">
          <ReactApexChart options={month.options} series={month.series} type="bar" height={350} />
        </div>
        <div className="w-1/3">
          <ReactApexChart options={year.options} series={year.series} type="bar" height={350} />
        </div>
      </Div>
    </Div>
  )
}
