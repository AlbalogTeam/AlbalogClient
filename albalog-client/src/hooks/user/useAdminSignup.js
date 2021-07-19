import { ChangeField } from 'modules/auth';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkEmailValidation } from 'utils/api/user';
import jwt from 'jsonwebtoken';
import { TOKENKEY } from 'config';
import { SetUser } from 'modules/user';
import { ownerRegister } from 'utils/api/auth';

export default function useAdminSignup() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.auth.register);
  const { email, password, name } = form;

  // 유효성 상태
  const [emailValid, setEmailValid] = useState(10);
  const [passwordValid, setPasswordValid] = useState(10);
  const [passwordCheckValid, setPasswordCheckValid] = useState(10);

  // input 상태관리
  const onChange = (e) => {
    const { value, name } = e.target;
    let FormBody = {
      form: 'register',
      key: name,
      value,
    };
    dispatch(ChangeField(FormBody));
    if (name === 'password') passwordValidation(e.target.value);
    if (name === 'passwordCheck') passwordCheckValidateion(e.target.value);
  };

  // 이메일 중복 확인
  const emailValidation = async () => {
    try {
      await checkEmailValidation(email);
      setEmailValid(0);
    } catch (e) {
      setEmailValid(1);
    }
  };

  // 비밀번호 유효성 체크
  const passwordValidation = (pw) => {
    let num = /[0-9]/;
    let eng = /[a-zA-Z]/;
    if (pw.length < 6 || num.test(pw) === false || eng.test(pw) === false) {
      setPasswordValid(1);
      return;
    }
    setPasswordValid(0);
  };

  // 비밀번호확인 유효성 체크
  const passwordCheckValidateion = (pwCheck) => {
    password !== pwCheck ? setPasswordCheckValid(1) : setPasswordCheckValid(0);
  };

  // 관리자 회원가입
  const onAdminSignup = async () => {
    if (emailValid !== 0 || passwordValid !== 0 || passwordCheckValid !== 0) {
      alert('양식을 정확히 입력해주세요');
      return;
    }
    try {
      const response = await ownerRegister(email, name, password);
      const token = response.data.token;
      const decoded = jwt.verify(token, TOKENKEY);
      let userBody = {
        _id: response.data.employer._id,
        email: response.data.employer.email,
        name: response.data.employer.name,
        role: decoded.role,
        token: response.data.token,
      };
      dispatch(SetUser(userBody));
    } catch (e) {
      alert('회원가입에 실패했습니다.');
      console.log(e);
    }
  };

  return {
    onChange,
    emailValidation,
    emailValid,
    passwordValid,
    passwordCheckValid,
    email,
    password,
    name,
    onAdminSignup,
  };
}
