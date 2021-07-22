import client from './client';

export const postTimeClockIn = async (locationId, wage) => {
  const newForm = {
    locationId,
    wage,
  };

  await client.post(`/timeclock/start`, newForm);
};

export const postTimeClockOut = async (locationId, timeClockId) => {
  const newForm = {
    locationId,
    timeClockId,
  };
  client.post(`/timeclock/end`, newForm);
};

export const getProfile = async (userId, shopId) => {
  const response = await client.get(`/location/${shopId}/employees/${userId}`);
  sessionStorage.setItem('parttime', JSON.stringify(response.data));
  window.location.replace(`/parttime/${shopId}`);
};
