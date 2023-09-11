import {useNavColorGreen, useNavColorWhite} from '../../util'
import recyling_tip from '../../images/recyling_tip.png'
import footer_1 from '../../images/footer-1.png'
import {useEffect} from 'react'
import {Link} from 'react-router-dom'

export function GuideSection({currentSection}) {
  const setNavColorGreen = useNavColorGreen() // 커스텀 훅을 호출하여 함수를 가져옴.
  const setNavColorWhite = useNavColorWhite()

  // setNavColorBlack 함수를 호출하여 액션을 디스패치
  useEffect(() => {
    if (currentSection === 3) setNavColorGreen()
    else setNavColorWhite()
  }, [currentSection])

  return (
    <section className="w-full h-full bg-gradient-to-b from-[#EEFFE7] pt-[120px]">
      <div className="w-full h-full border-y-2">
        <div className="w-full pt-10 pr-10 text-6xl font-bold text-right font-Notable">RECYLING TIP & GUIDE</div>
        <div className="flex w-full pt-10">
          <div className="w-1/2">
            <img src={recyling_tip} alt="" className="p-10 pl-[150px]" />
          </div>
          <div className="flex flex-col items-end justify-around w-1/2 pr-20">
            <p className="text-right">
              올바르게 분리된 쓰레기는 자원을 보호하며 <br />
              재활용 가능한 물질을 새롭게 활용하는 기회를 제공합니다.
              <br />
              우리의 작은 노력이 큰 변화를 만들 수 있다는 것을 명심하세요.
            </p>
            <Link to="/guide" className="w-40 btn rounded-2xl bg-[#B0E2C5] text-white">
              View More
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className="fill-[#67BD8C]">
                <path d="M278.5 215.6L23 471c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l74.8-74.8c7.4 4.6 15.3 8.2 23.8 10.5C200.3 452.8 270 454.5 338 409.4c12.2-8.1 5.8-25.4-8.8-25.4l-16.1 0c-5.1 0-9.2-4.1-9.2-9.2c0-4.1 2.7-7.6 6.5-8.8l97.7-29.3c3.4-1 6.4-3.1 8.4-6.1c4.4-6.4 8.6-12.9 12.6-19.6c6.2-10.3-1.5-23-13.5-23l-38.6 0c-5.1 0-9.2-4.1-9.2-9.2c0-4.1 2.7-7.6 6.5-8.8l80.9-24.3c4.6-1.4 8.4-4.8 10.2-9.3C494.5 163 507.8 86.1 511.9 36.8c.8-9.9-3-19.6-10-26.6s-16.7-10.8-26.6-10C391.5 7 228.5 40.5 137.4 131.6C57.3 211.7 56.7 302.3 71.3 356.4c2.1 7.9 12 9.6 17.8 3.8L253.6 195.8c6.2-6.2 16.4-6.2 22.6 0c5.4 5.4 6.1 13.6 2.2 19.8z" />
              </svg>
            </Link>
          </div>
        </div>

        {/*  */}
        <div className="relative w-full mt-10">
          <img src={footer_1} alt="" className="w-full " />
          <p className="absolute font-bold text-white left-16 top-6 text-7xl font-Notable">Be a Recycling Hero</p>
          <p className="absolute text-4xl text-white font-poppins left-16 bottom-6">
            Every item you recycle brings us closer to a<span className="font-semibold"> greener future! </span>
          </p>
        </div>
        {/*  */}
      </div>
    </section>
  )
}
