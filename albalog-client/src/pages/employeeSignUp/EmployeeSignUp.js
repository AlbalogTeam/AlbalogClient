import React from 'react';
import '../adminSignup/AdminSignup.scss';
import useCheckUserEffect from 'hooks/user/useCheckUserEffect';
import useInitialParttimeSignup from 'hooks/user/useInitialParttimeSignup';

function EmployeeSignUp() {
  const {
    shopName,
    userEmail,
    userName,
    password,
    passwordCheck,
    cellphone,
    birthdate,
    gender,
    onChange,
    onSignup,
  } = useInitialParttimeSignup();

  useCheckUserEffect();

  const onSubmit = async (e) => {
    e.preventDefault();
    await onSignup();
  };

  return (
    <div id="signup">
      <form action="#" onSubmit={onSubmit}>
        <div className="inner-signup">
          <h1>{shopName}</h1>

          <div className="email-form signup-form">
            <span>이메일</span>
            <input
              type="email"
              value={userEmail}
              readOnly
              name="email"
              placeholder="이메일을 입력하세요."
            />
          </div>

          <div className="name-form signup-form">
            <span>이름</span>
            <input
              type="text"
              value={userName}
              readOnly
              name="name"
              placeholder="이름을 입력하세요."
            />
          </div>

          <div className="pw-form signup-form">
            <span>비밀번호</span>
            <input
              type="password"
              value={password}
              onChange={onChange}
              name="password"
              placeholder="비밀번호를 입력하세요."
            />
          </div>

          <div className="pwCheck-form signup-form">
            <span>비밀번호 확인</span>
            <input
              type="password"
              value={passwordCheck}
              onChange={onChange}
              name="passwordCheck"
              placeholder="비밀번호를 입력하세요."
            />
          </div>

          <div className="signup-form">
            <span>핸드폰번호</span>
            <input
              type="number"
              value={cellphone}
              onChange={onChange}
              name="cellphone"
              placeholder="핸드폰번호를 입력하세욘."
            />
          </div>

          <div className="signup-form">
            <span>성별</span>
            <select
              name="gender"
              class="input"
              value={gender}
              onChange={onChange}
            >
              <option value="">선택</option>
              <option value="남성">남자</option>
              <option value="여성">여자</option>
            </select>
          </div>

          <div className="signup-form">
            <span>생일</span>
            <input
              type="date"
              value={birthdate}
              onChange={onChange}
              name="birthdate"
              placeholder="2021/01/01"
            />
          </div>

          <div className="sign-up-btn">
            <button type="submit" className="form-submit">
              회원가입
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EmployeeSignUp;
