import {Div, Card} from '../../Component'
import guide from '../../images/guide.png'

export default function GuideTipPage() {
  // transform -translate-x-1/2 translate-y-1/2 top-1/2 left-1/2
  return (
    <Div className="pt-[120px] w-full h-screen ">
      <div className="relative flex items-center justify-center w-full">
        <img src={guide} alt="" className="object-cover w-full" />
        <p className="absolute text-3xl font-bold text-black font-poppins">Guide & Tip</p>
      </div>

      <div className="mt-10">d</div>
    </Div>
  )
}
