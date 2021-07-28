import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  postTimeClockIn,
  postTimeClockOut,
  getProfile,
} from 'utils/api/timeclock';

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
  let clockOut = clockIn === false ? true : false;

  const clickClockIn = async (e) => {
    try {
      await postTimeClockIn(shop._id, parttime.hourly_wage);
      await getProfile(user._id, shop._id);
    } catch (e) {
      console.log('Error : ' + e.response.data.message);
    }
  };

  const clickClockOut = async (e) => {
    clockOut = true;
    clockIn = false;
    try {
      await postTimeClockOut(shop._id, lastTimeClock._id);
      await getProfile(user._id, shop._id);
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
