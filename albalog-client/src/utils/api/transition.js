import client from 'utils/api/client';

// 당일 인수인계 조회
export const getTransitions = async (shopid, year, month, day) => {
  const response = await client.get(
    `/transition/${shopid}/${year}-${month}-${day}`,
  );
  return [...response.data.satisfyTransitions].reverse();
};

// 인수인계 생성
export const createTransition = async (
  locationId,
  date,
  description,
  userId,
) => {
  const body = {
    locationId,
    date,
    description,
    userId,
  };
  const response = await client.post('/transition/create', body);
  return [...response.data.transitions].reverse();
};

// 인수인계 삭제
export const deleteTransition = async (shopid, transitionid) => {
  const response = await client.delete(
    `/transition/${shopid}/delete/${transitionid}`,
  );
  return [...response.data.transitions].reverse();
};

// 인수인계 수정
export const updateTransition = async (
  locationId,
  transitionId,
  description,
  userId,
) => {
  const body = {
    locationId,
    transitionId,
    description,
    userId,
  };
  const response = await client.patch('/transition/desc/update', body);
  return [...response.data.transitions].reverse();
};

// 인수인계 체크박스
export const toggleTransition = async (locationId, transitionId, userId) => {
  const body = {
    locationId,
    transitionId,
    userId,
  };

  const response = await client.patch(`/transition/toggle`, body);
  return [...response.data.transitions].reverse();
};
