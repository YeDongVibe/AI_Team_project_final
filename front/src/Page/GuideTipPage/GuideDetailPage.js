import {useEffect, useState} from 'react'
import guide from '../../images/guide.png'
import {useLocation, useNavigate} from 'react-router-dom'
import petMark from '../../images/guide/petMark.png'
import glassMark from '../../images/guide/glassMark.png'
import paperMark from '../../images/guide/paperMark.png'
import canMark from '../../images/guide/canMark.png'
import plasticMark from '../../images/guide/plasticMark.png'
import vinlyMark from '../../images/guide/vinlyMark.png'
import paperpackMark from '../../images/guide/paperpackMark.png'

export function GuideDetailPage() {
  const location = useLocation()
  const Navigate = useNavigate()
  const [content, setContent] = useState()

  useEffect(() => {
    switch (location.state.data) {
      case 'pet': {
        setContent(
          <div className="mb-10">
            <table className="border-collapse">
              <tr>
                <th className="border-2">세부품목</th>
                <th className="border-2">배출방법(KR)</th>
                <th className="border-2">배출방법(ENG)</th>
                <th className="border-2">해당품목</th>
                <th className="border-2">비해당품목</th>
              </tr>
              <tr>
                <td className="text-center border-2" rowSpan={2}>
                  패트 재활용 마크 표시가 있는 제품
                  <img src={petMark} className="m-auto" />
                </td>
                <td className="border-2">내용물을 비우고 물로 헹구는 등 이물질을 제거하고 말린 후 배출</td>
                <td className="border-2">Empty the contents, clean before disposal.</td>
                <td className="border-2" rowSpan={2}>
                  우유팩, 두유팩, 소주팩, 쥬스팩 등
                </td>
                <td className="border-2" rowSpan={2}>
                  패트 기호 표시가 없는 제품
                </td>
              </tr>
              <tr>
                <td className="border-2">부착상표, 부속품은 본체와 분리하여 별도 배출.</td>
                <td className="border-2">Remove any packaging or plastic wrappers attached.</td>
              </tr>
            </table>
          </div>
        )
        break
      }
      case 'glass': {
        setContent(
          <div className="mb-10">
            <table className="border-collapse">
              <tr className="border-2">
                <th className="border-2">세부품목</th>
                <th className="border-2">배출방법(KR)</th>
                <th className="border-2">배출방법(ENG)</th>
                <th className="border-2">해당품목</th>
                <th className="border-2">비해당품목</th>
              </tr>
              <tr>
                <td className="text-center border-2" rowSpan={4}>
                  음료수병, 기타병류
                  <img src={glassMark} className="m-auto" />
                </td>
                <td className="border-2">내용물을 비우고 물로 헹구는 등 이물질을 제거하고 말린 후 배출</td>
                <td className="border-2">Before separating the trash, empty the contents and wash the glasses.</td>
                <td className="border-2" rowSpan={4}>
                  음료수병, 와인병, 양주병, 드링크병 등
                </td>
                <td className="border-2" rowSpan={4}>
                  코팅 및 다양한 색상이 들어간 유리제품, 내열 유리제품, 크리스탈 유리제품, 판유리, 조명가구용 유리류,
                  사기, 도자기류 등
                </td>
              </tr>
              <tr className="border-2">
                <td className="border-2">담배꽁초 등 이물질을 넣지 않고 배출</td>
                <td className="border-2">Dispose without adding foreign substances such as cigarette butts, etc.</td>
              </tr>
              <tr>
                <td className="border-2">깨진 유리제품은 신문지 등에 싸서 종량제 봉투 배출</td>
                <td className="border-2">Broken glasses have to be properly wrapped with newspaper.</td>
              </tr>
              <tr>
                <td className="border-2">
                  소주, 맥주 등 빈용기보증금 대상 유리병은 소매점 등으로 반납하여 보증금 환급
                </td>
                <td className="border-2">
                  Items for the container deposit scheme should be returned to retail stores.
                </td>
              </tr>
            </table>
          </div>
        )
        break
      }
      case 'can': {
        setContent(
          <div className="mb-10">
            <table className="border-collapse">
              <tr>
                <th className="border-2">세부품목</th>
                <th className="border-2">배출방법(KR)</th>
                <th className="border-2">배출방법(ENG)</th>
                <th className="border-2">해당품목</th>
                <th className="border-2">비해당품목</th>
              </tr>
              <tr>
                <td className="border-2" rowSpan={4}>
                  살균팩, 멸균팩
                  <img src={canMark} className="m-auto" />
                </td>
                <td className="border-2">내용물을 비우고 물로 헹구는 등 이물질을 제거하여 배출</td>
                <td className="border-2">Take out the contents and wash them.</td>
                <td className="border-2" rowSpan={4}>
                  음료수캔, 맥주캔, 통조림캔, 부탄가스 용기, 살충제 용기, 스프레이 용기 등
                </td>
                <td className="border-2" rowSpan={4}>
                  알루미늄 호일 등
                </td>
              </tr>
              <tr>
                <td className="border-2">담배꽁초 등 이물질을 넣지 않고 배출</td>
                <td className="border-2">Dispose without adding foreign substances such as cigarette butts, etc.</td>
              </tr>
              <tr>
                <td className="border-2">플라스틱 뚜껑 등 금속캔과 다른 재질은 제거한 후 배출</td>
                <td className="border-2">Remove plastic caps and different materials from the cans before disposal.</td>
              </tr>
              <tr>
                <td className="border-2">
                  가스용기는 가급적 통풍이 잘되는 장소에서 노즐을 누르는 등 내용물을 완전히 제거한 후 배출
                </td>
                <td className="border-2">Take out the gas from the gas container.</td>
              </tr>
            </table>
          </div>
        )
        break
      }
      case 'paper': {
        setContent(
          <div className="mb-10">
            <table className="border-collapse">
              <tr>
                <th className="border-2">세부품목</th>
                <th className="border-2">배출방법(KR)</th>
                <th className="border-2">배출방법(ENG)</th>
                <th className="border-2">해당품목</th>
                <th className="border-2">비해당품목</th>
              </tr>
              <tr>
                <td className="text-center border-2" rowSpan={2}>
                  신문지, 책자, 노트, 종이컵, 상자류
                  <img src={paperMark} className="m-auto" />
                </td>
                <td className="border-2">
                  물기에 젖지 않도록 하고, 반듯하게 펴서 차곡차곡 쌓은 후 흩날리지 않도록 끈 등으로 묶어서 배출
                </td>
                <td className="border-2">
                  Please make sure they don't get wet and stack them, tied with a rope or something.
                </td>
                <td className="border-2" rowSpan={2}>
                  책, 잡지, 공책, 노트, 종이박스, 골판지 등
                </td>
                <td className="border-2" rowSpan={2}>
                  비닐 코팅 종이, 금작, 은박지, 벽지, 자석전단지, 이물질을 제거하기 어려운 경우 등
                </td>
              </tr>
              <tr>
                <td className="border-2">스프링, 테이프 등 종이류와 다른 재질은 제거한 후 배출</td>
                <td className="border-2">Remove the different materials like springs, tape, etc.</td>
              </tr>
            </table>
          </div>
        )
        break
      }
      case 'paperpack': {
        setContent(
          <div className="mb-10">
            <table className="border-collapse">
              <tr className="border-2" rowspan="2">
                <th className="border-2">세부품목</th>
                <th className="border-2">배출방법(KR)</th>
                <th className="border-2">배출방법(ENG)</th>
                <th className="border-2">해당품목</th>
                <th className="border-2">비해당품목</th>
              </tr>
              <tr className="border-2">
                <td className="border-2" rowSpan={3}>
                  살균팩, 멸균팩
                  <img src={paperpackMark} className="m-auto" />
                </td>
                <td className="border-2">내용물을 비우고 물로 헹구는 등 이물질을 제거하고 말린 후 배출</td>
                <td className="border-2">You need to rinse or wash the paperpacks before disposing of them.</td>
                <td className="border-2" rowSpan={3}>
                  우유팩, 두유팩, 소주팩, 쥬스팩 등
                </td>
                <td className="border-2" rowSpan={3}>
                  종이, 신문지, 종이류, 종이컵 등
                </td>
              </tr>
              <tr className="border-2">
                <td className="border-2">빨대, 비닐 등 종이팩과 다른 재질은 제거한 후 배출</td>
                <td className="border-2">
                  Remove different materials(straw, vunly, etc.) before disposing fo the paperpacks.
                </td>
              </tr>
              <tr className="border-2">
                <td className="border-2">일반 종이류와 혼합되지 않게 종이팩 전용수거함에 배출</td>
                <td className="border-2">
                  Don't mixed with paper, Please dispose fo them in a paperpack recycling bin.
                </td>
              </tr>
            </table>
          </div>
        )
        break
      }
      case 'plastic': {
        setContent(
          <div className="mb-10">
            <table className="text-center border-collapse">
              <tr>
                <th className="border-2">세부품목</th>
                <th className="border-2">배출방법(KR)</th>
                <th className="border-2">배출방법(ENG)</th>
                <th className="border-2">해당품목</th>
                <th className="border-2">비해당품목</th>
              </tr>
              <tr>
                <td className="border-2" rowSpan={2}>
                  플라스틱 재활용 마크 표시가 된 제품
                </td>
                <td className="border-2">내용물을 비우고 물로 헹구는 등 이물질을 제거하여 배출</td>
                <td className="border-2">Empty the contents, clean before disposal.</td>
                <td className="border-2" rowSpan={2}>
                  플라스틱 기호가 표시된 제품
                </td>
                <td className="border-2" rowSpan={2}>
                  종이, 신문지, 종이류, 종이컵 등
                </td>
              </tr>
              <tr>
                <td className="border-2">
                  펌핑식 용기의 부속품(노즐, 스프링 등)은 별도 배출 후 본체만 깨끗이 씻어서 배출
                </td>
                <td className="border-2">
                  The components of the pump-type container (nozzle, spring, etc.) should be disposed of separately and
                  cleaned before disposal.
                </td>
              </tr>
            </table>
            <img src={plasticMark} className="m-auto" />
          </div>
        )
        break
      }
      case 'vinly': {
        setContent(
          <div className="mb-10">
            <table className="border-collapse">
              <tr>
                <th className="border-2">세부품목</th>
                <th className="border-2">배출방법(KR)</th>
                <th className="border-2">배출방법(ENG)</th>
                <th className="border-2">해당품목</th>
                <th className="border-2">비해당품목</th>
              </tr>
              <tr>
                <td className="text-center border-2" rowSpan={2}>
                  "PET, PVC, PE, PP,PS, PSP 재질 등의 용기·트레이류"
                  <img src={vinlyMark} className="m-auto" />
                </td>
                <td className="border-2">내용물을 비우고 물로 헹구는 등 이물질을 제거하고 말린 후 배출</td>
                <td className="border-2">Empty the contents, clean before disposal.</td>
                <td className="border-2" rowSpan={2}>
                  1회용 봉투 등 각종 비닐 류
                </td>
                <td className="border-2" rowSpan={2}>
                  깨끗하게 이물질 제거가 되지 않은 랩필름, 식탁보, 고마장갑, 장판, 돗자리, 섬유류 등
                </td>
              </tr>
              <tr>
                <td className="border-2">흩날리지 않도록 봉투에 담아 배출</td>
                <td className="border-2">Please dispose of them in a plastic bag to prevent them from scattering.</td>
              </tr>
            </table>
          </div>
        )
        break
      }
    }
  }, [])

  const listOnClicked = () => {
    Navigate('/guide')
  }

  return (
    <div className="w-full h-full pt-[120px]">
      <div className="relative flex items-center justify-center w-full">
        <img src={guide} alt="" className="object-cover w-full" />
        <p className="absolute text-3xl font-bold text-black font-poppins">Guide & Tip</p>
      </div>

      <div className="flex flex-col w-full h-full mt-16 font-poppins">
        <div className="w-full px-24">
          <div className="p-6 text-4xl font-bold text-center border-gray-200 border-y-2">{location.state.data}</div>
        </div>
        <div className="w-full px-24 my-10 text-lg">
          <div className="pb-8 border-b-2">{content}</div>
        </div>
        <div className="flex justify-end">
          <button className="mr-24 text-white btn btn-xl btn-success hover:bg-slate-400" onClick={listOnClicked}>
            목록
          </button>
        </div>
      </div>
    </div>
  )
}
