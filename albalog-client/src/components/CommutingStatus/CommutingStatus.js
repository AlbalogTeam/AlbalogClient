import React from 'react';
import './CommutingStatus.scss';
import useCommutingEffect from 'hooks/admin/useCommutingEffect';

const CommutingStatus = () => {
  const { employeeList, year, month, day } = useCommutingEffect();
  return (
    <div className="work">
      <h2 className="date">{`${year}년 ${month}월 ${day}일`}</h2>
      <div className="status">
        <div className="commute-card">
          <h3 className="title">출근전 😵</h3>
          <div className="content">
            {employeeList.before &&
              employeeList.before.map((employee, idx) => (
                <div className="content-detail" key={idx}>
                  <strong>{employee.name}</strong>
                  <p className="before">{`출근 예정 : ${employee.time.start.substr(
                    11,
                    5,
                  )}`}</p>
                </div>
              ))}
          </div>
        </div>
        <div className="commute-card">
          <h3 className="title">근무중 🔥</h3>
          <div className="content">
            {employeeList.working &&
              employeeList.working.map((employee, idx) => (
                <div className="content-detail" key={idx}>
                  <strong>{employee.name}</strong>
                  <p className="working">{`퇴근 예정 : ${employee.time.end.substr(
                    11,
                    5,
                  )}`}</p>
                </div>
              ))}
          </div>
        </div>
        <div className="commute-card">
          <h3 className="title">퇴근 😴</h3>
          <div className="content">
            {employeeList.off &&
              employeeList.off.map((employee, idx) => (
                <div className="content-detail" key={idx}>
                  <strong>{employee.name}</strong>
                  <p className="off">
                    {`근무 시간 : ${new Date(
                      employee.time[0].start_time,
                    ).getHours()}:${new Date(
                      employee.time[0].start_time,
                    ).getMinutes()}~${new Date(
                      employee.time[0].end_time,
                    ).getHours()}:${new Date(
                      employee.time[0].end_time,
                    ).getMinutes()}`}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommutingStatus;
