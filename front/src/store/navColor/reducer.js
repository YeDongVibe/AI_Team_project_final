// 리듀서 : 상태 변화를 일으키는 함수

// 초기 상태값 설정
const initialState = {
  payload: 'text-black'
}

export const reducer = (state = initialState, action) => {
  // 상태 업데이트 로직
  switch (action.type) {
    case '@navColor/setNavColorAction':
      return state.payload
    default:
      return state.payload
  }
}
