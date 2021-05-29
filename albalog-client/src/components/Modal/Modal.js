import React from 'react';
import './Modal.scss';

const Modal = ({ handleModal }) => {
  return (
    <div className="modal-container">
      <div className="modal-wrap">
        <h2>직원정보</h2>
        <p>이름</p>
        <p>이메일</p>
        <p>생년월일</p>
        <p>시급</p>
        <p>기타등등등</p>
        <button onClick={handleModal}>닫기</button>
      </div>
    </div>
  );
};

export default Modal;
