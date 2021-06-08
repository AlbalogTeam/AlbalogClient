import axios from 'axios';
import { ChangeField } from 'modules/auth';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './SignUp.scss';

function SignUp({ form, dispatchChangeField }) {
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

    let body = {
      email,
      name,
      password,
    };

    axios
      .post('https://albalog-test.herokuapp.com/api/v1/owner/signup', body)
      .then((response) => console.log(response.data));
  };

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
  return { form: state.auth.register };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchChangeField: (FormBody) => dispatch(ChangeField(FormBody)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
