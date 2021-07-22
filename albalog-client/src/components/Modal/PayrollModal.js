import React from 'react';
import { weekArray } from 'utils/constants';
import './PayrollModal.scss';

const PayrollModal = ({ handleModal, data }) => {
  const { timeClocks } = data;

  return (
    <div className="payroll-modal-container">
      <div className="payroll-modal-wrap">
        <h3 className="payroll-modal-title">이번달 근무</h3>
        <table className="payroll-modal-table">
          <thead className="payroll-modal-head">
            <tr>
              <th>날짜</th>
              <th>근무 시간</th>
              <th>누적 시간</th>
              <th>일급</th>
            </tr>
          </thead>
          <tbody>
            {timeClocks.map((day, index) => {
              const { start_time, end_time, totalWorkTime, total } = day;
              const hour = Math.floor(totalWorkTime / 60);
              const minute = totalWorkTime % 60;
              const d = weekArray[new Date(start_time).getDay()];

              return (
                <tr className="day-info" key={index}>
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
