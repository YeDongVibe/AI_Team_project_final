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

  // const byType2 = {
  //   type: [
  //     {
  //       type: 'plastic',
  //       ce: 0,
  //       rm: 0,
  //       yearData: 0,
  //       monthData: 0,
  //       todayData: 0
  //     },
  //     {
  //       type: 'glass',
  //       ce: 0,
  //       rm: 0,
  //       yearData: 0,
  //       monthData: 0,
  //       todayData: 0
  //     },
  //     {type: 'paper', ce: 0, rm: 0, yearData: 0, monthData: 0, todayData: 0},
  //     {type: 'paperpack', ce: 0, rm: 0, yearData: 0, monthData: 0, todayData: 0},
  //     {type: 'vinyl', ce: 0, rm: 0, yearData: 0, monthData: 0, todayData: 0},
  //     {type: 'pet', ce: 0, rm: 0, yearData: 0, monthData: 0, todayData: 0},
  //     {type: 'can', ce: 0, rm: 0, yearData: 0, monthData: 0, todayData: 0}
  //   ]
  // }
  const [trashYearType, setTrashYearType] = useState(byType)

  useEffect(() => {
    // 재활용 종류별 통계
    const currentDate = new Date()
    const [currentYear, currentMonth, currentDay] = [
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate()
    ]

    // 재활용 종류별 통계를 가져오는 함수
    const fetchTrashStatisticsByType = async type => {
      const index = byType[type].indexOf()
      console.log(index)
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/statistics/types/${type}`)
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
        // 가공한 데이터로 상태 업데이트
        setTrashYearType(prev => ({
          ...prev,
          ce: prev[type].ce,
          rm: prev[type].rm
        }))
        console.log(trashYearType)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    byType.types.forEach(type => {
      // console.log(type)
      fetchTrashStatisticsByType(type)
    })

    // fetch(`${process.env.REACT_APP_SERVER_URL}/statistics/types/plastic`)
    //   .then(resp => resp.json())
    //   .then(datalist => {
    //     console.log(datalist)

    //     const matchingYearData = datalist.filter(dataa => {
    //       const dataYear = dataa['date'][0]
    //       return dataYear === currentYear
    //     })
    //     console.log('matchingYearData: ', matchingYearData)

    //     const matchingMonthData = datalist.filter(dataa => {
    //       const [dataYear, dataMonth, dataDay] = dataa['date']
    //       return dataYear === currentYear && dataMonth === currentMonth
    //     })
    //     console.log('matchingMonthData: ', matchingMonthData)

    //     const matchingTodayData = datalist.filter(dataa => {
    //       const [dataYear, dataMonth, dataDay] = dataa['date']
    //       return dataYear === currentYear && dataMonth === currentMonth && dataDay === currentDay
    //     })
    //     console.log('matchingTodayData: ', matchingTodayData)

    //     // 원자재 수익 합
    //     const datarm = matchingYearData.map(data => data['rm'])
    //     const rmSum = datarm.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    //     console.log('rmSum: ', rmSum)

    //     // 탄소 배출량 합
    //     const datace = matchingYearData.map(data => data['ce'])
    //     const ceSum = datace.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    //     console.log('ceSum', ceSum)
    //   })
    //   .catch(err => console.error(err))
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
      if (prev.types.includes(types)) {
        const typeIndex = prev.types.indexOf(types)
        const updatedTypes = prev.types.filter(item => item !== types)
        const updatedCE = prev.ce.slice()
        const updatedRM = prev.rm.slice()
        updatedCE.splice(typeIndex, 1)
        updatedRM.splice(typeIndex, 1)
        return {
          ...prev,
          types: updatedTypes,
          ce: updatedCE,
          rm: updatedRM
        }
      } else {
        const typeIndex = byType.types.indexOf(types)
        return {
          ...prev,
          types: [...prev.types, types],
          ce: [...prev.ce, byType.ce[typeIndex]],
          rm: [...prev.rm, byType.rm[typeIndex]]
        }
      }
    })
  }

  // const TypeClicked = types => {
  //   setTrashYearType(prev => {
  //     console.log(prev)
  //     if (prev.type.includes(types)) {
  //       const updatedType = prev.type.filter(item => item !== types)
  //       const updatedData = prev.data.filter((_, index) => updatedType.includes(prev.type[index]))
  //       return {...prev, type: updatedType, data: updatedData}
  //     } else {
  //       const typeIndex = byType.type.indexOf(types)
  //       const typelength = byType.type.length
  //       let updatedData = [...prev.data]
  //       updatedData = updatedData
  //         .slice(0, typeIndex)
  //         .concat(byType.data[typeIndex], updatedData.slice(typeIndex, typelength))
  //       return {...prev, type: [...prev.type, types], data: updatedData}
  //     }
  //   })
  // }
  const AllTypeClicked = () => {
    setTrashYearType(prev => {
      return {
        ...prev,
        type: ['플라스틱', '유리', '종이', '종이팩', '비닐', '패트', '캔'],
        ce: [30, 40, 45, 50, 39, 60, 70],
        rm: [30, 40, 45, 50, 39, 60, 70]
      }
    })
    // setTrashMonthType(prev => {
    //   return {
    //     ...prev,
    //     type: ['플라스틱', '유리', '종이', '종이팩', '비닐', '패트', '캔'],
    //     ce: [30, 40, 45, 50, 39, 60, 70],
    //     rm: [30, 40, 45, 50, 39, 60, 70]
    //   }
    // })
    // setTrashTodayType(prev => {
    //   return {
    //     ...prev,
    //     type: ['플라스틱', '유리', '종이', '종이팩', '비닐', '패트', '캔'],
    //     ce: [30, 40, 45, 50, 39, 60, 70],
    //     rm: [30, 40, 45, 50, 39, 60, 70]
    //   }
    // })
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
