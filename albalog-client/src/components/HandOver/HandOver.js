import React, { useEffect, useState } from 'react';
import client from 'utils/api';
import './HandOver.scss';

const HandOver = ({ shopId }) => {
  const [allTransition, setAllTransition] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        const day = new Date().getDate();
        const response = await client.get(
          `/transition/${shopId}/${year}-${month}-${day}`,
        );
        setAllTransition(response.data.satisfyTransitions);
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
          allTransition.map((transition) => {
            return (
              <p className="content">
                <strong className={transition.completed ? 'completed' : ''}>
                  {transition.completed
                    ? `- ✔️${transition.description}`
                    : `- ❌${transition.description}`}
                </strong>
              </p>
            );
          })}
      </div>
    </div>
  );
};

export default HandOver;
