import {cookies} from 'react-cookie'
import jwtDecode from 'jwt-decode'

const cookies = new Cookies()

// 쿠키 만드는 함수
export const setCookie = (name, value, options) => {
    return cookies.set(name, value, {...options})
  }
  
  // 쿠키 가져오는 함수
  export const getCookie = (name) => {
    return cookies.get(name)
  }
  
  // 쿠키 삭제 함수
  export const removeCookie = (name, options) => {
    return cookies.remove(name, {...options})
  }

  // 브라우저의 쿠키가 있는지 확인 후 jwt토큰 해독 하여 사용자 정보 가져오는 함수
  export const getUserInfoFromToken = () => {
    const cookies = document.cookie.split('; ')
  
    // 저장 한 쿠키 이름 확인 필요함,,
    const tokenCookie = cookies.find(cookie => cookie.startsWith('accessJwtToken:='))
  
    if (tokenCookie) {
      const token = tokenCookie.split('=')[1].trim() // 앞뒤 공백 제거
  
      // console.log('토큰 값:', token) // 디버그 로그: 쿠키에서 토큰 값이 올바른지 확인
  
      try {
        const decodedToken = jwtDecode(token) // 해독된 토큰의 형태
        // console.log(decodedToken)
        const userInfo = decodedToken.userId
        return userInfo
      } catch (error) {
        console.error('토큰 해독 에러:', error)
        return null
      }
    } else {
      console.error('토큰 쿠키를 찾을 수 없습니다.')
      return null
    }
  }