import React, { useEffect, useState } from 'react';
import client from 'utils/api/client';
import { getCommutingStatus } from 'utils/api/adminDashboard';
import './CommutingStatus.scss';

const CommutingStatus = ({ shopId }) => {
  const [employeeList, setEmployeeList] = useState([]);
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const getData = async () => {
    try {
      const response = await getCommutingStatus({ shopId });
      setEmployeeList(response);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, [shopId]);

  return (
    <div className="work">
      <h2 className="date">{`${year}년 ${month}월 ${day}일`}</h2>
      <div className="status">
        <div className="commute-card">
          <h3 className="title">출근전 😵</h3>
          <div className="content">
            {employeeList.before &&
              employeeList.before.map((employee) => (
                <div className="content-detail">
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
              employeeList.working.map((employee) => (
                <div className="content-detail">
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
              employeeList.off.map((employee) => (
                <div className="content-detail">
                  <strong>{employee.name}</strong>
                  <p className="off">
                    {`근무 시간 : ${employee.time[0].start_time.substr(
                      11,
                      5,
                    )}~${employee.time[0].end_time.substr(11, 5)}`}
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
