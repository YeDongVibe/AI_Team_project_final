import {Routes, Route, BrowserRouter, Outlet} from 'react-router-dom'
import {useEffect} from 'react'
import {useNavColorBlack} from '../../util'
import {Nav} from './Nav'
import {Footer} from './Footer'
import {Login} from '../LoginPage/Login'
import {SignUp} from '../LoginPage/SignUp'
import MainPage from '../MainPage'
import StatisticResultPage from '../StatisticResultPage'
import StatisticPage from '../StatisticPage'
import DataInquiryPage from '../DataInquiryPage'
import GuideTipPage from '../GuideTipPage'
import CustomerCenterPage from '../CustomerCenterPage'

export function RouteMain() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route element={<MainLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/static" element={<StatisticPage />} />
          <Route path="/static/result" element={<StatisticResultPage />} />
          <Route path="/inquiry" element={<DataInquiryPage />} />
          <Route path="/guide" element={<GuideTipPage />} />
          <Route path="/customer" element={<CustomerCenterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

// Nav, Footer 등 포함할 페이지, 포함하지 않을 페이지 표현하기 위한 컴포넌트
// 사실 메인페이지의 푸터 추가로 스크롤이 스무스하게 흘러가지 않아 사용,, (좀 방법이 맘에 안들긴 함,,)
const MainLayout = () => {
  // Outlet은 페이지에 따라 바뀌는 부분임,
  const setNavColorBlack = useNavColorBlack() // 커스텀 훅을 호출하여 함수를 가져옵니다

  // setNavColorBlack 함수를 호출하여 액션을 디스패치합니다.
  useEffect(() => {
    setNavColorBlack()
  }, [])
  return (
    <>
      <Outlet />
      <Footer />
    </>
  )
}
