import client from './client';

export const getPayroll = async (shopId) => {
  const response = await client.get(`/timeclock/${shopId}/staff`);
  return response;
};

export const getOneShft = async (shopId, userId) => {
  const response = await client.get(`/shift/${shopId}/employee/${userId}`);
  return response;
};
