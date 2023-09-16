// 회원가입 페이지
import {Input} from '../../Component'
import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import LoginBg from './LoginBg'

export function SignUp() {
  const Navigate = useNavigate()

  const [data, setData] = useState({
    username: '',
    password: '',
    user_pw_chk: '',
    name: '',
    email: ''
  })

  // input에 사용자 입력 값 가져오기
  const DataOnChange = event => {
    let {name, value} = event.target
    setData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
  }

  // 서버에 회원가입 요청
  const SubmitBtnClicked = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/public/member/signup`, data)
      .then(response => {
        // console.log(response.data)
        alert('회원가입 완료')
        Navigate('/login')
      })
      .catch(error => {
        console.log(error.message)
        alert('회원가입 실패')
      })
  }

  return (
    <section className="flex items-center justify-center w-full h-screen ">
      <LoginBg p1="RECYCLING" p2="MAKETH" p3="MAN" p4="Let’s roll !" />
      <div className="w-4/6 h-full bg-white shadow rounded-l-[40px]">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="w-2/3">
            <h1 className="m-4 text-4xl font-bold text-left font-poppins">Create Account</h1>
            <div className="flex mt-4 text-sm md:flex-col sm:flex-col">
              <button className="mr-4 btn md:mr-0 sm:mr-0 md:mb-4 sm:mb-4">Continue with Google</button>
              <button className="btn">Continue with Facebook</button>
            </div>
            <Input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full my-4"
              onChange={event => DataOnChange(event)}
            />
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full my-4"
              onChange={event => DataOnChange(event)}
            />
            <Input
              type="text"
              name="username"
              placeholder="Id"
              className="w-full my-4"
              onChange={event => DataOnChange(event)}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full my-4"
              onChange={event => DataOnChange(event)}
            />
            <Input
              type="password"
              name="user_pw_chk"
              placeholder="Password Check"
              className="w-full my-4"
              onChange={event => DataOnChange(event)}
            />
            <div className="flex justify-center w-full">
              <button className="text-white w-full bg-[#435353] btn" onClick={SubmitBtnClicked}>
                Create Account
              </button>
            </div>
            <div className="mt-4">
              Already have an account?{' '}
              <Link to="/login" className="font-bold hover:text-green-400">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
