import client from './client';

// 직원 개인정보
export const getPayroll = async (shopId) => {
  const response = await client.get(`/timeclock/${shopId}/staff`);
  return response;
};

// 직원 본인 스케줄
export const getOneShft = async (shopId, userId) => {
  const response = await client.get(`/shift/${shopId}/employee/${userId}`);
  return response;
};
