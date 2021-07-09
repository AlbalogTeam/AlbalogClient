import { React, useState } from 'react';
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosWarning,
} from 'react-icons/io';
import 'pages/partTime/WorkingTime.scss';
import ContentLine from 'components/partTime/ContentLine';
import Header from 'components/Header/Header';
import Aside from 'components/Aside/Aside';
import Footer from 'components/Footer/Footer';
import { useSelector } from 'react-redux';
import Loading from 'components/Loading/Loading';
import { useEffect } from 'react';

function WorkingTime() {
  const [month, setMonth] = useState(`${new Date().toISOString().slice(0, 7)}`);
  const payrolls = useSelector((state) => state.parttime.payrolls);

  function filteredPayroll() {
    const monthlyPayroll =
      payrolls &&
      payrolls.filter(
        (a) => a.yearAndMonth.toString() === month.slice(0, 4) + month.slice(5),
      );
    return monthlyPayroll && monthlyPayroll[0].timeClock;
  }

  const totalWorkingtime = filteredPayroll()
    ? filteredPayroll().reduce((accum, curr) => {
        return accum + curr.workInToday;
      }, 0)
    : 0;

  console.log(totalWorkingtime);

  const onClickLeft = () => {};
  const onClickRight = () => {};

  return (
    <>
      {/* {!payrolls && <Loading />} */}
      <Header />
      <Aside />
      <div id="workingtime">
        <div className="workingtime-container">
          <h2>일한시간</h2>
          <div className="table">
            <div className="date-line">
              <IoIosArrowBack onClick={onClickLeft} />
              <b style={{ fontSize: '1.2rem' }}>{month}</b>
              <IoIosArrowForward onClick={onClickRight} />
            </div>
            <div className="head-line">
              <div className="date-column">날짜</div>
              <div className="day-column">요일</div>
              <div className="clockIn-column">출근시간</div>
              <div className="clockOut-column">퇴근시간</div>
              <div className="workingtime-column">근무시간</div>
            </div>
            <ContentLine month={month} filteredPayroll={filteredPayroll} />
            <div className="total-line">
              <div className="date-column"></div>
              <div className="day-column"></div>
              <div className="clockIn-column"></div>
              <div className="clockOut-column">총 근무시간</div>
              <div className="workingtime-column">
                {parseInt(totalWorkingtime / 60)}시간 {totalWorkingtime % 60}분
              </div>
            </div>
          </div>
          {/* <div className="remark-line">
            <IoIosWarning style={{ width: '20px' }} />
            근무자가 출근한 뒤 15시간동안 퇴근하지 않으면 자동으로 퇴근처리되며
            '퇴근미체크'로 표기됩니다.
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default WorkingTime;
