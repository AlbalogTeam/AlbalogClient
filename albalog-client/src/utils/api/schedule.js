import client from './client';

// 스케줄 추가 API
export const postSchedule = async (locationId, requestBody) => {
  await client.post(`shift/location/${locationId}/create`, requestBody);
};

// 해당 스케줄 하루 삭제 API
export const deleteDailySchedule = async ({ index, locationId, staffId }) => {
  await client.delete(
    `shift/${index}/location/${locationId}/employee/${staffId}/delete`,
  );
};

// 해당 직원 스케줄 전체 삭제 API
export const deleteAllSchedule = async ({ locationId, id }) => {
  await client.delete(`/shift/location/${locationId}/employee/${id}/deleteAll`);
};
