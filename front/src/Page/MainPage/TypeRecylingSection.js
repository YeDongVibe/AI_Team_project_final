import {Card} from '../../Component'
import pet from '../../images/CardImage/pet.png'
import glass from '../../images/CardImage/glass.png'
import can from '../../images/CardImage/can.jpg'
import paper from '../../images/CardImage/paper.jpg'
import paperpack from '../../images/CardImage/paperpack.jpg'
import plastic from '../../images/CardImage/plastic.jpg'
import vinly from '../../images/CardImage/vinly.jpg'
import {useState, useEffect, useRef} from 'react'
import {Link, useNavigate} from 'react-router-dom'

export function TypeRecylingSection() {
  //recycling type
  // 폰트가 피그마의 폰트랑 뭔가 다른데? 폰트 잘못 받았나? 확인 필요
  const [currentCard, setCurrentCard] = useState(1)
  const [customIntervel, setCustomIntervel] = useState(3000) // 이미지 이동시간
  const sliderRef = useRef(null)

  const navigate = useNavigate()

  const cardCount = 6
  const cardData = [
    {imgsrc: pet, typeName: 'pet'},
    {imgsrc: glass, typeName: 'glass'},
    {imgsrc: can, typeName: 'can'},
    {imgsrc: paper, typeName: 'paper'},
    {imgsrc: paperpack, typeName: 'paperpack'},
    {imgsrc: plastic, typeName: 'plastic'},
    {imgsrc: vinly, typeName: 'vinly'}
  ]

  // currentCard * translate-x-[-330px] 하면 될 듯
  useEffect(() => {
    if (currentCard === 1) setCustomIntervel(0)
    else setCustomIntervel(3000)

    const timer = setInterval(() => setCurrentCard(prevIndex => (prevIndex > 7 ? 1 : prevIndex + 1)), customIntervel)
    return () => {
      clearInterval(timer) // timer 함수를 clearInterval을하여 return 한다.
    }
  }, [customIntervel, currentCard, cardCount])

  useEffect(() => {
    // 슬라이더 컨테이너의 너비를 설정하여 슬라이드 이동에 트랜지션 효과 적용
    const slider = sliderRef.current
    if (slider) {
      const sliderWidth = slider.offsetWidth
      slider.style.width = `${sliderWidth * cardCount}px`
      slider.style.transform = `translateX(-${(currentCard - 1) * 354}px)`
      slider.style.transition = `transform ${currentCard === 1 ? 0 : 0.5}s ease-in-out`
    }
  }, [currentCard, cardCount])

  const CardClicked = () => {
    navigate('/guide', {state: {data: cardData.typeName}})
  }

  return (
    <section className="relative flex items-center pt-[120px] w-full h-full bg-[#2A4435]">
      <div className="flex w-full h-5/6 md:flex-col sm:flex-col">
        <div className="flex flex-col w-5/12 text-left pl-[150px] sm:pl-[80px] md:flex-row md:w-full md:mb-6 sm:w-full sm:flex-row sm:mb-6">
          <div className="text-[#666666] p-2 font-Notable font-bold text-2xl ">RECYCLING TYPE</div>
          <div className="p-2 text-6xl font-bold text-white font-Notable ">
            <span>CHECK</span>
            <br />
            <span>RECYLING</span>
            <br />
            <span>TYPE.</span>
          </div>
          <div className="mt-2 border-2 border-[#666666] w-[190px] md:w-[0px] sm:w-[0px]"></div>
          <div className="w-2/3 mt-2 text-white md:w-full md:mr-8 sm:mr-8 sm:w-full sm:max-h-[180px] sm:overflow-hidden">
            해당 이미지를 클릭하면 재활용 분류별 통계수치를 확인 할 수 있습니다.{' '}
          </div>
        </div>

        <div className="flex w-7/12 overflow-hidden md:w-2/3 md:m-auto sm:m-auto sm:w-2/3">
          <div ref={sliderRef} className="flex w-full transition-all duration-300 min-w-max">
            {Array.from({length: 2}).map((_, index) => (
              <div className="flex" key={index}>
                {cardData.map((card, cardIndex) => (
                  <Card
                    key={cardIndex}
                    imgsrc={card.imgsrc}
                    typeName={card.typeName}
                    className="mr-6"
                    onClick={CardClicked}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
