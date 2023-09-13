// 루트 리듀서
import {combineReducers} from 'redux'
import * as NavColor from './navColor'
import * as NavVisible from './navVisible'

// 여러 리듀서를 하나로 묶음
export const rootReducer = combineReducers({
  navColor: NavColor.reducer, // 실제 리듀서 이름을 사용해야 합니다.
  navVisible: NavVisible.reducer
})
