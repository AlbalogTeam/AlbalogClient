import React from 'react';
import './SignUp.scss';

function SignUp() {
  return (
    <div id="signup">
      <div className="signUpLeft">
        <h1>Albalog</h1>
        <span>이메일</span>
        <input type="text" placeholder="내용을 입력해주세요" />
        <span>이름</span>
        <input type="text" placeholder="내용을 입력해주세요" />
        <span>비밀번호</span>
        <input type="password" placeholder="내용을 입력해주세요" />
        <span>비밀번호 확인</span>
        <input type="password" placeholder="내용을 입력해주세요" />
        <button className="signUp">가입하기</button>
      </div>
      <div className="signUpRight">
        <label>
          <input type="checkbox" />
          <span>서비스 이용약관</span>
        </label>
        <div>
          <h5>제 1조 서비스이용약관</h5>
          <p>가나다라마바사아자차카타파하</p>

          <h5>제 2조 서비스이용약관</h5>
          <p>가나다라마바사아자차카타파하</p>
        </div>
        <label>
          <input type="checkbox" />
          <span>개인정보처리방침</span>
        </label>
        <div>
          <h5>제 1조 개인정보처리방침</h5>
          <p>가나다라마바사아자차카타파하</p>

          <h5>제 2조 개인정보처리방침</h5>
          <p>가나다라마바사아자차카타파하</p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
