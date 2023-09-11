import {FileUpload} from '../../Component'
import Chart from 'react-apexcharts'

export default function DataInquiryPage() {
  const state = {
    options: {},
    series: [44, 55, 41, 17, 15],
    labels: ['A', 'B', 'C', 'D', 'E']
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

      <table className="items-center w-2/3 m-auto border-collapse rounded-xl">
        <thead className="flex justify-center w-full text-center border border-collapse">
          <tr className="w-full">
            <th className="w-1/5 px-6 border">종류</th>
            <th className="w-1/5 px-6 border">재활용 가능 여부</th>
            <th className="w-1/5 px-6 border">탄소배출량</th>
            <th className="w-1/5 px-6 border">원재료 수익</th>
            <th className="w-1/5 px-6 border">이미지 상세보기</th>
          </tr>
        </thead>
        <tbody className="flex justify-center w-full text-center border border-collapse">
          <tr className="w-full">
            <td className="px-6 border ">test</td>
            <td className="px-6 border ">test</td>
            <td className="px-6 border ">test</td>
            <td className="px-6 border ">test</td>
            <td className="px-6 border ">test</td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}
