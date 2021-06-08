import axios from 'axios';
import { ChangeField } from 'modules/auth';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import './SignUp.scss';
import { SetUser } from 'modules/user';

function SignUp({ form, user, dispatchChangeField, dispatchSetUser, history }) {
  const [formValid, setFormValid] = useState({
    emailValid: 0,
    passwordValid: 0,
    passwordCheckValid: 0,
  });

  const { emailValid, passwordValid, passwordCheckValid } = formValid;

  const onChange = (e) => {
    const { value, name } = e.target;
    let FormBody = {
      form: 'register',
      key: name,
      value,
    };

    dispatchChangeField(FormBody);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password, name } = form;

    let registerBody = {
      email,
      name,
      password,
    };

    axios
      .post('https://albalog-test.herokuapp.com/api/v1/owner/signup', registerBody)
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
        };
        dispatchSetUser(userBody);
      })
      .catch(function (error) {
        // status 코드가 200이 아닌경우 처리
        if (error) {
          alert('회원가입에 실패했습니다.');
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
    <div id="signup">
      <form action="" onSubmit={onSubmit}>
        <div className="signUpLeft">
          <h1>Albalog</h1>
          <div className="email-form signup-form">
            <span>이메일</span>
            <input
              type="text"
              name="email"
              onChange={onChange}
              placeholder="이메일을 입력해주세요"
            />
          </div>
          <p
            className="error"
            style={emailValid ? { display: 'block' } : { display: 'none' }}
          >
            이미 사용중인 이메일 입니다
          </p>
          <div className="name-form signup-form">
            <span>이름</span>
            <input
              type="text"
              name="name"
              onChange={onChange}
              placeholder="이름을 입력해주세요"
            />
          </div>
          <div className="pw-form signup-form">
            <span>비밀번호</span>
            <input
              type="password"
              name="password"
              onChange={onChange}
              placeholder="비밀번호를 입력해주세요"
            />
          </div>
          <p
            className="error"
            style={passwordValid ? { display: 'block' } : { display: 'none' }}
          >
            8글자 이상, 영문/숫자를 조합해주세요
          </p>
          <div className="pwCheck-form signup-form">
            <span>비밀번호 확인</span>
            <input
              type="password"
              name="passwordCheck"
              onChange={onChange}
              placeholder="비밀번호를 다시 입력해주세요"
            />
          </div>
          <p
            className="error"
            style={
              passwordCheckValid ? { display: 'block' } : { display: 'none' }
            }
          >
            동일한 비밀번호를 입력해주세요
          </p>
          <button type="submit" className="form-submit">
            가입하기
          </button>
        </div>
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  // redux state로 부터 state를 component의 props로 전달해줌
  // store의 값이 여기 함수 state로 들어옴
  return { form: state.auth.register, user: state.user };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchChangeField: (FormBody) => dispatch(ChangeField(FormBody)),
    dispatchSetUser: (UserBody) => dispatch(SetUser(UserBody)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
