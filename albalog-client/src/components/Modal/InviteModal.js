import React from 'react';
import './Modal.scss';

const InviteModal = ({ handleModal }) => {
  return (
    <div className="modal-container">
      <div className="modal-wrap">
        <h1 className="invite-title">직원초대</h1>
        <form>
          <label>이름</label>
          <input type="text" />
          <label>이메일 주소</label>
          <input type="text" />
          <button className="btn-invite">초대하기</button>
          <button className="btn-close" onClick={handleModal}>
            닫기
          </button>
        </form>
      </div>
    </div>
  );
};

export default InviteModal;
