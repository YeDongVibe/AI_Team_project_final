// 메인 페이지
import {IntroSection} from './IntroSection'
import {TypeRecylingSection} from './TypeRecylingSection'
import {GuideSection} from './GuideSection'
import {useEffect, useState, useRef} from 'react'

export default function MainPage() {
  const mainDivRef = useRef()
  const [currentSection, setCurrentSection] = useState(1)

  // 해당 섹션으로 이동
  const scrollToSection = sectionNumber => {
    setCurrentSection(sectionNumber)

    mainDivRef.current.scrollTo({
      top: mainDivRef.current.clientHeight * (sectionNumber - 1),
      behavior: 'smooth'
    })
  }

  // 마우스 휠 이벤트에 적용할 함수
  const MouseWheelScroll = e => {
    // 크롬 기본 마우스 휠 이벤트 막기
    e.preventDefault()
    // 스크롤 행동 구현
    // 스크롤의 방향 계산 마우스 휠 내릴 떄 100, 마우스 휠 올릴 때 -100
    const deltaY = e.deltaY

    // 스크롤 방향에 따라 새 섹션 계산
    const newSection = currentSection + Math.sign(deltaY)

    // 새 섹션 값이 유효한 범위 내에 있도록 보장
    if (newSection >= 1 && newSection <= 3) {
      setCurrentSection(newSection)

      mainDivRef.current.scrollTo({
        top: mainDivRef.current.clientHeight * (newSection - 1),
        behavior: 'smooth'
      })
    }
  }

  // 마우스 휠 이벤트
  useEffect(() => {
    // console.log(currentSection)
    if (mainDivRef.current) {
      setTimeout(() => {
        mainDivRef.current.addEventListener('wheel', MouseWheelScroll, {passive: false})
      }, 800)
    }
    return () => {
      if (mainDivRef.current) {
        mainDivRef.current.removeEventListener('wheel', MouseWheelScroll)
      }
    }
  }, [currentSection])

  return (
    <div className="w-full h-full">
      <div ref={mainDivRef} className="relative h-screen overflow-hidden">
        <IntroSection currentSection={currentSection} />
        <TypeRecylingSection currentSection={currentSection} />
        <GuideSection currentSection={currentSection} />
      </div>
      <div className="fixed flex flex-col bottom-1/2 left-4">
        <button className="mr-4" onClick={() => scrollToSection(1)}>
          Section 1
        </button>
        <button className="mr-4" onClick={() => scrollToSection(2)}>
          Section 2
        </button>
        <button className="mr-4" onClick={() => scrollToSection(3)}>
          Section 3
        </button>
      </div>
    </div>
  )
}
