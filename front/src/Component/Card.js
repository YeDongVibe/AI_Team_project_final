import {useLocation} from 'react-router-dom'

export const Card = ({imgsrc, typeName, className, onClick}) => {
  const location = useLocation().pathname
  const isGuidePage = location === '/guide'

  const cardClassName = [
    // 'w-1/3',
    `${isGuidePage ? 'w-1/3' : 'w-[330px]'}`,
    'h-[296px]',
    'relative',
    'cursor-pointer',
    className
  ].join(' ')

  return (
    <div className={cardClassName} onClick={onClick}>
      <div className="w-full h-full">
        <img src={imgsrc} className="w-full h-full left-[-1px] top-[-1px] rounded-[25px] object-cover" />
        <p className="absolute left-[30px] top-60 text-[25px] font-Notable font-bold text-left text-white">
          {typeName}
        </p>
      </div>
    </div>
  )
}
