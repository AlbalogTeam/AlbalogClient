import { SetParttime } from 'modules/parttime';
import moment from 'moment';
import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPayroll } from 'utils/api/parttime';

export default function usePayroll() {
  const parttime = useSelector((state) => state.parttime);
  const shop = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  const [today, setToday] = useState(moment().format('yyyyMM'));

  // 직원 급여정보 리덕스에 저장
  const setPayroll = useCallback(async () => {
    try {
      const response = await getPayroll(shop._id);
      const parttimeBody = {
        ...parttime,
        payrolls: response.data,
      };
      dispatch(SetParttime(parttimeBody));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, parttime, shop._id]);

  useEffect(() => {
    if (!parttime.payrolls) {
      setPayroll();
    }
  }, [parttime.payrolls, setPayroll]);

  // 해당 달로 필터
  const filteredMonthlyPayroll = () => {
    const result =
      parttime.payrolls &&
      parttime.payrolls.filter((a) => a.yearAndMonth === today * 1);
    return parttime.payrolls && result.length > 0 && result[0].timeClock;
  };

  // 월 전체 근무시간 계산
  const totalWorkingtime = filteredMonthlyPayroll()
    ? filteredMonthlyPayroll().reduce((accum, curr) => {
        return accum + curr.workInToday;
      }, 0)
    : 0;

  // 이전 달 버튼 클릭
  const onClickLeft = () => {
    setToday(moment(today).subtract(1, 'M').format('yyyyMM'));
  };

  // 다음 달 버튼 클릭
  const onClickRight = () => {
    setToday(moment(today).add(1, 'M').format('yyyyMM'));
  };

  return {
    filteredMonthlyPayroll,
    totalWorkingtime,
    onClickLeft,
    onClickRight,
    today,
  };
}
