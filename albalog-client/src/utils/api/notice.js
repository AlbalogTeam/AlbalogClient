import client from 'utils/api/client';

// 공지 검색
export const searchNotice = async (locationId, content) => {
  const body = {
    locationId,
    content,
  };
  const response = await client.post('/location/notice/search', body);
  return response.data;
};

// 공지 등록
export const createNotice = async (title, content, shopId) => {
  const body = {
    title,
    content,
  };
  const response = await client.post(`/location/${shopId}/notice/create`, body);
  return response;
};

// 공지 상세보기
export const getNoticeDetail = async (shopId, noticeId) => {
  const response = await client.get(`/location/${shopId}/notice/${noticeId}`);
  return response.data.notice[0];
};

// 공지 삭제
export const deleteNotice = async (shopId, noticeId) => {
  const response = await client.delete(
    `/location/${shopId}/notice/${noticeId}/delete`,
  );
  return response;
};

// 공지 수정
export const updateNotice = async (title, content, shopId, noticeId) => {
  const body = {
    title,
    content,
  };
  const response = await client.patch(
    `/location/${shopId}/notice/${noticeId}/update`,
    body,
  );
  return response;
};
