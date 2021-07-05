import axios from 'axios';
import { APIURL } from 'config';
import React from 'react';
import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import './FindPassword.scss';

const ResetPassword = ({ match, history }) => {
  const tokenId = match.params.tokenid;

  const [resetForm, setResetForm] = useState({
    password: '',
    passwordCheck: '',
  });

  const [formValid, setFormValid] = useState({
    passwordValid: 10,
    passwordCheckValid: 10,
  });

  const { passwordValid, passwordCheckValid } = formValid;

  const { password, passwordCheck } = resetForm;

  const onChange = (e) => {
    const { name, value } = e.target;

    const nextForm = {
      ...resetForm,
      [name]: value,
    };
    setResetForm(nextForm);

    if (name === 'password') {
      passwordValidation(e.target.value);
    }

    if (name === 'passwordCheck') {
      passwordCheckValidateion(e.target.value);
    }
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

    if (passwordValid !== 0 || passwordCheckValid !== 0) {
      alert('양식을 정확히 입력해주세요');
      return;
    }

    let body = {
      tokenId,
      newPassword: password,
    };

    axios.patch(`${APIURL}/reset_password`, body).then((response) => {
      console.log(response);
      if (response.status === 200) {
        alert('비밀번호가 변경되었습니다');
        history.push('/');
      }
    });
  };

  return (
    <>
      <div id="FindPassword">
        <div className="inner-section">
          <div className="find-tit">새 비밀번호 설정</div>
          <div className="write-form">
            <form action="" onSubmit={onSubmit}>
              <label>새 비밀번호</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="새 비밀번호를 입력해주세요"
              />

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
              <label>새 비밀번호 확인</label>
              <input
                type="password"
                name="passwordCheck"
                value={passwordCheck}
                onChange={onChange}
                placeholder="새 비밀번호를 다시 입력해주세요"
              />

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
              <button type="submit">완료</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(ResetPassword);
