import axios from 'axios';
import InviteModal from 'components/Modal/InviteModal';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import './Header.scss';

const Header = ({ user }) => {
  const [isModal, setIsModal] = useState(false);

  const handleModal = () => {
    setIsModal(!isModal);
  };

  const logOutHandler = () => {
    axios
      .post('https://albalog-test.herokuapp.com/api/v1/owner/logout')
      .then((response) => {
        console.log(response.data);
      });
  };
  return (
    <>
      <header className="header">
        <h1 className="header-left">
          <a href="/">Albalog</a>
        </h1>
        <div className="header-right">
          <span className="user-name">{user.name}님 안녕하세요.</span>
          {user.role === 'owner' ? (
            <button className="btn-invite" onClick={handleModal}>
              직원초대+
            </button>
          ) : (
            ''
          )}

          <button className="btn-logout" onClick={logOutHandler}>
            로그아웃
          </button>
        </div>
      </header>
      {isModal && <InviteModal handleModal={handleModal} />}
    </>
  );
};

function mapStateToProps(state) {
  // redux state로 부터 state를 component의 props로 전달해줌
  // store의 값이 여기 함수 state로 들어옴
  return { user: state.user };
}

export default connect(mapStateToProps)(Header);
