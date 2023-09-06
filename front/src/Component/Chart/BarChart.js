import {Chart, initTE} from 'tw-elements'

// 막대 그래프 컴포넌트
export const BarChart = ({data, labels, title, backgroundColor}) => {
  const yMin = 0
  const yMax = 100
  initTE({Chart})
  return (
    <div className="mx-auto w-3/5 overflow-hidden">
      <canvas
        data-te-chart="bar"
        data-te-dataset-label={title}
        data-te-labels={JSON.stringify(labels)}
        data-te-dataset-data={JSON.stringify(data)}
        // data-te-dataset-background-color={backgroundColor} // 색상[] 형태 keep 잘 안먹힘,,ㅠ
        data-te-dataset-y-min={yMin} // y축 최솟값 설정
        data-te-dataset-y-max={yMax} // y축 최댓값 설정
      ></canvas>
    </div>
  )
}
