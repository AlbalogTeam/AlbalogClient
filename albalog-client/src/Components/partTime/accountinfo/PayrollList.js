import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import 'components/partTime/accountinfo/PayrollList.scss';

function PayrollList(props) {
  const [monthLine, setMonthLine] = useState([]);
  const [detailLine, setDetailLine] = useState([]);

  useEffect(() => {
    setMonthLine(props.month);
    setDetailLine(props.detail);
  }, [monthLine, detailLine]);

  return (
    <div id="container">
      <div className="lines">
        {monthLine.map((item, i) => (
          <Monthlypay key={item.id} monthLine={item} detailLine={detailLine} />
        ))}
      </div>
    </div>
  );
}

function Monthlypay(props) {
  const [monthLine, setMonthLine] = useState([props.monthLine]);
  const [detailLine, setDetailLine] = useState([props.detailLine]);
  const [isActive, setActive] = useState(false);
  const handleClick = () => {
    setActive(!isActive);
  };

  useEffect(() => {
    setMonthLine(props.monthLine);
    setDetailLine(props.detailLine);
  }, [monthLine, detailLine]);

  console.log(detailLine);

  return (
    <div className="pay-container">
      <div className="tr">
        <div className="date">{monthLine.id}</div>
        <div className="time"></div>
        <div className="pay">
          {monthLine.pay}
          <button onClick={() => handleClick()}>
            <IoIosArrowDown
              className={isActive ? 'active' : ''}
              style={{
                width: '30',
              }}
            />
          </button>
        </div>
      </div>
      <div className={isActive ? 'detail active' : 'detail'}>
        {detailLine
          // .filter((x) => x.id === monthLine.id)
          .map((item) => (
            <div className="tr" key={item.date}>
              <div className="date" key={item.date}>
                {item.date}
              </div>
              <div className="time" key={item.date}>
                {item.timeFrom}-{item.timeTo}
              </div>
              <div className="pay" key={item.date}>
                {item.dailypay}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PayrollList;
