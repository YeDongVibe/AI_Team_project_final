import papercup from '../../images/yellow-cups-6576738_1280_1.png'
import {Icon} from '../../Component'
import {useState, useEffect, useRef} from 'react'

export function IntroSection({currentSection}) {
  // TODO: 스크롤 내리고 다시 올라왔을 떄 애니메이션 동작 안하는 버그 수정
  const [count, setCount] = useState(0)
  const [landingText, setLandingText] = useState('')
  const [startAnimation, setStartAnimation] = useState(false)
  const completeText = 'Tracing the Green Path of Recycling'
  // 8, 26

  useEffect(() => {
    const ecoTraceAnimationTimeout = setTimeout(() => {
      setStartAnimation(true)
    }, 2000) // Set the desired time for the animation to complete

    return () => {
      clearTimeout(ecoTraceAnimationTimeout)
    }
  }, [])

  useEffect(() => {
    if (!startAnimation) return

    const intervalId = setInterval(() => {
      // count 값이 완성된 텍스트의 길이보다 크거나 같을 경우 중지
      if (count >= completeText.length) {
        clearInterval(intervalId)
        return
      }

      setLandingText(prev => {
        let result = prev ? prev + completeText[count] : completeText[0]
        setCount(prev => prev + 1)
        return result
      })
    }, 150)

    return () => {
      clearInterval(intervalId) // 컴포넌트 언마운트 시 타이머 정리
    }
    // }, 3000)
  }, [count, startAnimation])

  return (
    <div className="relative top-0 flex items-center justify-center w-full h-screen">
      <img src={papercup} className="absolute top-0 object-cover w-full h-full bg-[#2A4435]" />
      <p className="w-[550px] h-[198px] z-10 text-[99px] text-left text-white mr-6 relative bottom-40 animate-zoom-in">
        <span className="w-[550px] h-[198px] text-[99px] text-left font-porter-sans ">ECO</span>
        <br />
        <span className="w-[550px] h-[198px] text-[99px] text-left font-porter-sans">TRACE</span>
      </p>
      <p className="w-[407px] relative z-10 text-left text-white translate-y-4 bottom-40">
        {Array.from(landingText).map((char, index) => {
          if (index < 8 || index > 25) {
            return (
              <span key={index} className="text-[38px] font-poppins font-semibold text-left text-white animate-type-in">
                {char}
              </span>
            )
          } else if (index === 25) {
            return <br />
          } else {
            return (
              <span key={index} className="text-[34px] font-light font-poppins text-left text-white animate-type-in">
                {char}
              </span>
            )
          }
        })}
      </p>
      <Icon name="arrow_downward" className="absolute text-3xl font-bold text-white bottom-6 animate-bounce" />
    </div>
  )
}
