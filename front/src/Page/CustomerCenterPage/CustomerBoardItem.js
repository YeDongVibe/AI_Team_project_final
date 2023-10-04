// 게시글 리스트 아이템
import {useNavigate} from 'react-router-dom'

export function CustomerBoardItem({num, title, writer, date, content}) {
  const Navigate = useNavigate()

  const BoardOnClick = () => {
    Navigate(`/customer/${num}`, {state: {num: num, title: title, writer:writer ,date: date, content: content}})
  }

  return (
    <div className="flex w-full p-8 cursor-pointer border-y font-Sunflower" onClick={BoardOnClick}>
      <div className="grow">{num}</div>
      <div className="grow-[2] font-bold">{title}</div>
      <div className="grow">{writer}</div>
      <div className="grow">{`${date[0]}-${date[1].length >= 2 ? date[1] : `0${date[1]}`}-${date[2]}`}</div>
    </div>
  )
}
