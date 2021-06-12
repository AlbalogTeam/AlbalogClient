// 페이지네이션 페이지 자르는 함수

import _ from 'lodash';

// 각 페이지에 따라 보여지는 컨텐츠 배열을 반환하는 유틸 함수
export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize; // 자를 배열의 시작점

  return _(items)
    .slice(startIndex) // 시작점부터 배열을 자르되
    .take(pageSize) // pageSize만큼의 배열을 취함
    .value(); // lodash wrapper 객체를 regular 배열로 변환
}
