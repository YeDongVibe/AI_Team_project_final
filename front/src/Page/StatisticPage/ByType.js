// 종류별 통계
import {Div} from '../../Component'
import {ResultClick} from '../../util'
import {useState, useEffect} from 'react'
import ReactApexChart from 'react-apexcharts'

export function ByType() {
  // TODO: 배열말고 key: value 형태의 객체로 해결해야 할 듯
  const byType = {
    type: ['플라스틱', '유리', '종이', '종이팩', '비닐', '패트', '캔'],
    data: [30, 40, 45, 50, 39, 60, 70]
  }
  const [trashType, setTrashType] = useState(byType)

  useEffect(() => {
    //
    fetch(`${process.env.REACT_APP_SERVER_URL}/statistics/types/{type}`)
      .then(resp => resp.json())
      .then(data => console.log(data))
      .catch(err => console.error(err))
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
        categories: trashType.type
      }
    },
    series: [
      {
        name: '탄소배출량',
        data: trashType.data
      },
      {
        name: '원재료 수익',
        data: trashType.data
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
        categories: trashType.type
      }
    },
    series: [
      {
        name: '탄소배출량',
        data: trashType.data
      },
      {
        name: '원재료 수익',
        data: trashType.data
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
        categories: trashType.type
      }
    },
    series: [
      {
        name: '탄소배출량',
        data: trashType.data
      },
      {
        name: '원재료 수익',
        data: trashType.data
      }
    ]
  }

  const TypeClicked = types => {
    setTrashType(prev => {
      console.log(prev)
      if (prev.type.includes(types)) {
        const updatedType = prev.type.filter(item => item !== types)
        const updatedData = prev.data.filter((_, index) => updatedType.includes(prev.type[index]))
        return {...prev, type: updatedType, data: updatedData}
      } else {
        const typeIndex = byType.type.indexOf(types)
        const typelength = byType.type.length
        let updatedData = [...prev.data]
        updatedData = updatedData
          .slice(0, typeIndex)
          .concat(byType.data[typeIndex], updatedData.slice(typeIndex, typelength))
        return {...prev, type: [...prev.type, types], data: updatedData}
      }
    })
  }
  const AllTypeClicked = () => {
    setTrashType(prev => {
      return {
        ...prev,
        type: ['플라스틱', '유리', '종이', '종이팩', '비닐', '패트', '캔'],
        data: [30, 40, 45, 50, 39, 60, 70]
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
