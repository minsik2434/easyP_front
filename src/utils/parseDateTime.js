export const parseDateTime = (dateTime) => {
  if (!dateTime) return "Invalid Date"; // 날짜가 없을 경우 예외 처리

  const date = new Date(dateTime);
  if (isNaN(date.getTime())) return "Invalid Date"; // 유효하지 않은 날짜 예외 처리

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("ko-KR", options);

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0"); // 두 자리로 변환
  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // 12시간제로 변환 (0시는 12로 표시)

  return `${formattedDate} ${period} ${hours}시 ${minutes}분`;
};
