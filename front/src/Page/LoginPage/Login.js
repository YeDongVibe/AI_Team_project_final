import {useState, useRef} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {LoginInput} from '../../Component'
import axios from 'axios'
import LoginBg from './LoginBg'
import {setCookie, getUserInfoFromToken} from '../../util/Cookie'

export const Login = () => {
  const Navigate = useNavigate()
  const [user_Id, setUser_Id] = useState('')
  const [pw, setPw] = useState('')

  // 로그인 버튼 클릭 시
  const SignInBtnClicked = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/public/member/login`, {
        username: user_Id,
        password: pw
      })
      .then(response => {
        const headers = response.headers
        // console.log(headers)
        const jwtToken = headers['authorization']
        setCookie('accessToken', jwtToken.slice(7))
        const username = getUserInfoFromToken()
        alert(`${username.username}님 환영합니다`)
        Navigate('/')
      })
      .catch(error => {
        console.log(error.message)
        alert('로그인 실패')
      })
  }

  return (
    <section className="flex w-full h-screen">
      <div className="w-2/3 h-full bg-white shadow rounded-l-[40px]">
        <div className="flex flex-col items-center justify-center bg-white rounded-r-[40px] shadow h-full">
          <div className="flex flex-col items-center w-2/3 p-6 space-y-6">
            <h1 className="w-full m-4 text-4xl font-bold text-left font-poppins">Login</h1>
            <div className="flex w-full mt-4 text-sm md:flex-col sm:flex-col">
              <button className="mr-4 btn md:mr-0 sm:mr-0 md:mb-4 sm:mb-4">Continue with Google</button>
              <button className="btn">Continue with Facebook</button>
            </div>
            <div className="w-full space-y-6">
              <LoginInput
                label="Your ID"
                type="text"
                placeholder="Id"
                className="w-full"
                value={user_Id}
                onChange={e => setUser_Id(e.target.value)}
              />
              <LoginInput
                label="Password"
                type="password"
                placeholder="Password"
                className="w-full"
                value={pw}
                onChange={e => setPw(e.target.value)}
              />
            </div>
            <button type="submit" className="w-full text-white btn bg-[#435353]" onClick={SignInBtnClicked}>
              Sign in
            </button>
            <p className="text-sm font-light text-gray-500 ">
              Don’t have an account yet?{' '}
              <Link to="/signup" className="font-bold hover:text-green-400">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <LoginBg p1="REDUCE" p2="REUSE" p3="RECYCLE" p4="Recycling Makes MAN" textclassName="text-right" />
    </section>
  )
}
