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

      <div className="flex flex-col w-full h-full mt-16 font-poppins">
        <div className="w-full px-24 mx-9">
          <div className="p-6 text-4xl font-bold text-center border-gray-200 border-y-2">{location.state.data}</div>
        </div>
        <div className="w-full px-24 my-10 text-lg mx-9">
          <div className="pb-8 border-b-2">내용</div>
        </div>
      </div>
    </div>
  )
}
