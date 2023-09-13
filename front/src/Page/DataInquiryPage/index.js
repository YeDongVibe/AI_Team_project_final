import {FileUpload} from '../../Component'
import Chart from 'react-apexcharts'
import {useEffect, useState} from 'react'

import {ImageModal} from './ImageModal'

export default function DataInquiryPage() {
  const [modalOpen, setModalOpen] = useState(true)

  useEffect(() => {
    // fetch(`${process.env.REACT_APP_SERVER_URL}/statistics/readAllRecycle`)
    //   .then(resp => resp.json())
    //   .then(data => console.log(data))
    //   .catch(err => console.error(err))
  }, [])

  const byType = {
    type: ['플라스틱', '유리', '종이', '종이팩', '비닐', '패트', '캔'],
    data: [30, 40, 45, 50, 39, 60, 70]
  }

  const state = {
    options: {
      plotOptions: {
        pie: {
          donut: {
            dataLabels: {
              show: true,
              name: {
                show: true
              },
              value: {series: [44, 55, 41, 17, 15]}
            }
          }
        }
      },
      labels: byType.type
    },
    series: byType.data
  }
  return (
    <section className="w-full pt-[120px]">
      <div className="m-8 text-3xl font-bold ">파일 업로드</div>
      <FileUpload />
      <div className="flex justify-center my-10 ">
        <Chart options={state.options} series={state.series} type="donut" width="380" />
        <Chart options={state.options} series={state.series} type="donut" width="380" />
      </div>
      {/*  */}

      <table className="items-center w-3/4 m-auto border-collapse rounded-xl">
        <tr className="w-full">
          <th className="w-1/5 px-6 border">종류</th>
          <th className="w-1/5 px-6 border">재활용 가능 여부</th>
          <th className="w-1/5 px-6 border">탄소배출량</th>
          <th className="w-1/5 px-6 border">원재료 수익</th>
          <th className="w-1/5 px-6 border">이미지 상세보기</th>
        </tr>
        <tr className="w-full">
          <td className="px-6 border ">test</td>
          <td className="px-6 border ">test</td>
          <td className="px-6 border ">test</td>
          <td className="px-6 border ">test</td>
          <td className="px-6 border ">test</td>
        </tr>
      </table>

      {/* <ImageModal open={modalOpen} /> */}
    </section>
  )
}
