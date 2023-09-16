export function parseDate(dateStr, dateFormat) {
  const parts = dateStr.split('-')
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10)
    const month = parseInt(parts[1], 10) - 1 // JavaScript에서 월은 0부터 시작하므로 1을 빼줍니다.
    const day = parseInt(parts[2], 10)

    // 새로운 Date 객체 생성
    const parsedDate = new Date(year, month, day)

    // 날짜 형식을 yyyy-MM-dd 형식으로 변환
    const formattedDate = parsedDate.toISOString().split('T')[0]

    return formattedDate
  } else {
    throw new Error('날짜 문자열 형식이 올바르지 않습니다.')
  }
}
