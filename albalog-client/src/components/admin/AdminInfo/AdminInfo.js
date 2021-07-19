import Aside from 'components/Aside';
import Header from 'components/Header';
import React, { useState } from 'react';
import { IoPerson } from 'react-icons/io5';
import './AdminInfo.scss';
import { useDispatch, useSelector } from 'react-redux';
import client from 'utils/api/client';
import { withRouter } from 'react-router';
import { SetUser } from 'modules/user';
import Footer from 'components/Footer';

const AdminInfo = ({ history }) => {
  const { name: originName, email } = useSelector(({ user }) => user);
  const [form, setForm] = useState({
    name: originName,
    password: '',
    newPassword: '',
    newPasswordCheck: '',
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const { name, password, newPassword, newPasswordCheck } = form;

  const onSubmit = async (e) => {
    e.preventDefault();

    if ([name, password, newPassword, newPasswordCheck].includes('')) {
      setError('빈 칸을 모두 입력하세요');
    }

    if (name.length < 2) {
      setError('이름은 최소 2글자 이상입니다.');
      return;
    }

    if (newPassword.length < 6 && newPasswordCheck.length < 6) {
      setError('비밀번호는 최소 6자리 이상입니다.');
    }

    if (newPassword !== newPasswordCheck) {
      setError('새 비밀번호가 일치하지 않습니다.');
    }

    try {
      const response = await client.patch('/owner/me/update', {
        name,
        email,
        password,
        newPassword,
      });
      console.log(response);
      if (response.status === 200) {
        alert('변경된 비밀번호로 다시 로그인 해주세요');
        sessionStorage.removeItem('user'); // localStorage에서 user를 제거
        let UserBody = {
          _id: '',
          email: '',
          name: '',
          role: '',
          token: '',
        };
        dispatch(SetUser(UserBody)); // user redux를 초기값으로 설정
        history.push('/login');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      <Header />
      <Aside />
      <div className="adminInfo-container">
        <div className="info-wrap">
          <h3>Profile</h3>
          <IoPerson className="user-image" />
          <form className="form-info" onSubmit={onSubmit}>
            <label htmlFor="email">이메일</label>
            <input type="text" disabled value={email} id="email" />
            <label htmlFor="name">이름</label>
            <input type="text" value={name} id="name" onChange={onChange} />
            <label htmlFor="password">현재 비밀번호</label>
            <input
              type="password"
              value={password}
              id="password"
              onChange={onChange}
            />
            <label htmlFor="newPassword">새 비밀번호</label>
            <input
              type="password"
              value={newPassword}
              id="newPassword"
              onChange={onChange}
            />
            <label htmlFor="newPasswordCheck">새 비밀번호 확인</label>
            <input
              type="password"
              value={newPasswordCheck}
              id="newPasswordCheck"
              onChange={onChange}
            />
            {error && (
              <span style={{ color: 'red', textAlign: 'center' }}>{error}</span>
            )}
            <button
              className={
                newPassword === newPasswordCheck ? 'button' : 'btn-disabled'
              }
            >
              변경하기
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default withRouter(AdminInfo);
