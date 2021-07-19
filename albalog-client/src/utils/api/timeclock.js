import client from 'utils/api';

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
