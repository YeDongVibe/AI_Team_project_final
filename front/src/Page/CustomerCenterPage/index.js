import {Div} from '../../Component'
import {CustomerBoardItem} from './CustomerBoardItem'
import {CustomerBoard} from './CustomerBoard'
import customerimg from '../../images/customerService.png'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

export default function CustomerCenterPage() {
  let total = 0

  const Navigate = useNavigate()

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/public/board/boardList`)
      .then(response => response.json())
      .then(data => {
        total = data.length
        console.log(data)
      })
      .catch(err => err.message)
  }, [])

  const BoardPosting = () => {
    Navigate('/customer/write')
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
            <input type="text" className="w-full border border-gray-300 input bg-gray-50" />
            <button className="absolute right-0 border-gray-300 w-2/7 btn">검색</button>
          </div>
          <div className="flex w-1/4 ">
            <button className="m-auto btn btn-sm" onClick={BoardPosting}>
              posting
            </button>
          </div>
        </div>

        {/* 게시글 */}
        <div className="relative flex w-4/5 h-full m-auto mb-6 border-black border-y-2">
          <div className="w-full ">
            {/* 게시글 리스트 */}
            <CustomerBoardItem num="1" title="title" writer="writer" date="2023-11-11" view="33" />
            <CustomerBoardItem num="2" title="title" writer="writer" date="2023-11-11" view="33" />
          </div>
        </div>

        {/* 페이지네이션 */}
      </div>
    </Div>
  )
}
