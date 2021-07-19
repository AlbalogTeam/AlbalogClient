import React, { useEffect, useState } from 'react';
import client from 'utils/api/client';
import { getHandOverList } from 'utils/api/adminDashboard';
import './HandOver.scss';

const HandOverItem = ({ transition }) => {
  return (
    <p className="content">
      <strong className={transition.completed ? 'completed' : ''}>
        {transition.completed
          ? `- ✔️ ${transition.description}`
          : `- ❌ ${transition.description}`}
      </strong>
    </p>
  );
};

const HandOver = ({ shopId }) => {
  const [allTransition, setAllTransition] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getHandOverList({ shopId });
        setAllTransition(response.satisfyTransitions);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, [shopId]);

  return (
    <div className="hand-over-container">
      <h3 className="title">📋 오늘의 인수인계 사항</h3>
      <div className="hand-over">
        {!allTransition && <p>로딩 중..</p>}
        {allTransition &&
          allTransition.map((transition) => (
            <HandOverItem key={transition._id} transition={transition} />
          ))}
      </div>
    </div>
  );
};

export default HandOver;
