import {RouteMain} from './Page/Routes/RouteMain'
import {CookiesProvider} from 'react-cookie';
import { Provider as ReduxProvider } from 'react-redux'
import { useStore } from './store/useStore';
import { PieChart, BarChart } from './Component';

function App() {
  // const data = [25, 45, 60, 30, 10]
  // const label = ['a', 'b', 'c', 'd', 'e']
  // const title = ['테스트'] // 문자열 배열 형식으로 데이터 쏴줘야 하네,,,,,
  // const backgroundColor = ['blue', 'steelblue', 'red', 'pink', 'black']

  // 리덕스 스토어 생성 함수
  const store = useStore()

  return (
    <div className="w-full h-full">
      {/* <PieChart data={data} labels={label} />
      <BarChart data={data} labels={label} title={['테스트']}/> */}
      <CookiesProvider>
        <ReduxProvider store={store}>
          <RouteMain />
        </ReduxProvider>
      </CookiesProvider>
    </div>
  )
}

export default App
