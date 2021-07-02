import React from 'react';
import './PayrollModal.scss';

const PayrollModal = ({ handleModal, data }) => {
  const { timeClocks } = data;
  const days = {
    0: '일',
    1: '월',
    2: '화',
    3: '수',
    4: '목',
    5: '금',
    6: '토',
  };
  return (
    <div className="payroll-modal-container">
      <div className="payroll-modal-wrap">
        <h3 className="payroll-modal-title">이번달 근무</h3>
        <div className="payroll-header">
          <p>날짜</p>
          <p>근무 시간</p>
          <p>누적 시간</p>
          <p>일급</p>
        </div>
        {timeClocks.map((day) => {
          const { start_time, end_time, totalWorkTime, total } = day;
          const hour = totalWorkTime / 60;
          const minute = totalWorkTime % 60;
          const d = days[new Date(start_time).getDay()];

          return (
            <div className="day-info">
              <p>{`${start_time.substr(5, 5)} (${d})`}</p>
              <p>{`🔥${start_time.substr(11, 5)}~${end_time.substr(11, 5)}`}</p>
              <p>{`🕑${hour}시간 ${minute}분`}</p>
              <p>{`💸${total.toLocaleString()}원`}</p>
            </div>
          );
        })}

        <button className="btn-close" onClick={handleModal}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default PayrollModal;
