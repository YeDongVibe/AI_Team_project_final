import {Chart, initTE} from 'tw-elements'

// 꺾은 선 그래프
export const LineChart = ({labels, data, title, backgroundColor}) => {
  const yMin = 0
  const yMax = 100
  initTE({Chart})
  return (
    <div className="mx-auto w-3/5 overflow-hidden">
      <canvas
        data-te-chart="line"
        data-te-dataset-label={title} // 그래프 title
        data-te-labels={JSON.stringify(labels)} // x축 라벨
        data-te-dataset-data={JSON.stringify(data)} // 데이터
        // data-te-dataset-background-color={backgroundColor}
        data-te-dataset-y-min={yMin} // y축 최솟값 설정
        data-te-dataset-y-max={yMax} // y축 최댓값 설정
      ></canvas>
    </div>
  )
}
