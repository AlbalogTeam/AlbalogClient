import React from 'react';
import './Loading.scss';
import { BiLoader } from 'react-icons/bi';

const Loading = () => {
  return (
    <div className="loading">
      <div className="loading-ico">
        <BiLoader size="30" />
      </div>
    </div>
  );
};

export default Loading;
