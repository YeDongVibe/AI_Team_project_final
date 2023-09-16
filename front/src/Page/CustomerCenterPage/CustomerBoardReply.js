import {Div, Icon} from '../../Component'
import {useState, useRef, useEffect} from 'react'
import {getCookie, getUserInfoFromToken, parseDate} from '../../util'

export function CustomerBoardReply({num, content, writer, regdate}) {
  const [updateInputOpen, setUpdateInputOpen] = useState(false)
  const [userInfoTrue, setUserInfoTrue] = useState(false)
  const updateReplyRef = useRef(null)
  // 날짜 형식을 파싱할 때 사용할 포맷 지정
  const dateFormat = 'yyyy-MM-dd'

  useEffect(() => {
    const cookie = getCookie('accessToken')
    if (cookie) {
      const user = getUserInfoFromToken()
      if (user.username === writer) setUserInfoTrue(true)
      else setUserInfoTrue(false)
    }
    // const date = parseDate(regdate, dateFormat)
    // console.log(date)
  }, [])

  const UpdateReplyOnClick = () => {
    const cookie = getCookie('accessToken')
    if (cookie) {
      const user = getUserInfoFromToken()

      console.log(updateReplyRef.current?.value)
      console.log('num: ', num)

      fetch(`${process.env.REACT_APP_SERVER_URL}/manager/comments/updateComment/${num}`, {
        method: 'put',
        body: JSON.stringify({
          content: updateReplyRef.current?.value
        })
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => error.message)
    } else {
      alert('로그인 후 이용해주세요.')
    }
  }
  const DeleteReplyOnClick = () => {
    const cookie = getCookie('accessToken')
    if (cookie) {
      fetch(`${process.env.REACT_APP_SERVER_URL}/manager/comments/deleteComment/${num}`, {
        method: 'delete'
      })
        .then(() => window.location.reload())
        .catch(error => error.message)
    } else {
      alert('로그인 후 이용해주세요.')
    }
  }

  return (
    <Div className="flex flex-col w-full border-2 h-28 rounded-xl">
      <Div className="flex justify-between mt-2">
        <div className="flex items-center ml-4">
          <Icon name="person" />
          {writer}
        </div>
        <Div className="flex items-center">
          {/*  */}
          <div className="mr-4">작성 일: {regdate}</div>
          {userInfoTrue && (
            <Div className="">
              <button className="mr-2 btn btn-sm" onClick={() => setUpdateInputOpen(true)}>
                수정
              </button>
              <button className="mr-2 align-middle btn btn-sm" onClick={DeleteReplyOnClick}>
                <Icon name="close" />
              </button>
            </Div>
          )}
        </Div>
      </Div>
      <Div className="mt-3 ml-2">
        {updateInputOpen ? (
          <Div className="flex justify-between w-full ">
            <input
              type="text"
              className="w-2/3 input input-xm input-success"
              ref={updateReplyRef}
              defaultValue={content}
            />
            <Div className="flex justify-end w-1/3">
              <button className="mr-2 text-white btn btn-xm btn-success" onClick={UpdateReplyOnClick}>
                등록
              </button>
              <button className="mr-2 btn btn-xm" onClick={() => setUpdateInputOpen(false)}>
                취소
              </button>
            </Div>
          </Div>
        ) : (
          content
        )}
      </Div>
    </Div>
  )
}
