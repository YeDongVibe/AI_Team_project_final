import {Div, Pagination} from '../../Component'
import {CustomerBoardItem} from './CustomerBoardItem'
import customerimg from '../../images/customerService.png'
import {useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {getCookie} from '../../util'

export default function CustomerCenterPage() {
  const [total, setTotal] = useState(0)
  const [isLogin, setIsLogin] = useState(false)
  const [boardDatas, setBoardDatas] = useState([])

  const [page, setPage] = useState(1)
  const limit = 10
  const offset = (page - 1) * limit

  const serachRef = useRef(null)
  const Navigate = useNavigate()

  useEffect(() => {
    const cookie = getCookie('accessToken')
    if (cookie) setIsLogin(true)
    else setIsLogin(false)

    fetch(`${process.env.REACT_APP_SERVER_URL}/public/board/boardList`)
      .then(response => response.json())
      .then(datalist => {
        setTotal(datalist.length)
        setBoardDatas(datalist)
      })
      .catch(err => err.message)
  }, [])

  const BoardPosting = () => {
    Navigate('/customer/write')
  }

  const SearchBoard = () => {
    const serach = serachRef.current?.value
    fetch(`${process.env.REACT_APP_SERVER_URL}/public/board/updateBoard/${serach}`)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => error.message)
  }

  return (
    <Div className="pt-[120px] w-full h-full">
      <div className="relative flex items-center justify-center w-full">
        <img src={customerimg} alt="" className="object-cover w-full" />
        <p className="absolute text-3xl font-bold text-black font-poppins">문의 게시판</p>
      </div>

      {/*  */}
      <div className="w-full h-full mt-20">
        {/* info */}
        <div className="flex w-full m-8 justify-evenly">
          <div className="w-1/4 ml-6 font-poppins">Total : {total}</div>
          <div className="relative w-2/4">
            <input type="text" className="w-full pr-16 border border-gray-300 input bg-gray-50" ref={serachRef} />
            <button className="absolute right-0 border-gray-300 w-2/7 btn" onClick={SearchBoard}>
              검색
            </button>
          </div>
          <div className="flex w-1/4 ">
            {isLogin && (
              <button className="m-auto btn btn-sm" onClick={BoardPosting}>
                posting
              </button>
            )}
          </div>
        </div>

        {/* 게시글 */}
        <div className="relative flex flex-col w-4/5 h-full m-auto mb-6 border-black border-y-2">
          {/* 게시글 리스트 */}
          {/* {boardDatas} */}
          {boardDatas
            .map((data, index) => (
              <div className="w-full " key={index}>
                <CustomerBoardItem
                  num={data['id']}
                  title={data.title}
                  writer={data.username.username}
                  date={data.date}
                  content={data.content}
                />
              </div>
            ))
            .slice(offset, offset + limit)}
        </div>

        {/* 페이지네이션 */}

        <Pagination total={total} limit={limit} page={page} setPage={setPage} />
      </div>
    </Div>
  )
}
