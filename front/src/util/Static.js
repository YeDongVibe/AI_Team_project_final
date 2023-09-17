import {useNavigate} from 'react-router-dom'

export function ResultClick({linechart, chart}) {
  const Navigate = useNavigate()

  const detailClicked = () => {
    console.log('linechart: ', linechart)
    const path = '/static/result'
    Navigate(path, {state: {chart: chart, linechart: linechart}})
  }

  return (
    <div className="cursor-pointer" onClick={detailClicked}>
      <div className="w-[60px] h-[65.14px] absolute right-0 top-0 rounded-tr-[45px] rounded-bl-[45px] bg-[#242121]" />
      <p className="w-[60px] h-[65.14px] absolute right-0 top-0 text-[44px] text-center text-white">+</p>
    </div>
  )
}
