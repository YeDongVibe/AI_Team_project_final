// 리듀서 : 상태 변화를 일으키는 함수(상태 값 데이터 수정하는 함수)

// 초기 상태값 설정
const initialState = 'text-white'

export const reducer = (state = initialState, action) => {
  // 상태 업데이트 로직
  switch (action.type) {
    case '@navColor/setNavColorAction':
      return action.payload
    default:
      return state
  }
}
