import axios from 'axios';
import React, { useEffect, useState } from 'react';

const menualListFakeData = [
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

const MenualList = ({ category }) => {
  const [menualList, setMenualList] = useState([]);
  console.log(category);
  useEffect(() => {
    setMenualList(menualListFakeData);
    console.log(menualList);
  }, []);

  const WorkMenualList = menualList.filter(
    (menual) => menual.category === category,
  );

  console.log(WorkMenualList);

  return (
    <div className="menual-list">
      {menualList && (
        <ul>
          {WorkMenualList.map((menual, index) => {
            return (
              <li key={index}>
                <div className="menual-title">{menual.title}</div>
                <br />
                <div dangerouslySetInnerHTML={{__html:menual.body}}></div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MenualList;
