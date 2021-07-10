import axios from 'axios';
import { TOKENKEY } from 'config';
import { APIURL } from 'config';
import jwt from 'jsonwebtoken';
import { ChangeField } from 'modules/auth';
import { SetUser } from 'modules/user';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import './Login.scss';
import banner from 'static/banner.png';
import { SetParttime } from 'modules/parttime';

function Login({
  form,
  user,
  parttime,
  dispatchSetParttime,
  dispatchChangeField,
  dispatchSetUser,
}) {
  const history = useHistory();
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
      .post(`${APIURL}/login`, loginBody)
      .then((response) => {
        const token = response.data.token;
        const decoded = jwt.verify(token, TOKENKEY);

        let userBody = {
          _id: response.data.user._id,
          email: response.data.user.email,
          name: response.data.user.name,
          role: decoded.role,
          token: response.data.token,
        };

        if (decoded.role === 'staff') {
          let parttimeBody = {
            stores: response.data.user.stores,
            birthdate: response.data.user.birthdate,
            hourly_wage: response.data.user.hourly_wage,
            gender: response.data.user.gender,
            timeClocks: response.data.user.timeClocks,
            status: response.data.user.status,
            cellphone: response.data.user.cellphone,
          };
          dispatchSetParttime(parttimeBody);
          sessionStorage.setItem('parttime', JSON.stringify(parttimeBody));
        }
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
        sessionStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('로컬스토리지 저장에 실패했습니다');
      }
    } else {
      console.log('유저가 없습니다');
    }
  }, [history, user]);

  return (
    <div id="LoginPage">
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
          <div className="find-pw">
            <div className="inner-find">
              <a href="/findpassword">비밀번호 찾기</a>
            </div>
          </div>
          <button type="submit" className="signIn btn">
            로그인
          </button>
          <div className="signUp">
            Albalog로 쉽고 편한 매장 관리를 원하세요 ?
            <a href="/signup">관리자 회원가입</a>
          </div>
        </form>
        <div className="loginRight">
          <img src={banner} alt="" />
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { form: state.auth.login, user: state.user, parttime: state.parttime };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchChangeField: (FormBody) => dispatch(ChangeField(FormBody)),
    dispatchSetUser: (UserBody) => dispatch(SetUser(UserBody)),
    dispatchSetParttime: (ParttimeBody) => dispatch(SetParttime(ParttimeBody)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
