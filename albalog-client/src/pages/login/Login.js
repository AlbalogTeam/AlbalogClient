import axios from 'axios';
import jwt from 'jsonwebtoken';
import { ChangeField } from 'modules/auth';
import { SetUser } from 'modules/user';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './Login.scss';

function Login({ form, user, dispatchChangeField, dispatchSetUser, history }) {
  const onChange = (e) => {
    const { value, name } = e.target;
    let FormBody = {
      form: 'login',
      key: name,
      value,
    };

    dispatchChangeField(FormBody);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;

    let loginBody = {
      email,
      password,
    };

    axios
      .post('https://albalog-test.herokuapp.com/api/v1/owner/login', loginBody)
      .then((response) => {
        console.log(response.data);
        const token = response.data.token;
        const decoded = jwt.verify(token, 'albalogTeam');
        console.log(decoded);

        let userBody = {
          _id: response.data.employer._id,
          email: response.data.employer.email,
          name: response.data.employer.name,
          role: decoded.role,
          token: response.data.token,
        };
        dispatchSetUser(userBody);
      })
      .catch(function (error) {
        // status 코드가 200이 아닌경우 처리
        if (error) {
          alert('로그인에 실패했습니다.');
        }
      });
  };

  useEffect(() => {
    if (user.email) {
      console.log('유저가 있습니다');
      history.push('/'); // 홈 화면으로 이동
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('로컬스토리지 저장에 실패했습니다');
      }
    } else {
      console.log('유저가 없습니다');
    }
  }, [history, user]);

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

function mapStateToProps(state) {
  // redux state로 부터 state를 component의 props로 전달해줌
  // store의 값이 여기 함수 state로 들어옴
  return { form: state.auth.login, user: state.user };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchChangeField: (FormBody) => dispatch(ChangeField(FormBody)),
    dispatchSetUser: (UserBody) => dispatch(SetUser(UserBody)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
