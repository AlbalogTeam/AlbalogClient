import client from 'utils/api';

// 매장 생성
export const createStore = async (name, address, postal_code, phone_number) => {
  const body = {
    name,
    address,
    postal_code,
    phone_number,
  };
  const response = await client.post('/location', body);
  return response;
};

// 매장 조회 (관리자)
export const getStoreForOwner = async () => {
  const response = await client.get(`/owner/me/locations`);
  return response.data.locations;
};

// 매장 조회 (알바)
export const getStoreForParttime = async () => {
  const response = await client.get(`/employee/locations`);
  return response.data.locations;
};

// 매장 수정
export const updateStore = async (
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
