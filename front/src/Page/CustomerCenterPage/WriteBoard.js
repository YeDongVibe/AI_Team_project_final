import {Link, useNavigate, useLocation} from 'react-router-dom'
import {useRef, useEffect} from 'react'
import {getCookie, getUserInfoFromToken} from '../../util'
import customerimg from '../../images/customerService.png'

export function WriteBoard() {
  const Navigate = useNavigate()
  const location = useLocation()

  const titleRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (location.state !== null) {
      titleRef.current.value = location.state.location.title
      contentRef.current.textContent = location.state.location.content
    }
  }, [])

  const registerBtnClick = () => {
    const cookie = getCookie('accessToken')
    const user = getUserInfoFromToken()

    if (location.state !== null) {
      fetch(`${process.env.REACT_APP_SERVER_URL}/public/board/updateBoard/${location.state.location.num}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: titleRef.current?.value,
          content: contentRef.current?.textContent,
          username: user.username
        })
      })
        .then(response => response.data)
        .then(() => {
          alert('게시글이 수정되었습니다.')
          Navigate('/customer')
        })
        .catch(err => err.message)
    } else {
      fetch(`${process.env.REACT_APP_SERVER_URL}/public/board/insertBoard`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: titleRef.current?.value,
          content: contentRef.current?.textContent,
          username: user.username
        })
      })
        .then(response => response.data)
        .then(() => {
          alert('게시글이 등록되었습니다.')
          Navigate('/customer')
        })
        .catch(err => err.message)
    }
  }

  return (
    <div className="pt-[120px] w-full h-full">
      <div className="relative flex items-center justify-center w-full">
        <img src={customerimg} alt="" className="object-cover w-full" />
        <p className="absolute text-3xl font-bold text-black font-poppins">문의 게시판</p>
      </div>
      <div className="w-full mt-10 text-2xl text-center font-poppins text-bold">게시글 등록</div>

      <div className="flex flex-col items-center p-8 mt-4">
        <div className="flex items-center justify-center w-full mt-8 border-y-2">
          <div className="mt-4 mb-4 mr-4">제목</div>
          <input type="text" className="w-2/5 mt-4 mb-4 border-gray-300 input" ref={titleRef} />
        </div>
        <div className="flex flex-col items-center w-full mt-4">
          <div>내용</div>
          <div className="w-4/5 mt-4 border-gray-300 input h-96" contentEditable="true" ref={contentRef}></div>
        </div>
      </div>

      <div className="flex justify-center p-4 m-4">
        <button className="mr-4 text-white btn btn-success" onClick={registerBtnClick}>
          등록하기
        </button>
        <Link to={`/customer`}>
          <button className="btn ">취소</button>
        </Link>
      </div>
    </div>
  )
}
