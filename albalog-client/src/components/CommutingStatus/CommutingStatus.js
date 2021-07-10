import React, { useEffect, useState } from 'react';
import client from 'utils/api';

const CommutingStatus = ({ shopId }) => {
  const [before, setBefore] = useState([]);
  const [middle, setMiddle] = useState([]);
  const [after, setAfter] = useState([]);

  const [employeeList, setEmployeeList] = useState([]);
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const getData = async () => {
    try {
      const response = await client.get(
        `/shift/location/${shopId}/daily/2021-05-12`,
      );
      setEmployeeList(response.data);
      console.log(employeeList);
      console.log(response.data);
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
          <h3 className="title">출근전</h3>
          <div className="content">윤영훈</div>
        </div>
        <div className="commute-card">
          <h3 className="title">근무중</h3>
          <div className="content">이도현</div>
        </div>
        <div className="commute-card">
          <h3 className="title">퇴근</h3>
          <div className="content">서우리</div>
        </div>
      </div>
    </div>
  );
};

export default CommutingStatus;
