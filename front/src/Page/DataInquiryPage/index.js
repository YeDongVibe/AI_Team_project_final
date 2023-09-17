import {FileUpload, Pagination} from '../../Component'
import Chart from 'react-apexcharts'
import {useEffect, useState} from 'react'
import {getCookie, getUserInfoFromToken} from '../../util/Cookie'
import {ImageModal} from './ImageModal'
import {ImageUpload} from './ImageUpload'

export default function DataInquiryPage() {
  const [modalOpen, setModalOpen] = useState(false)

  const [fetchData, setFetchData] = useState()
  const [fetchDate, setFetchDate] = useState()
  const [chartData, setChartData] = useState([0, 0, 0, 0, 0, 0, 0, 0])
  const [nonChartData, setNonChartData] = useState([0, 0, 0, 0, 0, 0, 0, 0])

  const [isManager, setIsManager] = useState(false)

  const [page, setPage] = useState(1)
  const limit = 30
  const [total, setTotal] = useState(0)
  const offset = (page - 1) * limit

  useEffect(() => {
    const cookie = getCookie('accessToken')
    if (cookie) {
      const user = getUserInfoFromToken()
      if (user.authority === '[ROLE_MANAGER]') setIsManager(true)
      else setIsManager(false)
    }

    fetch(`${process.env.REACT_APP_SERVER_URL}/public/statistics/readAllRecycle`)
      .then(resp => resp.json())
      .then(datalist => {
        console.log(datalist)
        setTotal(datalist.length)
        const data = datalist.map((data, index) => (
          <tr className="w-full" key={index}>
            <td className="px-6 border ">{data.category}</td>
            <td className="px-6 border ">{data.state === 'true' ? '가능' : '불가능'}</td>
            <td className="px-6 border ">{data.ce}</td>
            <td className="px-6 border ">{data.rm}</td>
            <td className="px-6 border cursor-pointer" onClick={() => ImageOnClicked(data['date'], data['time'])}>
              이미지 보기
            </td>
          </tr>
        ))
        setFetchData(data)
        const chartDatas = [0, 0, 0, 0, 0, 0, 0, 0]
        const nonChartDatas = [0, 0, 0, 0, 0, 0, 0, 0]
        datalist.forEach(data => {
          const index = byType.types.indexOf(data.category)
          if (data.state === 'true') {
            chartDatas[index] += data.count
            setChartData(chartDatas)
          } else {
            nonChartDatas[index] += data.count
            setNonChartData(nonChartDatas)
          }
        })
      })
      .catch(err => err.message)
  }, [isManager])

  const ImageOnClicked = (date, time) => {
    setFetchDate({dates: date, times: time})
    setModalOpen(true)
  }

  const byType = {
    type: ['플라스틱', '유리', '종이', '종이팩', '비닐', '패트', '캔', '기타'],
    types: ["'plastic'", "'glass'", "'paper'", "'paperpack'", "'vinyl'", "'pet'", "'can'", 'etc'],
    data: [30, 40, 45, 50, 39, 60, 70, 10]
  }

  const stateTrue = {
    options: {
      title: {
        text: '재활용 가능',
        align: 'center'
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true
              }
            }
          }
        }
      },
      labels: byType.type
    },
    series: chartData
  }
  const stateFalse = {
    options: {
      title: {
        text: '재활용 불가능',
        align: 'center'
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true
              }
            }
          }
        }
      },
      labels: byType.type
    },
    series: nonChartData
  }

  return (
    <section className="w-full pt-[120px]">
      {isManager && (
        <div className="w-full mb-16">
          <div className="m-8 text-3xl font-bold ">파일 업로드</div>
          <FileUpload />
        </div>
      )}

      {isManager && (
        <div className="w-full mb-16">
          <div className="m-8 text-3xl font-bold">이미지 업로드</div>
          <ImageUpload />
        </div>
      )}

      <div className="flex items-center my-10 justify-evenly md:flex-col sm:flex-col">
        <Chart options={stateTrue.options} series={stateTrue.series} type="donut" width="380" />
        <Chart options={stateFalse.options} series={stateFalse.series} type="donut" width="380" />
      </div>
      {/*  */}

      <table className="items-center w-3/4 m-auto mb-8 border-collapse rounded-xl">
        <thead>
          <tr className="w-full">
            <th className="w-1/5 px-6 border">종류</th>
            <th className="w-1/5 px-6 border">재활용 가능 여부</th>
            <th className="w-1/5 px-6 border">탄소배출량</th>
            <th className="w-1/5 px-6 border">원재료 수익</th>
            <th className="w-1/5 px-6 border">이미지 상세보기</th>
          </tr>
        </thead>
        <tbody>{fetchData && fetchData.slice(offset, offset + limit).map(data => data)}</tbody>
      </table>

      <Pagination total={total} limit={limit} page={page} setPage={setPage} />

      {fetchDate && (
        <ImageModal open={modalOpen} setOpen={setModalOpen} date={fetchDate.dates} time={fetchDate.times} />
      )}
    </section>
  )
}
