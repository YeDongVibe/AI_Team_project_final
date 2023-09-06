// 종류별 통계
import {Div, BarChart} from '../../Component'

export function ByType(data, label) {
  return (
    <Div>
      <BarChart data={data} title="일별 전체 처리량" labels={label} />
      <BarChart data={data} title="월별 전체 처리량" labels={label} />
      <BarChart data={data} title="년별 전체 처리량" labels={label} />
    </Div>
  )
}
