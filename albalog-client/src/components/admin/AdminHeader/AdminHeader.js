import InviteModal from 'components/Modal/InviteModal';
import React, { useState } from 'react';
import './AdminHeader.scss';

const AdminHeader = () => {
  const [isModal, setIsModal] = useState(false);

  const handleModal = () => {
    setIsModal(!isModal);
  };
  return (
    <header className="admin-header">
      <h1 className="header-left">
        <a href="/">Albalog</a>
      </h1>
      <div className="header-right">
        <span className="user-name">관리자님 안녕하세요.</span>
        <button className="btn-invite" onClick={handleModal}>
          직원초대+
        </button>
        <button className="btn-logout">로그아웃</button>
        {isModal && <InviteModal handleModal={handleModal} />}
      </div>
    </header>
  );
};

export default AdminHeader;
