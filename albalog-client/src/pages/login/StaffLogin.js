import axios from 'axios';
import { TOKENKEY } from 'config';
import { APIURL } from 'config';
import jwt from 'jsonwebtoken';
import { ChangeField } from 'modules/auth';
import { SetUser } from 'modules/user';
import React, { useEffect, useState } from 'react';
import { RiEyeCloseFill } from 'react-icons/ri';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import './Login.scss';

function StaffLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChange = (e) => {
    const { value, name } = e.target;
    if (name === 'email') setEmail(value);
    else setPassword(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let loginBody = {
      email,
      password,
    };

    axios
      .post(`${APIURL}/employee/login`, loginBody)
      .then((response) => {
        const token = response.data.token;
        const decoded = jwt.verify(token, TOKENKEY);
        console.log(response);

        let userBody = {
          _id: response.data.employee._id,
          email: response.data.employee.email,
          name: response.data.employee.name,
          role: decoded.role,
          token: response.data.token,
        };
        console.log(userBody);
        localStorage.setItem('user', JSON.stringify(userBody));
        useHistory.push(`/parttime/60ca0e7938caa500284f687c`);
      })
      .catch(function (error) {
        // status 코드가 200이 아닌경우 처리
        if (error) {
          alert('로그인에 실패했습니다.');
        }
      });
  };

  //   useEffect(() => {
  //     if (user.email) {
  //       console.log('유저가 있습니다');
  //       history.push('/'); // 홈 화면으로 이동
  //       try {
  //         localStorage.setItem('user', JSON.stringify(user));
  //       } catch (e) {
  //         console.log('로컬스토리지 저장에 실패했습니다');
  //       }
  //     } else {
  //       console.log('유저가 없습니다');
  //     }
  //   }, [history, user]);

  return (
    <div id="login">
      <form action="" className="loginLeft" onSubmit={onSubmit}>
        <input
          type="text"
          name="email"
          onChange={onChange}
          placeholder="username"
        />
        <input
          type="password"
          name="password"
          onChange={onChange}
          placeholder="password"
        />
        <button type="submit" className="signIn btn">
          로그인
        </button>
        <a href="/signup" className="signUp btn">
          회원가입
        </a>
      </form>
      <div className="loginRight">
        <span>Albalog</span>
      </div>
    </div>
  );
}

export default StaffLogin;
