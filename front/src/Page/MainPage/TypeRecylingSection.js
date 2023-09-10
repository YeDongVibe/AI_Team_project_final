import {Card} from '../../Component'
import pet from '../../images/CardImage/pet.png'
import glass from '../../images/CardImage/glass.png'
import {useState, useEffect, useRef} from 'react'

export function TypeRecylingSection() {
  //recycling type
  // 폰트가 피그마의 폰트랑 뭔가 다른데? 폰트 잘못 받았나? 확인 필요
  const [currentCard, setCurrentCard] = useState(1)
  const [customIntervel, setCustomIntervel] = useState(3000) // 이미지 이동시간
  const sliderRef = useRef(null)

  const cardCount = 6
  const cardData = [
    {imgsrc: pet, typeName: 'pet'},
    {imgsrc: glass, typeName: 'glass'},
    {imgsrc: pet, typeName: 'pet'},
    {imgsrc: pet, typeName: 'pet'},
    {imgsrc: pet, typeName: 'pet'},
    {imgsrc: pet, typeName: 'pet'},
    {imgsrc: pet, typeName: 'pet'}
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
    console.log(slider.offsetWidth)
    if (slider) {
      const sliderWidth = slider.offsetWidth
      slider.style.width = `${sliderWidth * cardCount}px`
      console.log(currentCard)
      slider.style.transform = `translateX(-${(currentCard - 1) * 354}px)`
      slider.style.transition = `transform ${currentCard === 1 ? 0 : 0.5}s ease-in-out`
    }
  }, [currentCard, cardCount])

  return (
    <section className="relative flex items-center pt-[120px] w-full h-full bg-[#2A4435]">
      <div className="flex w-full h-4/6 ">
        <div className="flex flex-col w-5/12 text-left pl-[150px] ">
          <div className="text-[#666666] p-2 font-Notable font-bold text-2xl">RECYCLING TYPE</div>
          <div className="p-2 text-6xl font-bold text-white font-Notable">
            <span>CHECK</span>
            <br />
            <span>RECYLING</span>
            <br />
            <span>TYPE.</span>
          </div>
          <div className="mt-2 border-2 border-[#666666] w-[190px]"></div>
          <div className="w-2/3 mt-2 text-white">
            해당 이미지를 클릭하면 재활용 분류별 통계수치를 확인 할 수 있습니다.{' '}
          </div>
        </div>

        <div className="flex w-7/12 overflow-hidden">
          <div ref={sliderRef} className="flex w-full transition-all duration-300 min-w-max">
            {Array.from({length: 2}).map((_, index) => (
              <div className="flex" key={index}>
                {cardData.map((card, cardIndex) => (
                  <Card key={cardIndex} imgsrc={card.imgsrc} typeName={card.typeName} className="mr-6" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
