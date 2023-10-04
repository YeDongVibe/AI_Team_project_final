// 테이블 보기
import {Pagination} from '../../Component'
import {useLocation} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {ImageModal} from '../DataInquiryPage/ImageModal'

export function ResultInfo() {
  const location = useLocation()

  const [modalOpen, setModalOpen] = useState(false)

  const [id, setId] = useState(0)
  const [page, setPage] = useState(1)
  const limit = 30
  const [total, setTotal] = useState(0)
  const offset = (page - 1) * limit

  const [fetchData, setFetchData] = useState()

  useEffect(() => {
    if (location.state.chart === undefined) {
      const datas = location.state.data.map((data, index) => (
        <tr key={index} className="text-center border-4">
          <td className="border-4">{data.detect_log_id}</td>
          <td className="border-4">{data.category}</td>
          <td className="border-4">{data.state ? '가능' : '가능'}</td>
          <td className="border-4">{`${data.date[0]}-${data.date[1] < 10 ? '0' + data.date[1] : data.date[1]}-${
            data.date[2] < 10 ? '0' + data.date[2] : data.date[2]
          }`}</td>
          <td className="border-4">{`${data.time[0] < 10 ? '0' + data.time[0] : data.time[0]}:${
            data.time[1] < 10 ? '0' + data.time[1] : data.time[1]
          }:${data.time[2] < 10 ? '0' + data.time[2] : data.time[2]}`}</td>
          <td className="border-4">{data.ce}</td>
          <td className="border-4">{data.rm}</td>
          <td
            className="text-sm border-4 cursor-pointer hover:bg-lime-200"
            onClick={() => imgClicked(data.detect_log_id)}>
            이미지 보기
          </td>
        </tr>
      ))
      setTotal(datas.length)
      setFetchData(datas)
    } else {
      const types = location.state.data
      const tableRow = Object.keys(types).map(key =>
        types[key]['data'].map((data, index) => (
          <tr key={index} className="text-center border-2">
            <td className="border-4">{data.detect_log_id}</td>
            <td className="border-4">{data.category}</td>
            <td className="border-4">{data.state ? '가능' : '가능'}</td>
            <td className="border-4">{`${data.date[0]}-${data.date[1] < 10 ? '0' + data.date[1] : data.date[1]}-${
              data.date[2] < 10 ? '0' + data.date[2] : data.date[2]
            }`}</td>
            <td className="border-4">{`${data.time[0] < 10 ? '0' + data.time[0] : data.time[0]}:${
              data.time[1] < 10 ? '0' + data.time[1] : data.time[1]
            }`}</td>
            <td className="border-4">{data.ce}</td>
            <td className="border-4">{data.rm}</td>
            <td
              className="text-sm border-4 cursor-pointer hover:bg-lime-200"
              onClick={() => imgClicked(data.detect_log_id)}>
              이미지 보기
            </td>
          </tr>
        ))
      )
      const tableData = tableRow.flatMap(data => data)
      setTotal(tableData.length)
      setFetchData(tableData)
    }
  }, [])

  const imgClicked = id => {
    setId(id)
    if (modalOpen) setModalOpen(false)
    else setModalOpen(true)
  }

  return (
    <div className="w-full h-1/2 ">
      <div className="w-4/5 h-full bg-[#BBDCAB] p-16 m-auto">
        <table className="items-center w-full m-auto mb-8 bg-white border-collapse rounded-xl">
          <thead>
            <tr className="w-full">
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

        <ImageModal open={modalOpen} setOpen={setModalOpen} id={id} />

        <Pagination total={total} limit={limit} page={page} setPage={setPage} />
      </div>
    </div>
  )
}
