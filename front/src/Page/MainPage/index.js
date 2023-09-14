// 메인 페이지
import {IntroSection} from './IntroSection'
import {TypeRecylingSection} from './TypeRecylingSection'
import {GuideSection} from './GuideSection'
import {Footer} from '../Routes/Footer'
import {useEffect, useState, useRef} from 'react'
import {useNavVisibleTrue, useNavVisibleFalse} from '../../util'
import {useSelector} from 'react-redux'

export default function MainPage() {
  const mainDivRef = useRef()
  const [currentSection, setCurrentSection] = useState(1)
  const [showIntroAnimation, setShowIntroAnimation] = useState(true)

  const navVisibleTrue = useNavVisibleTrue()
  const navVisibleFalse = useNavVisibleFalse()

  const navVisible = useSelector(state => state.rootReducer.navVisible)

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
    if (mainDivRef.current) {
      // 스크롤 행동 구현
      // 스크롤의 방향 계산 마우스 휠 내릴 떄 100, 마우스 휠 올릴 때 -100
      const deltaY = e.deltaY

      // 스크롤 방향에 따라 새 섹션 계산
      const newSection = currentSection + Math.sign(deltaY)
      // console.log(newSection)

      // 새 섹션 값이 유효한 범위 내에 있도록 보장
      if (newSection >= 1 && newSection <= 4) {
        setCurrentSection(newSection)

        mainDivRef.current.scrollTo({
          top: mainDivRef.current.clientHeight * (newSection - 1),
          behavior: 'smooth'
        })
      }
      if (newSection > 4) {
        navVisibleFalse()
      } else {
        navVisibleTrue()
      }
    }
  }

  // 푸터에 도달 시 nav바 숨김
  useEffect(() => {
    if (currentSection >= 4) {
      navVisibleFalse()
    } else {
      navVisibleTrue()
    }
  }, [navVisible])

  // 마우스 휠 이벤트 및 인트로 애니메이션 상태
  useEffect(() => {
    if (currentSection === 1) {
      setShowIntroAnimation(true)
    } else {
      setShowIntroAnimation(false)
    }

    const mainDiv = mainDivRef.current

    if (mainDiv) {
      const eventTimeout = setTimeout(() => {
        mainDiv.addEventListener('wheel', MouseWheelScroll, {passive: false})
      }, 800)
      // console.log('currentSection: ', currentSection)

      return () => {
        clearTimeout(eventTimeout)
        mainDiv.removeEventListener('wheel', MouseWheelScroll)
      }
    }
  }, [currentSection])

  return (
    <div className="w-full h-full">
      <div ref={mainDivRef} className="relative h-screen overflow-hidden">
        <IntroSection showIntroAnimation={showIntroAnimation} />
        <TypeRecylingSection />
        <GuideSection currentSection={currentSection} />
        <Footer />
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
        <button className="mr-4" onClick={() => scrollToSection(4)}>
          footer
        </button>
      </div>
    </div>
  )
}
