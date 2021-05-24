import axios from 'axios';
import React, { useEffect, useState } from 'react';

const manualListFakeData = [
  {
    category: 'common',
    title: '출근 후',
    body: '<p>책상 닦기,</p><p>&nbsp;</p><p>빗자루로 홀 쓸기,</p><p>&nbsp;</p><p>마대로 바닥 닦기,</p><p>&nbsp;</p><p>쓰레기통 비우기</p>',
  },
  {
    category: 'common',
    title: '퇴근 30분 전',
    body: '<p>책상 닦기,</p><p>&nbsp;</p><p>빗자루로 홀 쓸기,</p><p>&nbsp;</p><p>마대로 바닥 닦기,</p><p>&nbsp;</p><p>쓰레기통 비우기</p>',
  },
  {
    category: 'field',
    title: '손님 접대',
    body: '<p>책상 닦기,</p><p>&nbsp;</p><p>빗자루로 홀 쓸기,</p><p>&nbsp;</p><p>마대로 바닥 닦기,</p><p>&nbsp;</p><p>쓰레기통 비우기</p>',
  },
  {
    category: 'field',
    title: '포스기 계산',
    body: '<p>책상 닦기,</p><p>&nbsp;</p><p>빗자루로 홀 쓸기,</p><p>&nbsp;</p><p>마대로 바닥 닦기,</p><p>&nbsp;</p><p>쓰레기통 비우기</p>',
  },
  {
    category: 'kitchen',
    title: '주문 들어오면',
    body: '<p>책상 닦기,</p><p>&nbsp;</p><p>빗자루로 홀 쓸기,</p><p>&nbsp;</p><p>마대로 바닥 닦기,</p><p>&nbsp;</p><p>쓰레기통 비우기</p>',
  },
  {
    category: 'common',
    title: '출근 후',
    body: '<p>책상 닦기,</p><p>&nbsp;</p><p>빗자루로 홀 쓸기,</p><p>&nbsp;</p><p>마대로 바닥 닦기,</p><p>&nbsp;</p><p>쓰레기통 비우기</p>',
  },
];

const ManualList = ({ category }) => {
  const [manualList, setManualList] = useState([]);
  console.log(category);
  useEffect(() => {
    setManualList(manualListFakeData);
    console.log(manualList);
  }, []);

  const WorkManualList = manualList.filter(
    (manual) => manual.category === category,
  );

  console.log(WorkManualList);

  return (
    <div className="manual-list">
      {manualList && (
        <ul>
          {WorkManualList.map((manual, index) => {
            return (
              <li key={index}>
                <div className="manual-title">{manual.title}</div>
                <br />
                <div dangerouslySetInnerHTML={{__html:manual.body}}></div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ManualList;
