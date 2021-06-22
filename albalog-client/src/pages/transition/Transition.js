import Aside from 'components/Aside/Aside';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import MessageModal from 'components/Modal/MessageModal';
import TransitionList from 'components/transition/TransitionList';
import { ko } from 'date-fns/locale';
import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Transition.scss';
registerLocale('ko', ko);

const Transition = () => {
  const [startDate, setStartDate] = useState(new Date());

  const yesDate = {
    year: startDate.getFullYear(),
    month: startDate.getMonth() + 1,
    day: startDate.getDate() - 1,
  };

  const date = {
    year: startDate.getFullYear(),
    month: startDate.getMonth() + 1,
    day: startDate.getDate(),
  };
  return (
    <>
      <Header />
      <Aside />
      <div id="Transition" className="page-layout">
        <div className="content">
          <div className="cont-box">
            <div className="left-cont">
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  console.log(date);
                  setStartDate(date);
                }}
                locale="ko"
                inline
              />
            </div>
            <div className="right-cont yesterday-date">
              <TransitionList date={yesDate} text={"어제"} />
            </div>
            <div className="right-cont">
              <TransitionList date={date} text={"오늘"} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Transition;
