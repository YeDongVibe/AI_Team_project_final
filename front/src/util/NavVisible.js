// redux를 활용한 nav바 변경 커스텀 훅 모음
import {useCallback} from 'react'
import {useDispatch} from 'react-redux'

export function useNavVisibleTrue() {
  const dispatch = useDispatch()
  const navVisibleTrue = useCallback(() => {
    dispatch({type: '@navVisible/setNavVisibleAction', payload: true})
  }, [dispatch])

  return navVisibleTrue
}

export function useNavVisibleFalse() {
  const dispatch = useDispatch()
  const navVisibleFalse = useCallback(() => {
    dispatch({type: '@navVisible/setNavVisibleAction', payload: false})
  }, [dispatch])

  return navVisibleFalse
}
