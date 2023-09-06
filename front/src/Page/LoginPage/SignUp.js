// 회원가입 페이지
import {Input} from '../../Component'
import {useState} from 'react'
import axios from 'axios'

export function SignUp() {
  const [data, setData] = useState({
    user_id: '',
    user_pw: '',
    user_pw_chk: '',
    name: '',
    email: '',
    birth: ''
  })

  // input에 사용자 입력 값 가져오기
  const DataOnChange = event => {
    let {name, value} = event.target
    setData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
    // console.log('data: ', data)
  }

  // 서버에 회원가입 요청
  const SubmitBtnClicked = () => {
    axios
      .post('http://localhost:8080/signup', data)
      .then(response => console.log(response.data))
      .catch(error => error.message)
  }

  return (
    <section className="flex flex-col items-center justify-center w-full h-screen bg-gray-100">
      <div className="mb-6 text-2xl font-semibold text-gray-900">회원가입</div>
      <div className="w-3/5 bg-white rounded-lg shadow h-3/5">
        <div className="flex flex-col items-center">
          <Input
            type="text"
            name="user_id"
            placeholder="아이디"
            className="m-4"
            onChange={event => DataOnChange(event)}
          />
          <Input
            type="password"
            name="user_pw"
            placeholder="비밀번호"
            className=""
            onChange={event => DataOnChange(event)}
          />
          <Input
            type="password"
            name="user_pw_chk"
            placeholder="비밀번호 확인"
            className=""
            onChange={event => DataOnChange(event)}
          />
          <Input type="text" name="name" placeholder="이름" className="m-4" onChange={event => DataOnChange(event)} />
          <Input
            type="email"
            name="email"
            placeholder="이메일"
            className="m-4"
            onChange={event => DataOnChange(event)}
          />
          <Input type="date" name="birth" placeholder="생일" className="m-4" onChange={event => DataOnChange(event)} />
        </div>
        <div className="flex justify-center w-full">
          <button className="text-white btn btn-success" onClick={SubmitBtnClicked}>
            submit
          </button>
        </div>
      </div>
    </section>
  )
}
