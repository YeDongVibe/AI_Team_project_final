// redux를 활용한 nav바 텍스트 색상 변경 커스텀 훅 모음
import {useCallback} from 'react'
import {useDispatch} from 'react-redux'

export function useNavColorBlack() {
  const dispatch = useDispatch()
  const navColorBlack = useCallback(() => {
    dispatch({type: '@navColor/setNavColorAction', payload: 'text-black'})
  }, [dispatch])

  return navColorBlack
}

export function useNavColorWhite() {
  const dispatch = useDispatch()
  const navColorWhite = useCallback(() => {
    dispatch({type: '@navColor/setNavColorAction', payload: 'text-white'})
  }, [dispatch])

  return navColorWhite
}

export function useNavColorGreen() {
  const dispatch = useDispatch()
  const navColorGreen = useCallback(() => {
    dispatch({type: '@navColor/setNavColorAction', payload: 'text-[#647E65]'})
  }, [dispatch])

  return navColorGreen
}
