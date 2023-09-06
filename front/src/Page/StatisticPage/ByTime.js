// 시간별 통계
import {Div, LineChart} from '../../Component'

export function ByTime(data, label) {
  return (
    <Div>
      <LineChart data={data} title="일별 전체 처리량" labels={label} />
      <LineChart data={data} title="월별 전체 처리량" labels={label} />
      <LineChart data={data} title="년별 전체 처리량" labels={label} />
    </Div>
  )
}
