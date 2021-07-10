import client from 'utils/api';

export const getWorkManuals = async (shopid) => {
  const response = await client.get(`/location/${shopid}/workmanual`);
  return [...response.data.workManuals].reverse();
};

export const deleteManual = async (shopid, manualid) => {
  const response = await client.delete(
    `/location/${shopid}/workmanual/${manualid}/delete`,
  );
  return response;
};

export const updateManual = async (
  shopid,
  manualid,
  title,
  content,
  category,
) => {
  const body = {
    title,
    content,
    category,
  };
  const response = await client.patch(
    `/location/${shopid}/workmanual/${manualid}/update`,
    body,
  );
  return response;
};
