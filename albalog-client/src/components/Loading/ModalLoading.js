import React from 'react';
import './ModalLoading.scss';
import { BiLoader } from 'react-icons/bi';

const ModalLoading = () => {
  return (
    <div id="ModalLoading">
      <BiLoader size="30" />
    </div>
  );
};

export default ModalLoading;
