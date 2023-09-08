import {useNavColorGreen, useNavColorWhite} from '../../util'
import {useEffect} from 'react'

export function GuideSection({currentSection}) {
  const setNavColorGreen = useNavColorGreen() // 커스텀 훅을 호출하여 함수를 가져옴.
  const setNavColorWhite = useNavColorWhite()

  // setNavColorBlack 함수를 호출하여 액션을 디스패치
  useEffect(() => {
    if (currentSection === 3) setNavColorGreen()
    else setNavColorWhite()
  }, [currentSection])

  return <section className="w-full h-screen bg-gradient-to-b from-[#EEFFE7]"></section>
}
