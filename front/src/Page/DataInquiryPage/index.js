import {FileUpload, Pagination} from '../../Component'
import Chart from 'react-apexcharts'
import {useEffect, useState} from 'react'
import {getCookie, getUserInfoFromToken} from '../../util/Cookie'
import {ImageModal} from './ImageModal'
import {ImageUpload} from './ImageUpload'

export default function DataInquiryPage() {
  const [modalOpen, setModalOpen] = useState(false)

  const [fetchData, setFetchData] = useState()
  const [chartData, setChartData] = useState([0, 0, 0, 0, 0, 0, 0, 0])
  const [nonChartData, setNonChartData] = useState([0, 0, 0, 0, 0, 0, 0, 0])

  const [isManager, setIsManager] = useState(false)

  const [id, setId] = useState(1)
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
        setTotal(datalist.length)
        const data = datalist.map((data, index) => (
          <tr className="w-full md:text-sm sm:text-xs" key={index}>
            <td className="px-6 text-center border-4">{data.detect_log_id}</td>
            <td className="px-6 text-center border-4">{data.category}</td>
            <td className="px-6 text-center border-4">{data.state === 'true' ? '가능' : '불가능'}</td>
            <td className="px-6 text-center border-4">{`${data.date[0]}-${
              data.date[1] < 10 ? '0' + data.date[1] : data.date[1]
            }-${data.date[2] < 10 ? '0' + data.date[2] : data.date[2]}`}</td>
            <td className="px-6 text-center border-4">{`${data.time[0] < 10 ? '0' + data.time[0] : data.time[0]}:${
              data.time[1] < 10 ? '0' + data.time[1] : data.time[1]
            }`}</td>
            <td className="px-6 text-right border-4">{data.ce}</td>
            <td className="px-6 text-right border-4">{data.rm}</td>
            <td
              className="px-6 text-sm text-center border-4 cursor-pointer hover:bg-lime-200"
              onClick={() => ImageOnClicked(data['detect_log_id'])}>
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

  const ImageOnClicked = id => {
    setId(id)
    setModalOpen(true)
  }

  const byType = {
    type: ['플라스틱', '유리', '종이', '종이팩', '비닐', '패트', '캔', '기타'],
    types: ['plastic', 'glass', 'paper', 'paperpack', 'vinyl', 'pet', 'can', 'etc'],
    data: [0, 0, 0, 0, 0, 0, 0, 0]
  }

  const stateTrue = {
    options: {
      colors: ['#FF0000', '#FFA43A', '#FFFC29', '#19FF00', '#00F2FF', '#0015FF', '#A500FF', '#834532'],
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
      colors: ['#FF0000', '#FFA43A', '#FFFC29', '#19FF00', '#00F2FF', '#0015FF', '#A500FF', '#834532'],
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

      <table className="items-center w-3/4 m-auto mb-8 border-4 border-collapse rounded-xl">
        <thead>
          <tr className="w-full md:text-sm sm:text-xs">
            <th className="px-6 border-4 w-1/8">번호</th>
            <th className="px-6 border-4 w-1/8">종류</th>
            <th className="px-6 border-4 w-1/8">재활용 가능 여부</th>
            <th className="px-6 border-4 w-1/8">날짜</th>
            <th className="px-6 border-4 w-1/8">시간</th>
            <th className="px-6 border-4 w-1/8">탄소배출량</th>
            <th className="px-6 border-4 w-1/8">원재료 수익</th>
            <th className="px-6 border-4 w-1/8">이미지 상세보기</th>
          </tr>
        </thead>
        <tbody>{fetchData && fetchData.slice(offset, offset + limit).map(data => data)}</tbody>
      </table>

      <Pagination total={total} limit={limit} page={page} setPage={setPage} />

      <ImageModal open={modalOpen} setOpen={setModalOpen} id={id} />
    </section>
  )
}
