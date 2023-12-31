// 고객센터 상세페이지
import {useLocation, useNavigate} from 'react-router-dom'
import customerimg from '../../images/customerService.png'
import {CustomerBoardReply} from './CustomerBoardReply'
import {useEffect, useState, useRef} from 'react'
import {Div} from '../../Component'
import {getCookie, getUserInfoFromToken, parseDate} from '../../util'

export function CustomerBoardPage() {
  const [isUser, setIsUser] = useState(false)
  const [commentList, setCommnetList] = useState()

  const commentRef = useRef(null)

  const location = useLocation()
  const Navigate = useNavigate()

  const listOnClicked = () => {
    Navigate('/customer')
  }

  useEffect(() => {
    const cookie = getCookie('accessToken')
    if (cookie) {
      const user = getUserInfoFromToken()
      if (user.username === location.state.writer || user.authority === '[ROLE_MANAGER]') setIsUser(true)
      else setIsUser(false)
    }

    fetch(`${process.env.REACT_APP_SERVER_URL}/public/comments/readComment/${location.state.num}`)
      .then(response => response.json())
      .then(datalist => {
        const data = datalist.map(datas => {
          const dates = new Date(datas['date'])
          const date = `${dates.getFullYear()}-${
            dates.getMonth() + 1 < 10 ? '0' + (dates.getMonth() + 1) : dates.getMonth() + 1
          }-${dates.getDate() < 10 ? '0' + dates.getDate() : dates.getDate()}`
          datas['date'] = date
          return datas
        })
        setCommnetList(data)
      })
      .catch(error => error.message)
  }, [])

  const UpdateBoardOnClick = () => {
    Navigate('/customer/write', {state: {location: location.state}})
  }

  const DeleteBoardOnClick = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/public/board/deleteBoard/${location.state.num}`, {
      method: 'delete'
    })
      .then(() => {
        listOnClicked()
        alert('게시글이 삭제되었습니다.')
      })
      .catch(error => error.message)
  }

  const InsertReplyOnClick = () => {
    const cookie = getCookie('accessToken')
    if (cookie) {
      const user = getUserInfoFromToken()

      if (user.username === location.state.writer) setIsUser(true)
      else setIsUser(false)

      const headers = {
        'Content-Type': 'application/json'
      }
      fetch(`${process.env.REACT_APP_SERVER_URL}/manager/comments/insertComment`, {
        method: 'post',
        headers: headers,
        body: JSON.stringify({
          content: commentRef.current?.value,
          username: user.username,
          boardid: location.state.num
        })
      })
        .then(() => window.location.reload())
        .catch(error => error.message)
    } else {
      alert('로그인 후 이용해주세요.')
    }
  }

  return (
    <Div className="w-full h-full pt-[120px]">
      <div className="relative flex items-center justify-center w-full mb-4">
        <img src={customerimg} alt="" className="object-cover w-full" />
        <p className="absolute text-3xl font-bold text-black font-poppins">문의 게시판</p>
      </div>

      <div className="flex flex-col items-center p-8 mt-4">
        <div className="flex w-full mt-8 border-y-2">
          <div className="flex justify-center w-full mt-4 mb-4 mr-4 font-bold">{location.state.title}</div>
          <div className="flex items-center justify-end mr-4 text-sm">작성자 {location.state.writer}</div>
          {isUser && (
            <div className="flex items-center justify-end">
              <button className="mr-4 btn" onClick={UpdateBoardOnClick}>
                수정
              </button>
              <button className="btn" onClick={DeleteBoardOnClick}>
                삭제
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center w-full mt-4">
          <div className="w-4/5 mt-4 border-gray-300 input h-96">{location.state.content}</div>
        </div>

        {/* 댓글 */}
        <div className="w-full mt-4 border-y-2">
          {isUser && (
            <div className="w-full p-4">
              <div className="mb-4 ml-8 font-bold font-poppins">댓글 작성</div>
              <div className="flex justify-center w-full">
                <input type="text" ref={commentRef} className="w-3/4 mr-4 border-2 border-gray-200 input" />
                <button className="btn" onClick={InsertReplyOnClick}>
                  등록
                </button>
              </div>
            </div>
          )}

          <div className="flex w-full border-gray-200 border-y-2">
            <div className="w-full p-2">
              {commentList &&
                commentList.map((data, index) => (
                  <CustomerBoardReply
                    key={index}
                    // writer={data.username}
                    num={data.id}
                    content={data.content}
                    regdate={data.date}
                  />
                ))}
            </div>
          </div>
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
