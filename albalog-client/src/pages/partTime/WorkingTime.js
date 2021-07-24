import { React } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import 'pages/partTime/WorkingTime.scss';
import ContentLine from 'components/partTime/ContentLine';
import Footer from 'components/Footer/Footer';
import moment from 'moment';
import usePayroll from 'hooks/parttime/usePayroll';
import Header from 'components/Header';
import Aside from 'components/Aside';

function WorkingTime() {
  const {
    filteredMonthlyPayroll,
    totalWorkingtime,
    onClickLeft,
    onClickRight,
    today,
  } = usePayroll();

  return (
    <>
      <Header />
      <Aside />
      <div id="workingtime">
        <div className="workingtime-container">
          <h2>일한시간</h2>
          <div className="table">
            <div className="date-line">
              <IoIosArrowBack onClick={onClickLeft} />
              <b style={{ fontSize: '1.2rem' }}>
                {moment(today).format('YYYY-MM')}
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
            <div className="context-lines">
              <ContentLine filteredPayroll={filteredMonthlyPayroll} />
            </div>
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
        </div>
      </div>
      <Footer />
    </>
  );
}

export default WorkingTime;
