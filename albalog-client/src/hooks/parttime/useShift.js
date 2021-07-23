import shop from 'modules/shop';
import moment from 'moment';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneShft } from 'utils/api/parttime';
import { getAllShft } from 'utils/api/shift';
export default function useShift() {
  const parttime = useSelector((state) => state.parttime);
  const shop = useSelector((state) => state.shop);
  const user = useSelector((state) => state.user);

  const setShft = useCallback(async () => {
    try {
      const one = await getOneShft(shop._id, user._id);
    } catch (error) {
      console.log(error);
    }
  }, [shop._id, user._id]);

  useEffect(() => {
    if (parttime.oneShift) {
      setShft;
    }
  }, [parttime, setShft]);
}

// useEffect(() => {
//     const getPayroll$2 = async () => {
//       try {
//         const responseOneSht = await getOneShft(shop._id, user._id);

//         let shift = await responseOneSht.data.map((a) => {
//           const st = moment(a.start).local().format('YYYY-MM-DD HH:mm:ss');
//           const ed = moment(a.end).local().format('YYYY-MM-DD HH:mm:ss');

//           let newData = {
//             title: user.name,
//             start: new Date(st),
//             end: new Date(ed),
//           };
//           return newData;
//         });
//         const shiftParttime = {
//           ...parttime,
//           one_shift: shift,
//         };
//         dispatchSetParttime(shiftParttime);
//       } catch (error) {
//         console.log(error);
//       }
//     };
