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
        <table className="payroll-modal-table">
          <thead className="payroll-modal-head">
            <th>날짜</th>
            <th>근무 시간</th>
            <th>누적 시간</th>
            <th>일급</th>
          </thead>
          <tbody>
            {timeClocks.map((day) => {
              const { start_time, end_time, totalWorkTime, total } = day;
              const hour = Math.floor(totalWorkTime / 60);
              const minute = totalWorkTime % 60;
              const d = days[new Date(start_time).getDay()];

              return (
                <tr className="day-info">
                  <td>{`${start_time.substr(5, 5)} (${d})`}</td>
                  <td>{`🔥${start_time.substr(11, 5)}~${end_time.substr(
                    11,
                    5,
                  )}`}</td>
                  <td>{`🕑${hour}시간 ${minute}분`}</td>
                  <td>{`💸${total.toLocaleString()}원`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <button className="btn-close" onClick={handleModal}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default PayrollModal;
