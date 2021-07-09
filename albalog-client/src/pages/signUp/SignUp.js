import axios from 'axios';
import { ChangeField } from 'modules/auth';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import './SignUp.scss';
import { SetUser } from 'modules/user';
import { useHistory } from 'react-router-dom';
import { APIURL, TOKENKEY } from 'config';

function SignUp({ form, user, auth, dispatchChangeField, dispatchSetUser }) {
  const history = useHistory();
  const [formValid, setFormValid] = useState({
    emailValid: 10,
    passwordValid: 10,
    passwordCheckValid: 10,
  });

  let { emailValid, passwordValid, passwordCheckValid } = formValid;
  const { email, password, name } = form;
  const onChange = (e) => {
    const { value, name } = e.target;
    let FormBody = {
      form: 'register',
      key: name,
      value,
    };
    dispatchChangeField(FormBody);

    if (name === 'password') {
      passwordValidation(e.target.value);
    }

    if (name === 'passwordCheck') {
      passwordCheckValidateion(e.target.value);
    }
  };

  // 이메일 중복 확인
  const emailValidation = () => {
    axios
      .post(`${APIURL}/owner/check`, { email })
      .then((response) => {
        const nextForm = {
          ...formValid,
          emailValid: 0,
        };
        setFormValid(nextForm);
      })
      .catch((error) => {
        const nextForm = {
          ...formValid,
          emailValid: 1,
        };
        setFormValid(nextForm);
      });
  };

  // 비밀번호 유효성 체크
  const passwordValidation = (pw) => {
    let num = /[0-9]/;
    let eng = /[a-zA-Z]/;
    console.log(num.test(pw));
    if (pw.length < 6) {
      const nextForm = {
        ...formValid,
        passwordValid: 1,
      };
      setFormValid(nextForm);
      return;
    }

    if (num.test(pw) === false || eng.test(pw) === false) {
      const nextForm = {
        ...formValid,
        passwordValid: 1,
      };
      setFormValid(nextForm);
      return;
    }
    const nextForm = {
      ...formValid,
      passwordValid: 0,
    };
    setFormValid(nextForm);
  };

  // 비밀번호확인 유효성 체크
  const passwordCheckValidateion = (pwCheck) => {
    if (password !== pwCheck) {
      const nextForm = {
        ...formValid,
        passwordCheckValid: 1,
      };
      setFormValid(nextForm);
    } else {
      const nextForm = {
        ...formValid,
        passwordCheckValid: 0,
      };
      setFormValid(nextForm);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (emailValid !== 0 || passwordValid !== 0 || passwordCheckValid !== 0) {
      alert('양식을 정확히 입력해주세요');
      return;
    }

    let registerBody = {
      email,
      name,
      password,
    };

    axios
      .post(`${APIURL}/owner/signup`, registerBody)
      .then((response) => {
        const token = response.data.token;
        const decoded = jwt.verify(token, TOKENKEY);

        let userBody = {
          _id: response.data.employer._id,
          email: response.data.employer.email,
          name: response.data.employer.name,
          role: decoded.role,
          token: response.data.token,
        };
        dispatchSetUser(userBody);
      })
      .catch((error) => {
        alert('회원가입에 실패했습니다.');
      });
  };

  useEffect(() => {
    if (user.email) {
      history.push('/'); // 홈 화면으로 이동
      try {
        sessionStorage.setItem('user', JSON.stringify(user));
      } catch (e) {}
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
            <button
              onClick={emailValidation}
              type="button"
              className="email-check"
            >
              중복확인
            </button>
          </div>

          {emailValid === 1 ? (
            <p className="error">이미 사용중인 이메일 입니다.</p>
          ) : (
            ''
          )}
          {emailValid === 0 ? (
            <p className="good">사용 가능한 이메일 입니다.</p>
          ) : (
            ''
          )}

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
              placeholder="영문+숫자 6자 이상"
            />
          </div>

          {passwordValid === 1 ? (
            <p className="error">6글자 이상, 영문/숫자를 조합해주세요.</p>
          ) : (
            ''
          )}
          {passwordValid === 0 ? (
            <p className="good">6글자 이상, 영문/숫자를 조합해주세요.</p>
          ) : (
            ''
          )}

          <div className="pwCheck-form signup-form">
            <span>비밀번호 확인</span>
            <input
              type="password"
              name="passwordCheck"
              onChange={onChange}
              placeholder="비밀번호 확인"
            />
          </div>

          {passwordCheckValid === 1 ? (
            <p className="error"> 동일한 비밀번호를 입력해주세요.</p>
          ) : (
            ''
          )}
          {passwordCheckValid === 0 ? (
            <p className="good">동일한 비밀번호를 입력해주세요.</p>
          ) : (
            ''
          )}
          <div className="sign-up-btn">
            <button type="submit" className="form-submit">
              가입하기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return { form: state.auth.register, user: state.user, auth: state.auth };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchChangeField: (FormBody) => dispatch(ChangeField(FormBody)),
    dispatchSetUser: (UserBody) => dispatch(SetUser(UserBody)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
