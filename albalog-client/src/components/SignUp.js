import axios from 'axios';
import React, { useEffect } from 'react';
import './SignUp.scss';

function SignUp() {
  const onSubmit = (e) => {
    e.preventDefault();

    let signup = {
      name: '도도',
      email: 'albalog@naver.com',
      password: 'dsdasd',
    };

    // 회원 가입
    axios
      .post('https://albalog-test.herokuapp.com/api/v1/owner/signup', signup)
      .then((response) => console.log(response));

    // let body = {
    //   name: 'eeeeee',
    //   address: 'eeeeee',
    //   postal_code: '123-123',
    //   phone_number: '02-1234-1234',
    // };

    // 매장 생성
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGJjODcyZTZmOWRjYTAwMjhlYTQ2ZTgiLCJyb2xlIjoib3duZXIiLCJzdG9yZXMiOlt7Il9pZCI6IjYwYmM4Nzc0NmY5ZGNhMDAyOGVhNDZlYiIsImxvY2F0aW9uIjoiNjBiYzg3NzQ2ZjlkY2EwMDI4ZWE0NmVhIn1dLCJpYXQiOjE2MjI5NzAyOTB9.1mkK52NkABTnIiAs1Ys1X5qmNf4CRK23jX7L4D-xAjo';
    // axios
    //   .post('https://albalog-test.herokuapp.com/api/v1/location', body, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((response) => console.log(response.data));

    // 직원 초대
    const locationId = '60bc87746f9dca0028ea46ea';

    // let body = {
    //   name: '이도현',
    //   email: 'ksmfou98@naver.com',
    // };

    // axios
    //   .post(
    //     `https://albalog-test.herokuapp.com/api/v1/location/${locationId}/invite`,
    //     body,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     },
    //   )
    //   .then((response) => console.log(response.data));

    // 직원 회원가입
    //   let body = {
    //     name: '이도현',
    //     email: 'dohyu2323n@naver.com',
    //     password: '123123412asd',
    //     birthdate: '95-04-25',
    //     cellphone: '01001010111',
    //     gender: 'Man',
    //   };

    //   axios
    //     .post(
    //       'https://albalog-test.herokuapp.com/api/v1/employee/60bc87746f9dca0028ea46ea/signup',
    //       body,
    //     )
    //     .then((response) => console.log(response.data));

    // 로그인

    // let body = {
    //   email: 'albalog@naver.com',
    //   password: 'dsdasd',
    // };

    // axios
    //   .post('https://albalog-test.herokuapp.com/api/v1/owner/login', body)
    //   .then((response) => console.log(response.data));

    // 공지 생성
    // let body = {
    //   title: '공지',
    //   content: '내용',
    // };

    // axios
    //   .post(
    //     `https://albalog-test.herokuapp.com/api/v1/location/${locationId}/notice/create `,
    //     body,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     },
    //   )
    //   .then((response) => console.log(response.data));

    // 카테고리

    const categoryId = '60bc90ab6f9dca0028ea46f7';

    // let body = {
    //   name: '카테고리 ',
    // };

    // axios
    //   .post(
    //     `https://albalog-test.herokuapp.com/api/v1/category/${locationId}`,
    //     body,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     },
    //   )
    //   .then((response) => console.log(response.data));

    // 업무 매뉴얼 생성
    // let body = {
    //   title: '업무 매뉴얼',
    //   content: '매뉴얼 내용',
    // };

    // axios
    //   .post(
    //     `https://albalog-test.herokuapp.com/api/v1/location/${locationId}/workmanual/${categoryId}`,
    //     body,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     },
    //   )
    //   .then((response) => console.log(response.data));
  };

  return (
    <div id="signup">
      <form action="" onSubmit={onSubmit} style={{ display: 'flex' }}>
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
          <button type="submit" className="signUp">
            가입하기
          </button>
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
      </form>
    </div>
  );
}

export default SignUp;
