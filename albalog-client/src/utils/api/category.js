import client from 'utils/api/client';

// 카테고리 불러오기
export const getCategories = async (shopid) => {
  const response = await client.get(`/category/${shopid}`);
  return [...response.data].reverse();
};

// 카테고리 등록
export const addCategory = async (shopid, name) => {
  const body = {
    name,
  };
  const response = await client.post(`/category/${shopid}/create`, body);
  return [...response.data.categories].reverse();
};

// 카테고리 삭제
export const deleteCategory = async (shopid, categoryid) => {
  const response = await client.delete(
    `/category/${shopid}/delete/${categoryid}`,
  );
  return [...response.data.categories].reverse();
};

// 카테고리 수정
export const updateCategory = async (locationId, categoryId, name) => {
  const body = {
    categoryId,
    locationId,
    name,
  };
  const response = await client.patch(`/category/update`, body);
  return [...response.data.categories].reverse();
};
