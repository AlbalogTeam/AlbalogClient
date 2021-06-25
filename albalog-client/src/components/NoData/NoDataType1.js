import React from 'react';
import './NoData.scss';
import NoDataType from 'static/NoDataType1.png';

const NoDataType1 = ({ text }) => {
  return (
    <div id="NoData">
      <div className="noData-img">
        <img src={NoDataType} alt="" />
      </div>
      <div className="data-txt">{text}</div>
    </div>
  );
};

export default NoDataType1;
