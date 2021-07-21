import React from 'react';
import './Modal.scss';
import useInviteModal from 'hooks/admin/useInviteModal';

const InviteModal = ({ handleModal }) => {
  const { name, email, onChange, onSubmit } = useInviteModal();

  return (
    <div className="modal-container">
      <div className="modal-wrap">
        <h1 className="invite-title">직원초대</h1>
        <form onSubmit={onSubmit}>
          <label>이름</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            placeholder="ex) 홍길동"
          />
          <label>이메일 주소</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="example@gmail.com"
          />
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
