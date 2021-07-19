import React from 'react';
import './Login.scss';
import banner from 'static/banner.png';
import useCheckUserEffect from 'hooks/user/useCheckUserEffect';
import useLogin from 'hooks/user/useLogin';

function Login() {
  
  const { onLogin, onChange } = useLogin();

  const onSubmit = async (e) => {
    e.preventDefault();
    await onLogin();
  };

  useCheckUserEffect();

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

export default Login;
