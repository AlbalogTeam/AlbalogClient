import TransitionList from 'components/transition/TransitionList';
// import { ko } from 'date-fns/locale';
import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Transition.scss';
// registerLocale('ko', ko);

const Transition = () => {
  const [startDate, setStartDate] = useState(new Date());

  const date = {
    year: startDate.getFullYear(),
    month: startDate.getMonth() + 1,
    day: startDate.getDate(),
  };
  return (
    <div id="Transition" className="page-layout">
      <div className="content">
        <h3>인수인계</h3>
        <div className="cont-box">
          <div className="left-cont">
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                console.log(date);
                setStartDate(date);
              }}
              // locale="ko"
              inline
            />
          </div>
          <div className="right-cont">
            <TransitionList date={date} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transition;
