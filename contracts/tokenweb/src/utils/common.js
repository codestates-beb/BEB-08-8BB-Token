/** 공통으로 사용되는 util함수들 */

//딜레이 주기
export const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//주소 속성값 바꾸기
export const changeParam = (urlOrg, paramName, paramValue) => {
  var url = new URL(urlOrg);
  var params = new URLSearchParams(url.search);
  params.set(paramName, paramValue); // 값을 변경
  url.search = params.toString(); // 새로운 쿼리 문자열로 업데이트
  return url;
}