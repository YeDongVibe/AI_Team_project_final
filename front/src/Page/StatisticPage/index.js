// 통계 관련 페이지
import {ByTime} from './ByTime'
import {ByType} from './ByType'
import {Div} from '../../Component'

export default function StatisticPage() {
  return (
    <Div>
      <ByTime />
      <ByType />
    </Div>
  )
}
