import {Card} from '../../Component'
import pet from '../../images/CardImage/pet.png'
import {useState, useEffect, useRef} from 'react'

export function TypeRecylingSection() {
  //recycling type
  // 폰트가 피그마의 폰트랑 뭔가 다른데? 폰트 잘못 받았나? 확인 필요
  const [currentCard, setCurrentCard] = useState(1)
  const sliderRef = useRef(null)

  // currentCard * translate-x-[-330px] 하면 될 듯
  useEffect(() => {
    const timer = setInterval(() => setCurrentCard(prevIndex => (prevIndex > 6 ? 1 : prevIndex + 1)), 3000)
    return () => {
      clearInterval(timer) // timer 함수를 clearInterval을하여 return 한다.
    }
  }, [])

  useEffect(() => {
    // 슬라이더 컨테이너의 너비를 설정하여 슬라이드 이동에 트랜지션 효과 적용
    const slider = sliderRef.current
    if (slider) {
      slider.style.transform = `translateX(-${(currentCard - 1) * 354}px)`
      slider.style.transition = 'transform 0.5s ease-in-out'
    }
  }, [currentCard])

  return (
    <section className="relative flex items-center pt-[120px] w-full h-screen bg-[#2A4435]">
      <div className="flex w-full h-full border-y-2">
        <div className="flex flex-col w-5/12 text-left pl-[130px]">
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

        {/* 캐러셀 (+ 카드 컴포넌트 만들기) */}
        <div className="flex w-7/12 mt-4 overflow-hidden">
          <div ref={sliderRef} className="flex overflow-x-hidden transition-all duration-300 min-w-max">
            <Card imgsrc={pet} typeName="pet" className="mr-6" />
            <Card imgsrc={pet} typeName="pet" className="mr-6" />
            <Card imgsrc={pet} typeName="pet" className="mr-6" />
            <Card imgsrc={pet} typeName="pet" className="mr-6" />
            <Card imgsrc={pet} typeName="pet" className="mr-6" />
            <Card imgsrc={pet} typeName="pet" />
          </div>
        </div>
      </div>
    </section>
  )
}
