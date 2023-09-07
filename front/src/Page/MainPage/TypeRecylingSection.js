import {Icon, Card} from '../../Component'
import pet from '../../images/CardImage/pet.png'

export function TypeRecylingSection({currentSection}) {
  //recycling type

  // 폰트가 피그마의 폰트랑 뭔가 다른데? 폰트 잘못 받았나? 확인 필요

  return (
    <section className="relative flex items-center pt-[120px] w-full h-screen bg-[#2A4435]">
      <div className="flex w-full h-full border-y-2">
        <div className="flex flex-col w-5/12 text-left pl-[130px]">
          <div className="text-[#666666] p-2 font-Notable font-bold text-2xl">RECYCLING TYPE</div>
          <div className='p-2 text-6xl font-bold text-white font-Notable'>
            <span>CHECK</span><br/>
            <span>RECYLING</span><br/>
            <span>TYPE.</span>
          </div>
          <div className='mt-2 border-2 border-[#666666] w-[190px]'></div>
          <div className='w-2/3 mt-2 text-white'>해당 이미지를 클릭하면 재활용 분류별 통계수치를
확인 할 수 있습니다. </div>
        </div>

        {/* 캐러셀 (+ 카드 컴포넌트 만들기) */}
        <div className="flex w-7/12 mt-4 overflow-hidden">
          <div className='flex transition-all duration-300 translate-x-[-330px] min-w-max overflow-x-hidden'>
            <Card imgsrc={pet} typeName='pet' className='mr-6'/>
            <Card imgsrc={pet} typeName='pet' className='mr-6'/>
            <Card imgsrc={pet} typeName='pet' className='mr-6'/>
            <Card imgsrc={pet} typeName='pet' className='mr-6'/>
            <Card imgsrc={pet} typeName='pet' className='mr-6'/>
            <Card imgsrc={pet} typeName='pet'/>
          </div>
        </div>
      </div>
    </section>
  )
}
