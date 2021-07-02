import client from 'utils/api';

export const getMonthDataAPI = async ({ year, month, shopId }) => {
  const response = await client.post(`/timeclock/${shopId}/owner`, {
    year,
    month,
  });
  return response.data;
};
