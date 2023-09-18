import {useEffect, useState} from 'react'
import guide from '../../images/guide.png'
import {useLocation} from 'react-router-dom'

export function GuideDetailPage() {
  const location = useLocation()
  const [content, setContent] = useState()

  useEffect(() => {
    switch (location.state.data) {
      case 'pet': {
        setContent(
          <div>
            <div>내용물을 비우고 물로 헹구는 등 이물질을 제거하고 말린 후 배출</div>
            <div>부착상표, 부속품은 본체와 분리하여 별도 배출.</div>
          </div>
        )
        break
      }
      case 'glass': {
        setContent(
          <div>
            <div>내용물을 비우고 물로 헹구는 등 이물질을 제거하고 말린 후 배출</div>
            <div>담배꽁초 등 이물질을 넣지 않고 배출</div>
            <div>유리병이 깨지지 않도록 주의하여 배출</div>
            <div>소주, 맥주 등 빈용기보증금 대상 유리병은 소매점 등으로 반납하여 보증금 환급</div>
          </div>
        )
        break
      }
      case 'can': {
        setContent(
          <div>
            <div>내용물을 비우고 물로 헹구는 등 이물질을 제거하여 배출</div>
            <div>담배꽁초 등 이물질을 넣지 않고 배출</div>
            <div>플라스틱 뚜껑 등 금속캔과 다른 재질은 제거한 후 배출</div>
            <div>가스용기는 가급적 통풍이 잘되는 장소에서 노즐을 누르는 등 내용물을 완전히 제거한 후 배출</div>
          </div>
        )
        break
      }
      case 'paper': {
        setContent(
          <div>
            <div> 물기에 젖지 않도록 하고, 반듯하게 펴서 차곡차곡 쌓은 후 흩날리지 않도록 끈 등으로 묶어서 배출</div>
            <div>스프링, 테이프 등 종이류와 다른 재질은 제거한 후 배출</div>
            <div>내용물을 비우고 물로 헹구는 등 이물질을 제거하여 배출</div>
          </div>
        )
        break
      }
      case 'paperpack': {
        setContent(
          <div>
            <div>내용물을 비우고 물로 헹구는 등 이물질을 제거하고 말린 후 배출</div>
            <div>빨대, 비닐 등 종이팩과 다른 재질은 제거한 후 배출</div>
            <div>일반 종이류와 혼합되지 않게 종이팩 전용수거함에 배출</div>
            <div>
              종이팩 전용수거함이 없는 경우에는 종이류와 구분할 수 있도록 가급적 끈 등으로 묶어 종이류 수거함으로 배출
            </div>
          </div>
        )
        break
      }
      case 'plastic': {
        setContent(
          <div>
            <div>내용물을 비우고 물로 헹구는 등 이물질을 제거하여 배출</div>
            <div>펌핑식 용기의 부속품(노즐, 스프링 등)은 별도 배출 후 본체만 깨끗이 씻어서 배출</div>
          </div>
        )
        break
      }
      case 'vinly': {
        setContent(
          <div>
            <div>내용물을 비우고 물로 헹구는 등 이물질을 제거하고 말린 후 배출</div>
            <div>흩날리지 않도록 봉투에 담아 배출</div>
          </div>
        )
        break
      }
    }
  }, [])

  return (
    <div className="w-full h-full pt-[120px]">
      <div className="relative flex items-center justify-center w-full">
        <img src={guide} alt="" className="object-cover w-full" />
        <p className="absolute text-3xl font-bold text-black font-poppins">Guide & Tip</p>
      </div>

      <div className="flex flex-col w-full h-full mt-16 font-poppins">
        <div className="w-full px-24 mx-9">
          <div className="p-6 text-4xl font-bold text-center border-gray-200 border-y-2">{location.state.data}</div>
        </div>
        <div className="w-full px-24 my-10 text-lg mx-9">
          <div className="pb-8 border-b-2">{content}</div>
        </div>
      </div>
    </div>
  )
}
