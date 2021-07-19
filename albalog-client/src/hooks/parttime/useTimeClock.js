import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import client from 'utils/api';
import { postTimeClockIn, postTimeClockOut } from 'utils/api/timeclock';

export default function useTimeClock() {
  const parttime = useSelector((state) => state.parttime);
  const user = useSelector((state) => state.user);
  const shop = useSelector((state) => state.shop);

  // 출퇴근 확인 모달 창
  const [timeclockInModal, setTimeclockInModal] = useState(false);
  const [timeclockOutModal, setTimeclockOutModal] = useState(false);

  const timeClockInModalToggle = useCallback(() => {
    setTimeclockInModal(!timeclockInModal);
  }, [timeclockInModal]);
  const timeClockOutModalToggle = useCallback(() => {
    setTimeclockOutModal(!timeclockOutModal);
  }, [timeclockOutModal]);

  const lastTimeClock =
    parttime.timeClocks && parttime.timeClocks[parttime.timeClocks.length - 1];
  let clockIn = lastTimeClock
    ? !!lastTimeClock.end_time
      ? false
      : true // true면 값을 클릭 불가능
    : false; // false면 값을 클릭 가능
  let clockOut = clockIn ? false : true;

  const getprofile = async () => {
    try {
      const response = await client.get(
        `/location/${shop._id}/employees/${user._id}`,
      );
      sessionStorage.setItem('parttime', JSON.stringify(response.data));
      window.location.replace(`/parttime/${shop._id}`);
    } catch (e) {
      console.log('getprofileErr' + e);
    }
  };

  const clickClockIn = async (e) => {
    try {
      await postTimeClockIn(shop._id, parttime.hourly_wage);
      getprofile();
    } catch (e) {
      console.log(e);
    }
  };

  const clickClockOut = async (e) => {
    clockOut = true;
    clockIn = false;
    try {
      await postTimeClockOut(shop._id, lastTimeClock._id);
      getprofile();
    } catch (e) {
      console.log(e);
    }
  };

  return {
    clickClockOut,
    clickClockIn,
    clockIn,
    clockOut,
    timeclockInModal,
    timeclockOutModal,
    timeClockInModalToggle,
    timeClockOutModalToggle,
  };
}
