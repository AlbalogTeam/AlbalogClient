import { SetParttime } from 'modules/parttime';
import moment from 'moment';
import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneShft } from 'utils/api/parttime';

export default function useShift() {
  const parttime = useSelector((state) => state.parttime);
  const shop = useSelector((state) => state.shop);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const setShft = useCallback(async () => {
    try {
      const one = await getOneShft(shop._id, user._id);

      let shift = await one.data.map((a) => {
        const st = moment(a.start).local().format('YYYY-MM-DD HH:mm:ss');
        const ed = moment(a.end).local().format('YYYY-MM-DD HH:mm:ss');

        let newData = {
          title: user.name,
          start: new Date(st),
          end: new Date(ed),
        };
        return newData;
      });
      const shiftParttime = {
        ...parttime,
        one_shift: shift,
      };
      dispatch(SetParttime(shiftParttime));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, parttime, shop._id, user.name, user._id]);

  useEffect(() => {
    if (shop._id && user._id && !parttime.one_shift) {
      setShft();
    }
  }, [shop._id, user._id, parttime, setShft]);

  const [today, setToday] = useState(moment().format('YYYY-MM-DD'));

  const onClickLeft = () => {
    setToday(moment(today).subtract(1, 'd').format('YYYY-MM-DD'));
  };
  const onClickRight = () => {
    setToday(moment(today).add(1, 'd').format('YYYY-MM-DD'));
  };

  const filteredShift = () => {
    const result =
      parttime.one_shift &&
      parttime.one_shift.filter(
        (a) =>
          moment(a.start).format('yyyy-MM-DD') ===
          moment(today).format('yyyy-MM-DD'),
      );
    return parttime.one_shift && result.length > 0 && result;
  };

  return {
    today,
    onClickLeft,
    onClickRight,
    filteredShift,
  };
}
