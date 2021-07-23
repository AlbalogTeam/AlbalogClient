import React from 'react';
import './NoData.scss';

const NoDataType1 = ({ text, img }) => {
  return (
    <div id="NoData">
      <div className="noData-img">
        <img src={img} alt="" />
      </div>
      <div className="data-txt">{text}</div>
    </div>
  );
};

export default NoDataType1;
