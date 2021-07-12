import client from 'utils/api';

// 업무매뉴얼 조회
export const getWorkManuals = async (shopid) => {
  const response = await client.get(`/location/${shopid}/workmanual`);
  return [...response.data.workManuals].reverse();
};

// 업무매뉴얼 삭제
export const deleteManual = async (shopid, manualid) => {
  const response = await client.delete(
    `/location/${shopid}/workmanual/${manualid}/delete`,
  );
  return response;
};

// 업무매뉴얼 수정
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

// 업무매뉴얼 등록
export const createManual = async (shopid, title, content, category) => {
  const body = {
    title,
    content,
    category,
  };

  const response = await client.post(
    `/location/${shopid}/workmanual/create`,
    body,
  );
  return response;
};
