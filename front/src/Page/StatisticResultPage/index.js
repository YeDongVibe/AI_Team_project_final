// 통계 페이지 -1
import {Div} from '../../Component'
import {ResultBox} from './ResultBox'
import {ResultInfo} from './ResultInfo'

export default function StatisticResultPage() {
  return (
    <Div className="pt-[120px] w-full h-full">
      <ResultBox />
      <ResultInfo />
    </Div>
  )
}
