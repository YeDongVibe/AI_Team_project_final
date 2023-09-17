// 테이블 보기
import {Div, Pagination} from '../../Component'
import {useLocation} from 'react-router-dom'
import {useEffect, useState} from 'react'

export function ResultInfo() {
  const location = useLocation()

  const [page, setPage] = useState(1)
  const limit = 30
  const [total, setTotal] = useState(0)
  const offset = (page - 1) * limit

  const [fetchData, setFetchData] = useState()

  useEffect(() => {
    console.log(location)

    if (location.state.chart === undefined) {
      const datas = location.state.data.map((data, index) => (
        <tr key={index} className="text-center border-4">
          <td className="border-4">{data.category}</td>
          <td className="border-4">{data.state ? '가능' : '불가능'}</td>
          <td className="border-4">{data.ce}</td>
          <td className="border-4">{data.rm}</td>
          <td className="text-sm border-4 cursor-pointer hover:bg-lime-200">이미지</td>
        </tr>
      ))
      setTotal(datas.length)
      setFetchData(datas)
    } else {
      const types = location.state.data
      const tableRow = Object.keys(types).map(key =>
        types[key]['data'].map((data, index) => (
          <tr key={index} className="text-center border-2">
            <td className="border-4">{data.category}</td>
            <td className="border-4">{data.state ? '가능' : '불가능'}</td>
            <td className="border-4">{data.ce}</td>
            <td className="border-4">{data.rm}</td>
            <td className="text-sm border-4 cursor-pointer hover:bg-lime-200">이미지</td>
          </tr>
        ))
      )
      const tableData = tableRow.flatMap(data => data)
      setTotal(tableData.length)
      setFetchData(tableData)
    }
  }, [])

  useEffect(() => {
    console.log('fetchData: ', fetchData)
  }, [fetchData])

  return (
    <div className="w-full h-1/2 bg-[#BBDCAB] py-11 ">
      <table className="items-center w-3/4 m-auto mb-8 bg-white border-collapse rounded-xl">
        <thead>
          <tr className="w-full">
            <th className="w-1/6 px-6 border-4">종류</th>
            <th className="w-1/6 px-6 border-4">재활용 가능 여부</th>
            <th className="w-1/6 px-6 border-4">탄소배출량</th>
            <th className="w-1/6 px-6 border-4">원재료 수익</th>
            <th className="w-1/6 px-6 border-4">이미지 상세보기</th>
          </tr>
        </thead>
        <tbody>{fetchData && fetchData.slice(offset, offset + limit).map(data => data)}</tbody>
      </table>

      <Pagination total={total} limit={limit} page={page} setPage={setPage} />
    </div>
  )
}
