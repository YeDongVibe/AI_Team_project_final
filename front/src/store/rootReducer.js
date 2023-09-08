// 루트 리듀서
import {combineReducers} from 'redux'
import * as N from './navColor'

// 여러 리듀서를 하나로 묶음
export const rootReducer = combineReducers({
  navColor: N.reducer // 실제 리듀서 이름을 사용해야 합니다.
})
