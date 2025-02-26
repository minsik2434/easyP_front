export const parseDateTime = (dateTime) => {
  if (!dateTime) return "Invalid Date"; // 날짜가 없을 경우 예외 처리

  const date = new Date(dateTime);
  if (isNaN(date.getTime())) return "Invalid Date"; // 유효하지 않은 날짜 처리

  const now = new Date();
  const diffMs = now.getTime() - date.getTime(); // 현재시간과의 차이 (밀리초)
  const diffMinutes = Math.floor(diffMs / (1000 * 60)); // 분 단위 차이

  // 1시간 이내이면 (0분 미만은 "방금 전" 처리)
  if (diffMinutes < 60) {
    return diffMinutes < 1 ? "방금 전" : `${diffMinutes}분 전`;
  }

  // 24시간(하루) 이내이면
  if (diffMinutes < 1440) {
    const diffHours = Math.floor(diffMinutes / 60);
    return `${diffHours}시간 전`;
  }

  // 하루 이상이면 (일 단위)
  const diffDays = Math.floor(diffMinutes / 1440);
  if (diffDays < 30) {
    return `${diffDays}일 전`;
  } else if (diffDays < 365) {
    const diffMonths = Math.floor(diffDays / 30);
    return diffMonths === 1 ? "한달 전" : `${diffMonths}달 전`;
  } else {
    const diffYears = Math.floor(diffDays / 365);
    return diffYears === 1 ? "1년 전" : `${diffYears}년 전`;
  }
};
