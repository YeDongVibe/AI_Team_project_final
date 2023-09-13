// 통계 관련 페이지
import {ByTime} from './ByTime'
import {ByType} from './ByType'
import {Div} from '../../Component'

// import ApexChart from 'apexcharts'

export default function StatisticPage() {
  return (
    <Div className="pt-[120px] w-full h-full">
      <ByTime />
      <ByType />
    </Div>
  )
}
