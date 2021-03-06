import React from 'react';
import './HandOver.scss';
import useHandOverEffect from 'hooks/admin/useHandOverEffect';
import NoDataType2 from 'components/NoData/NoDataType2';

const HandOverItem = ({ transition }) => {
  return (
    <p className="content">
      <strong className={transition.completed ? 'completed' : ''}>
        {transition.completed
          ? `- βοΈ ${transition.description}`
          : `- β ${transition.description}`}
      </strong>
    </p>
  );
};

const HandOver = () => {
  const { allTransition } = useHandOverEffect();

  return (
    <div className="hand-over-container">
      <h3 className="title">π μ€λμ μΈμμΈκ³ μ¬ν­</h3>
      <div className="hand-over">
        {!allTransition && <p>λ‘λ© μ€..</p>}
        {allTransition && allTransition.satisfyTransitions.length < 1 ? (
          <NoDataType2 text={'μΈμμΈκ³ μ¬ν­μ΄ μμ΅λλ€'} />
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
