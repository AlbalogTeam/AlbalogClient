import client from 'utils/api/client';

// 인수인계 API
export const getHandOverList = async ({ shopId }) => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();

  const response = await client.get(
    `/transition/${shopId}/${year}-${month}-${day}`,
  );
  return response.data;
};

// 출근 상태 API
export const getCommutingStatus = async ({ shopId }) => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();

  const response = await client.get(
    `/shift/location/${shopId}/daily/${year}-${month}-${day}`,
  );

  return response.data;
};
