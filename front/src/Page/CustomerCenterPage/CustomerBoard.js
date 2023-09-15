// 고객센터 상세페이지
import {useLocation, useNavigate} from 'react-router-dom'
import customerimg from '../../images/customerService.png'
import {useEffect} from 'react'
import {Div} from '../../Component'

export function CustomerBoardPage() {
  const location = useLocation()
  const Navigate = useNavigate()
  console.log(location.state)

  const listOnClicked = () => {
    Navigate('/customer')
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/public/comments/readComment`)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => error.message)
  }, [])

  const UpdateBoardOnClick = () => {
    Navigate('/customer/write', location.state)
  }

  const DeleteBoardOnClick = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/public/board/deleteBoard/${location.state.num}`)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => error.message)
  }

  const InsertReplyOnClick = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/public/comments/insertComment`)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => error.message)
  }

  return (
    <Div className="w-full h-full pt-[120px]">
      <div className="relative flex items-center justify-center w-full mb-4">
        <img src={customerimg} alt="" className="object-cover w-full" />
        <p className="absolute text-3xl font-bold text-black font-poppins">문의 게시판</p>
      </div>

      <div className="flex flex-col items-center p-8 mt-4">
        <div className="flex items-center justify-center w-full mt-8 border-y-2">
          <div className="mt-4 mb-4 mr-4">{location.state.title}</div>
          <div>
            <button>수정</button>
            <button>삭제</button>
          </div>
        </div>
        <div className="flex flex-col items-center w-full mt-4">
          <div className="w-4/5 mt-4 border-gray-300 input h-96">{location.state.content}</div>
        </div>

        {/* 댓글 */}
        <div className="w-full border-y-2">
          <div></div>
        </div>

        <div className="flex justify-end w-full mt-10">
          <button className="mr-10 btn" onClick={listOnClicked}>
            목록
          </button>
        </div>
      </div>
    </Div>
  )
}
