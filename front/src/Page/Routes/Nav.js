// Nav 바
import {Icon} from '../../Component'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import {useNavVisibleTrue, useNavVisibleFalse} from '../../util'
import logo from '../../images/Logo2.png'
import {getCookie, getUserInfoFromToken, removeCookie} from '../../util'
import {HambergerMenu} from './HambergerMenu'

export function Nav() {
  const [isLogin, setIsLogin] = useState(false)
  const [loginText, setLoginText] = useState('')
  const [isHamberger, setIsHamberger] = useState(false)

  // redux
  const navVisible = useSelector(state => state.rootReducer.navVisible)
  const navColor = useSelector(state => state.rootReducer.navColor)
  const location = useLocation().pathname
  const Navigate = useNavigate()

  const navVisibleTrue = useNavVisibleTrue()
  const navVisibleFalse = useNavVisibleFalse()

  const isMainPage = location === '/'
  const isStaticPage = location === '/static'
  const isStaticResultPage = location === '/static/result'

  // 마우스 휠 이벤트에 적용할 함수
  const MouseWheelScroll = e => {
    const deltaY = e.deltaY

    if (isMainPage) {
      navVisibleTrue()
    } else if (deltaY >= 0) {
      navVisibleFalse()
    } else {
      navVisibleTrue()
    }
  }

  useEffect(() => {
    const cookie = getCookie('accessToken')
    if (cookie) {
      const username = getUserInfoFromToken()
      setIsLogin(true)
      setLoginText(`${username.username}님 환영합니다.`)
    } else setIsLogin(false)
  }, [])

  useEffect(() => {
    window.addEventListener('wheel', MouseWheelScroll)
    return () => {
      window.removeEventListener('wheel', MouseWheelScroll)
    }
  }, [isMainPage])

  const logoClicked = () => {
    Navigate('/')
  }

  const logoutClicked = () => {
    removeCookie('accessToken')
    setIsLogin(false)
    setLoginText('')
    Navigate('/')
  }

  const CloseHamberger = () => {
    if (isHamberger) setIsHamberger(false)
    else setIsHamberger(true)
  }

  return (
    <nav
      className={`w-full h-[120px] fixed ${navVisible ? 'z-40' : '-z-10'}
       flex justify-between items-center
    ${navVisible ? 'opacity-100 transition-all duration-500' : 'opacity-0 '}`}>
      <div className="w-1/5">
        <img src={logo} className="w-2/4 h-full ml-6 cursor-pointer md:w-3/4 sm:w-full" onClick={logoClicked} />
      </div>
      <div className={`flex items-center justify-center w-3/5 text-xl ${navColor} lg:text-base md:text-sm sm:hidden`}>
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

      <button className={`fixed right-0 z-40 hidden w-16 h-16 sm:block`} onClick={CloseHamberger}>
        <Icon
          name={isHamberger ? 'close' : 'menu'}
          className={`w-full h-full transition-all duration-500 ${isHamberger ? 'text-black' : navColor}`}
          style={{fontSize: '60px'}}></Icon>
      </button>

      <HambergerMenu
        isHamberger={isHamberger}
        setIsHamberger={setIsHamberger}
        loginText={loginText}
        logoutClicked={logoutClicked}
      />

      {!isLogin ? (
        <div className={`flex items-center text-lg justify-center w-1/5 ${navColor} lg:text-base md:text-sm sm:hidden`}>
          <Link to="/login">
            <p className="h-full mr-8 text-center align-middle font-Inconsolata ">SIGN IN</p>
          </Link>
          <Link to="/signup">
            <p className="h-full text-center align-middle font-Inconsolata">SIGN UP</p>
          </Link>
        </div>
      ) : (
        <div className={`flex items-center text-lg justify-center w-1/5 ${navColor} lg:text-base md:text-sm sm:hidden`}>
          <p className="h-full mr-8 text-center align-middle font-Inconsolata ">{loginText}</p>
          <p className="h-full mr-8 text-center align-middle cursor-pointer font-Inconsolata" onClick={logoutClicked}>
            Log Out
          </p>
        </div>
      )}
    </nav>
  )
}
