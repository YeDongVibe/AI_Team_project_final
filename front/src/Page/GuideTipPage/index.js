import {Div, Card} from '../../Component'
import pet from '../../images/CardImage/pet.png'
import glass from '../../images/CardImage/glass.png'
import can from '../../images/CardImage/can.jpg'
import paper from '../../images/CardImage/paper.jpg'
import paperpack from '../../images/CardImage/paperpack.jpg'
import plastic from '../../images/CardImage/plastic.jpg'
import vinly from '../../images/CardImage/vinly.jpg'
import guide from '../../images/guide.png'

import {useNavigate} from 'react-router-dom'

export default function GuideTipPage() {
  const cardData = [
    {imgsrc: pet, typeName: 'pet'},
    {imgsrc: glass, typeName: 'glass'},
    {imgsrc: can, typeName: 'can'},
    {imgsrc: paper, typeName: 'paper'},
    {imgsrc: paperpack, typeName: 'paperpack'},
    {imgsrc: plastic, typeName: 'plastic'},
    {imgsrc: vinly, typeName: 'vinly'}
  ]

  const navigate = useNavigate()

  const CardClicked = data => {
    navigate(`/guide/${data}`, {state: {data: data}})
  }
  return (
    <Div className="pt-[120px] w-full h-full">
      <div className="relative flex items-center justify-center w-full">
        <img src={guide} alt="" className="object-cover w-full" />
        <p className="absolute text-3xl font-bold text-black font-poppins">Guide & Tip</p>
      </div>

      <div className="flex justify-center w-full h-full mb-10 mt-[100px] ">
        <div className="flex flex-wrap justify-between w-4/5 h-full md:justify-center sm:justify-center">
          {cardData.map((data, index) => (
            <Card
              key={index}
              imgsrc={data.imgsrc}
              typeName={data.typeName}
              className="w-1/4 mb-8 mr-4 md:w-1/3 sm:w-1/2"
              onClick={() => CardClicked(data.typeName)}
            />
          ))}
        </div>
      </div>
    </Div>
  )
}
