import axios from 'axios';
import InviteModal from 'components/Modal/InviteModal';
import { SetUser } from 'modules/user';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './Header.scss';

const Header = ({ user, dispatchSetUser, history }) => {
  const [isModal, setIsModal] = useState(false);

  const handleModal = () => {
    setIsModal(!isModal);
  };

  let token = user.token;

  const logOutHandler = () => {
    let body = {
      username: 'ksmfou98',
    };
    axios
      .post('https://albalog-test.herokuapp.com/api/v1/owner/logout', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        localStorage.removeItem('user'); // localStorage에서 user를 제거
        let UserBody = {
          _id: '',
          email: '',
          name: '',
          role: '',
          token: '',
        };
        dispatchSetUser(UserBody);
      })
      .catch(function (error) {
        // status 코드가 200이 아닌경우 처리
        if (error) {
          alert('로그아웃에 실패했습니다.');
        }
      });
  };

  useEffect(() => {
    if (user.email) {
      console.log('유저가 있습니다');
    } else {
      console.log('유저가 없습니다');
      history.push('/login');
    }
  }, [history, user]);
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

function mapDispatchToProps(dispatch) {
  return {
    dispatchSetUser: (UserBody) => dispatch(SetUser(UserBody)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
