// 종류별 통계
import {Div} from '../../Component'
import {useState} from 'react'
import ReactApexChart from 'react-apexcharts'

export function ByType() {
  // TODO: 배열말고 key: value 형태의 객체로 해결해야 할 듯
  const byType = ['플라스틱', '유리', '종이', '종이팩', '비닐', '패트', '캔']
  const [trashType, setTrashType] = useState(byType)

  // 일별 막대 그래프 데이터
  const day = {
    options: {
      chart: {
        id: 'basic-bar'
      },
      title: {
        text: '일별 막대 그래프',
        align: 'center'
      },
      xaxis: {
        categories: trashType
      }
    },
    series: [
      {
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70]
      }
    ]
  }
  // 월별 막대 그래프 데이터
  const month = {
    options: {
      chart: {
        id: 'basic-bar'
      },
      title: {
        text: '월별 막대 그래프',
        align: 'center'
      },
      xaxis: {
        categories: trashType
      }
    },
    series: [
      {
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70]
      }
    ]
  }
  // 년별 막대 그래프 데이터
  const year = {
    options: {
      chart: {
        id: 'basic-bar'
      },
      title: {
        text: '년별 종류별 그래프',
        align: 'center'
      },
      xaxis: {
        categories: trashType
      }
    },
    series: [
      {
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70]
      }
    ]
  }

  const TypeClicked = type => {
    setTrashType(prev => {
      if (prev.includes(type)) {
        return prev.filter(item => item !== type)
      } else {
        return [...prev, type]
      }
    })
  }
  const AllTypeClicked = () => {
    setTrashType(['플라스틱', '유리', '종이', '종이팩', '비닐', '패트', '캔'])
  }

  return (
    <Div className="w-full h-1/2 bg-[#BBDCAB] py-11 border-y-2">
      <div className="flex justify-around flex-grow mb-8">
        {byType.map((type, key) => (
          <button className="btn-day" key={key} onClick={() => TypeClicked(type)}>
            {type}
          </button>
        ))}
        <button className="btn-day" onClick={AllTypeClicked}>
          전체 보기
        </button>
      </div>

      <Div className="flex w-4/5 p-8 m-auto bg-white rounded-2xl">
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
