// 액션 : 상태 변화 수행을 위해 참조하는 객체
// 액션 생성 함수 모음

export const setNavVisible = isVisible => ({
  type: '@navVisible/setNavVisibleAction', // 액션 타입명은 중복되면 안되므로 '@이름/접두사'를 관행으로 사용 함.
  payload: isVisible // 액션 객체의 데이터 속성에 전달된 data 값을 저장
})
