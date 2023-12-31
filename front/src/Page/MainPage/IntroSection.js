import papercup from '../../images/yellow-cups-6576738_1280_1.png'
import {Icon} from '../../Component'
import {useState, useEffect} from 'react'

export function IntroSection({showIntroAnimation}) {
  const [count, setCount] = useState(0)
  const [landingText, setLandingText] = useState('')
  const [startSecondAnimation, setStartSecondAnimation] = useState(false)
  const completeText = 'Tracing the Green Path of Recycling'
  // count가 8일 때 글자 굵기 변경 , 26 일때 줄바꿈

  //스크롤 효과로 introSection이 재등장 시 애니메이션 재시작
  useEffect(() => {
    if (!showIntroAnimation) {
      setCount(0)
      setLandingText('')
      setStartSecondAnimation(false)
    } else {
      // 첫 애니메이션 종료 후 글자 도도도도동
      const ecoTraceAnimationTimeout = setTimeout(() => {
        setStartSecondAnimation(true)
      }, 2000)

      return () => {
        clearTimeout(ecoTraceAnimationTimeout)
      }
    }
  }, [showIntroAnimation])

  useEffect(() => {
    if (!startSecondAnimation) return

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
  }, [count, startSecondAnimation])

  return (
    <section className="relative top-0 flex items-center justify-center w-full h-full">
      <img src={papercup} className="absolute top-0 object-cover w-full h-full bg-[#2A4435]" />
      <p
        className={`w-[550px] h-[198px] z-10 text-[99px] text-left text-white ml-6 mr-6 relative bottom-40 lg:text-[80px] md:text-[65px] sm:text-[50px] ${
          showIntroAnimation ? 'animate-zoom-in' : ''
        }`}>
        <span className="w-[550px] h-[198px] text-left font-porter-sans ">ECO</span>
        <br />
        <span className="w-[550px] h-[198px] text-left font-porter-sans">TRACE</span>
      </p>
      <p className="w-[407px] relative z-10 text-left text-white translate-y-4 bottom-40 ">
        {Array.from(landingText).map((char, index) => {
          if (index < 8 || index > 25) {
            return (
              <span
                key={index}
                className={`text-[38px] font-poppins font-semibold text-left text-white md:text-[30px] sm:text-[25px] ${
                  showIntroAnimation ? 'animate-type-in' : ''
                }`}>
                {char}
              </span>
            )
          } else if (index === 25) {
            return <br key={index} />
          } else {
            return (
              <span
                key={index}
                className="text-[34px] font-light font-poppins text-left text-white animate-type-in md:text-[27px] sm:text-[22px]">
                {char}
              </span>
            )
          }
        })}
      </p>
      <Icon name="arrow_downward" className="absolute text-3xl font-bold text-white bottom-6 animate-bounce" />
    </section>
  )
}
