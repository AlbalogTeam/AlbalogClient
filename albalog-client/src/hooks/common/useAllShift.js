import { SetAllShift } from 'modules/allShift';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllShift } from 'utils/api/shift';

export default function useAllShift() {
  const shop = useSelector((state) => state.shop);
  const allShift = useSelector((state) => state.allShift.allShift);
  const dispatch = useDispatch();

  const [today, setToday] = useState(moment().format('YYYY-MM-DD'));

  // 전체 스케줄 리덕스에 저장
  const setAllShiftR = useCallback(async () => {
    try {
      const response = await getAllShift(shop._id);
      let shiftBody = await response.data.map((a) => {
        const st = moment(a.start).local().format('YYYY-MM-DD HH:mm:ss');
        const ed = moment(a.end).local().format('YYYY-MM-DD HH:mm:ss');

        let newData = {
          title: a.title,
          start: new Date(st),
          end: new Date(ed),
        };
        return newData;
      });
      dispatch(SetAllShift(shiftBody));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, shop._id]);

  useEffect(() => {
    if (shop._id && allShift.length < 1) {
      setAllShiftR();
    }
  }, [shop._id, setAllShiftR, allShift.length]);

  // 해당 일자로 필터링
  const filteredShift = () => {
    const result =
      allShift &&
      allShift.filter((a) => moment(a.start).format('YYYY-MM-DD') === today);
    return allShift && result.length > 0 && result;
  };

  // 왼쪽 클릭 시 이전 날짜로 설정
  const onClickLeft = () => {
    setToday(moment(today).subtract(1, 'd').format('YYYY-MM-DD'));
  };

  // 오른쪽 클릭 시 다음 날짜로 설정
  const onClickRight = () => {
    setToday(moment(today).add(1, 'd').format('YYYY-MM-DD'));
  };

  return {
    today,
    onClickLeft,
    onClickRight,
    filteredShift,
  };
}
