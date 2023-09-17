import {useEffect} from 'react'
import guide from '../../images/guide.png'
import {useLocation} from 'react-router-dom'

export function GuideDetailPage() {
  const location = useLocation()

  useEffect(() => {
    console.log(location.state)
  }, [])

  return (
    <div className="w-full h-full pt-[120px]">
      <div className="relative flex items-center justify-center w-full">
        <img src={guide} alt="" className="object-cover w-full" />
        <p className="absolute text-3xl font-bold text-black font-poppins">Guide & Tip</p>
      </div>
    </div>
  )
}
