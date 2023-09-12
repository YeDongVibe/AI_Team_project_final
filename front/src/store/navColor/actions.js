// 액션 : 상태 변화 수행을 위해 참조하는 객체
// 액션 생성 함수 모음

export const setNavColor = color => ({
  type: '@navColor/setNavColorAction', // 액션 타입명은 중복되면 안되므로 '@이름/접두사'를 관행으로 사용 함.
  payload: color
})
