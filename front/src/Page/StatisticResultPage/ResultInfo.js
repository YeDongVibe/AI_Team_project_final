// 테이블 보기
import {Div} from '../../Component'
import {useLocation} from 'react-router-dom'
import {useEffect} from 'react'

export function ResultInfo() {
  const location = useLocation()

  useEffect(() => {
    console.log(location)

    if (location.state.chart === undefined) {
      const jsonString = location.state.linechart
      const parseObject = JSON.parse(jsonString)

      console.log(parseObject)
    } else {
      console.log(location.state.chart)
    }
  }, [])

  return (
    <div className="w-full h-1/2 bg-[#BBDCAB] py-11 ">
      <table className="items-center w-3/4 m-auto mb-8 bg-white border-collapse rounded-xl">
        <thead>
          <tr className="w-full">
            <th className="w-1/5 px-6 border">종류</th>
            <th className="w-1/5 px-6 border">재활용 가능 여부</th>
            <th className="w-1/5 px-6 border">탄소배출량</th>
            <th className="w-1/5 px-6 border">원재료 수익</th>
            <th className="w-1/5 px-6 border">이미지 상세보기</th>
          </tr>
        </thead>
        <tbody>{/* {fetchData && fetchData.slice(offset, offset + limit).map(data => data)} */}</tbody>
      </table>
    </div>
  )
}
