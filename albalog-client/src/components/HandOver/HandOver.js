import React from 'react';
import './HandOver.scss';
import useHandOverEffect from 'hooks/admin/useHandOverEffect';
import NoDataType2 from 'components/NoData/NoDataType2';

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

const HandOver = () => {
  const { allTransition } = useHandOverEffect();

  return (
    <div className="hand-over-container">
      <h3 className="title">📋 오늘의 인수인계 사항</h3>
      <div className="hand-over">
        {!allTransition && <p>로딩 중..</p>}
        {allTransition && allTransition.satisfyTransitions.length < 1 ? (
          <NoDataType2 text={'인수인계 사항이 없습니다'} />
        ) : (
          ''
        )}
        {allTransition &&
          allTransition.satisfyTransitions.map((transition) => (
            <HandOverItem key={transition._id} transition={transition} />
          ))}
      </div>
    </div>
  );
};

export default HandOver;
