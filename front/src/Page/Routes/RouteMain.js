import {Routes, Route, BrowserRouter} from 'react-router-dom'
import {Nav} from './Nav'
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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/static" element={<StatisticPage />} />
        <Route path="/static/result" element={<StatisticResultPage />} />
        <Route path="/inquiry" element={<DataInquiryPage />} />
        <Route path="/guide" element={<GuideTipPage />} />
        <Route path="/customer" element={<CustomerCenterPage />} />
      </Routes>
    </BrowserRouter>
  )
}
