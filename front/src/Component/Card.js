export const Card = ({imgsrc, typeName, className}) => {
  const cardClassName = ['w-[330px]', 'h-[296px]', 'relative', className].join(' ')

  return (
    <div className={cardClassName}>
      <img src={imgsrc} className="w-[330px] h-[296px] absolute left-[-1px] top-[-1px] rounded-[25px] object-cover" />
      <p className="absolute left-[30px] top-60 text-[25px] font-Notable font-bold text-left text-white">{typeName}</p>
    </div>
  )
}
