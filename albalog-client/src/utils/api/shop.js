import client from 'utils/api/client';

// 매장 생성
export const createShop = async (name, address, postal_code, phone_number) => {
  const body = {
    name,
    address,
    postal_code,
    phone_number,
  };
  console.log(body);
  const response = await client.post('/location', body);
  return response;
};

// 매장 조회 (관리자)
export const getShopForOwner = async () => {
  const response = await client.get(`/owner/me/locations`);
  return response.data.locations;
};

// 매장 조회 (알바)
export const getShopForParttime = async () => {
  const response = await client.get(`/employee/locations`);
  return response.data.locations;
};

// 매장 수정
export const updateShop = async (
  name,
  address,
  postal_code,
  phone_number,
  shopId,
) => {
  const body = {
    name,
    address,
    postal_code,
    phone_number,
  };
  const response = await client.patch(`/location/${shopId}/update`, body);
  return response;
};

export const getShopInfoByAdmin = async (shopId) => {
  const response = await client.get(`/location/${shopId}`);
  return response.data;
};

export const getShopInfoByParttime = async (shopId) => {
  const response = await client.get(`/employee/${shopId}`);
  return response.data;
};
