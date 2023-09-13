// 게시글 리스트 아이템
export function CustomerBoardItem({num, title, writer, date, view}) {
  return (
    <div className="flex w-full p-8 cursor-pointer border-y font-Sunflower">
      <div className="grow">{num}</div>
      <div className="grow-[2] font-bold">{title}</div>
      <div className="grow">{writer}</div>
      <div className="grow">{date}</div>
      <div className="grow">{view}</div>
    </div>
  )
}
