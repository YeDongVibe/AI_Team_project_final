// Nav 바
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import logo from '../../images/logo.png'

export function Nav() {
  // redux
  const [isVisible, setIsVisible] = useState(true)

  const navColor = useSelector(state => state.rootReducer.navColor)
  const location = useLocation().pathname
  const Navigate = useNavigate()

  const isMainPage = location === '/'

  // 마우스 휠 이벤트에 적용할 함수
  const MouseWheelScroll = e => {
    // 스크롤 행동 구현
    // 스크롤의 방향 계산 마우스 휠 내릴 떄 100, 마우스 휠 올릴 때 -100
    const deltaY = e.deltaY

    if (isMainPage) {
      setIsVisible(true)
    } else if (deltaY >= 0) {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }
  }

  useEffect(() => {
    window.addEventListener('wheel', MouseWheelScroll)

    return () => {
      window.removeEventListener('wheel', MouseWheelScroll)
    }
  }, [isVisible, isMainPage])

  const logoClicked = () => {
    Navigate('/')
  }

  return (
    <nav
      className={`w-full h-[120px] fixed ${isVisible ? 'z-50' : '-z-10'} flex justify-between items-center
    ${isVisible ? 'opacity-100 transition-all duration-500' : 'opacity-0 '}`}>
      <div className="w-1/5">
        <img src={logo} className="w-1/4 cursor-pointer h-1/4" onClick={logoClicked} />
      </div>
      <div className={`flex items-center justify-center w-3/5 text-xl ${navColor} lg:text-base md:text-sm sm:text-xs`}>
        <Link to="/static">
          <p className="h-full font-semibold text-center align-middle mr-14 font-poppins">통계</p>
        </Link>
        <Link to="/inquiry">
          <p className="h-full font-semibold text-center align-middle mr-14 font-poppins">자료 조회</p>
        </Link>
        <Link to="/guide">
          <p className="h-full font-semibold text-center align-middle mr-14 font-poppins">Guide & Tip</p>
        </Link>
        <Link to="/customer">
          <p className="h-full font-semibold text-center align-middle mr-14 font-poppins">고객센터</p>
        </Link>
      </div>
      <div className={`flex items-center text-lg justify-center w-1/5 ${navColor} lg:text-base md:text-sm sm:text-xs`}>
        <Link to="/login">
          <p className="h-full mr-8 text-center align-middle font-Inconsolata ">SIGN IN</p>
        </Link>
        <Link to="/signup">
          <p className="h-full text-center align-middle font-Inconsolata">SIGN UP</p>
        </Link>
      </div>
    </nav>
  )
}
