import Aside from 'components/Aside/Aside';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import TransitionList from 'components/TransitionList/TransitionList';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Transition.scss';

const Transition = () => {
  const [startDate, setStartDate] = useState(new Date());

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
                  setStartDate(date);
                }}
                inline
              />
            </div>
            <div className="right-cont">
              <TransitionList date={date} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Transition;
