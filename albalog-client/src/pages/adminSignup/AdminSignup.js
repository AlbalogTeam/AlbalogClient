import React from 'react';
import './AdminSignup.scss';
import useCheckUserEffect from 'hooks/user/useCheckUserEffect';
import useAdminSignup from 'hooks/user/useAdminSignup';

function AdminSignup() {
  const {
    onChange,
    emailValidation,
    emailValid,
    passwordValid,
    passwordCheckValid,
    onAdminSignup,
  } = useAdminSignup();

  const onSubmit = async (e) => {
    e.preventDefault();
    await onAdminSignup();
  };

  useCheckUserEffect();

  return (
    <div id="signup">
      <form action="" onSubmit={onSubmit}>
        <div className="inner-signup">
          <h1>Albalog</h1>

          <div className="email-form signup-form">
            <span>이메일</span>
            <div className="inner-email-form">
              <input
                type="email"
                name="email"
                className="email-input"
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

export default AdminSignup;
