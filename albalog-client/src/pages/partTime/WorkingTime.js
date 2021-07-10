import { React, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import 'pages/partTime/WorkingTime.scss';
import ContentLine from 'components/partTime/ContentLine';
import Header from 'components/Header/Header';
import Aside from 'components/Aside/Aside';
import Footer from 'components/Footer/Footer';
import { useSelector } from 'react-redux';

function WorkingTime() {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const date = new Date().getDate();
  const [today, setToday] = useState(new Date(year, month - 1, date));
  const payrolls = useSelector((state) => state.parttime.payrolls);

  function filteredPayroll() {
    const monthlyPayroll =
      payrolls &&
      payrolls.filter((a) => Number(a.yearAndMonth) === today.toString());
    return !!monthlyPayroll ? monthlyPayroll[0].timeClock : 0;
  }

  const totalWorkingtime = filteredPayroll()
    ? filteredPayroll().reduce((accum, curr) => {
        return accum + curr.workInToday;
      }, 0)
    : 0;

  const onClickLeft = () => {
    setToday(new Date(today.setDate(today.getMonth - 1)));
  };
  const onClickRight = () => {
    setToday(new Date(today.setDate(today.getMonth + 1)));
  };

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
              <b style={{ fontSize: '1.2rem' }}>
                {today
                  .toLocaleDateString()
                  .slice(0, 9)
                  .replace('.', '-')
                  .replace('.', '')}
              </b>
              <IoIosArrowForward onClick={onClickRight} />
            </div>
            <div className="head-line">
              <div className="date-column">날짜</div>
              <div className="day-column">요일</div>
              <div className="clockIn-column">출근시간</div>
              <div className="clockOut-column">퇴근시간</div>
              <div className="workingtime-column">근무시간</div>
            </div>
            <ContentLine filteredPayroll={filteredPayroll} />
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
