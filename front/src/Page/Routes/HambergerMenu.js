import {useEffect, useState} from 'react'
import {Div, Icon} from '../../Component'
import {Link} from 'react-router-dom'
import logo from '../../images/Logo2.png'

export function HambergerMenu({isHamberger, setIsHamberger, logoutClicked, loginText}) {
  const CloseHamberger = () => {
    setIsHamberger(false)
  }

  return (
    <div
      className={`fixed inset-0 w-full h-screen ${
        isHamberger ? 'visible' : 'invisible'
      } bg-white sm:block hidden transition-all ease-in-out duration-300`}
      style={{
        transform: isHamberger ? 'translateY(0)' : 'translateY(-100%)',
        transition: '.4s ease-out' // 애니메이션 시간과 이징 함수 설정
      }}>
      <div className="w-full h-16 bg-white">
        <Div className="flex justify-center mt-6">
          <Link to="/" className="">
            <img src={logo} alt="" className="" />
          </Link>
        </Div>
      </div>

      <div className="flex flex-col pt-16">
        <div className="mb-4 text-center">
          {loginText && <Div className="mb-5">{loginText}</Div>}
          <ul className="flex justify-center ">
            <li className="mr-4 ">
              <Link to={loginText ? '/' : '/login'} onClick={loginText ? () => logoutClicked() : () => {}}>
                <div>{loginText ? 'Log Out' : 'Log In'}</div>
              </Link>
            </li>
            <li className="">
              <Link to="/signup" onClick={CloseHamberger}>
                <div>회원가입</div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col">
          <ul>
            <li className="flex justify-center mt-4">
              <Link to="/static" onClick={CloseHamberger}>
                <div>통계</div>
              </Link>
            </li>
            <li className="flex justify-center mt-4">
              <Link to="/inquiry" onClick={CloseHamberger}>
                <div>자료조회</div>
              </Link>
            </li>
            <li className="flex justify-center mt-4">
              <Link to="/guide" onClick={CloseHamberger}>
                <div>Guide & Tip</div>
              </Link>
            </li>
            <li className="flex justify-center mt-4">
              <Link to="/customer" onClick={CloseHamberger}>
                <div>고객센터</div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
