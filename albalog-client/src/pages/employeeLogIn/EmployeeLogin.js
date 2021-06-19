import axios from 'axios';
import { TOKENKEY } from 'config';
import { APIURL } from 'config';
import jwt from 'jsonwebtoken';
import { ChangeField } from 'modules/auth';
import { SetUser } from 'modules/user';
import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import 'pages/login/Login.scss';
import LoginNav from 'components/LoginNav/LoginNav';
import banner from 'static/banner.png';
import { SetParttime } from 'modules/parttime';

function EmployeeLogin({
  form,
  user,
  parttime,
  dispatchChangeField,
  dispatchSetUser,
}) {
  const history = useHistory();
  const dispatch = useDispatch();
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
      .post(`${APIURL}/employee/login`, loginBody)
      .then((response) => {
        const token = response.data.token;
        const decoded = jwt.verify(token, TOKENKEY);
        console.log(response.data);
        let userBody = {
          _id: response.data.employee._id,
          email: response.data.employee.email,
          name: response.data.employee.name,
          role: decoded.role,
          token: response.data.token,
        };

        let parttimeBody = {
          store: response.data.employee.stores,
          birthdate: response.data.employee.birthdate,
          wage: response.data.employee.wage,
          gender: response.data.employee.gender,
          timeclock: response.data.employee.timeClocks,
          status: response.data.employee.status,
          cellphone: response.data.employee.cellphone,
        };
        dispatchSetUser(userBody);
        dispatch(SetParttime(parttimeBody));
        localStorage.setItem('parttime', JSON.stringify(parttimeBody));
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
      history.push('/'); // 대쉬보드로 이동
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('로컬스토리지 저장에 실패했습니다');
      }
    } else {
      console.log('유저가 없습니다');
    }
  }, [history, user, parttime]);

  return (
    <div id="LoginPage">
      <LoginNav />

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
        </form>
        <div className="loginRight">
          <img src={banner} alt="" />
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  // redux state로 부터 state를 component의 props로 전달해줌
  // store의 값이 여기 함수 state로 들어옴
  return { form: state.auth.login, user: state.user, parttime: state.parttime };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchChangeField: (FormBody) => dispatch(ChangeField(FormBody)),
    dispatchSetUser: (UserBody) => dispatch(SetUser(UserBody)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeLogin);
