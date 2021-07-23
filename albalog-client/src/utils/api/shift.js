import client from './client';

// 직원 전체 스케줄
export const getAllShift = async (shopId) => {
  const response = await client.get(`/shift/location/${shopId}`);
  return response;
};
