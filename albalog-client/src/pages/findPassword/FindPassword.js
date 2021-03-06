import React, { useState } from 'react';
import { findPasswordEmail } from 'utils/api/user';
import './FindPassword.scss';

const FindPassword = () => {
  const [findForm, setFindForm] = useState({
    email: '',
    name: '',
  });

  const { email, name } = findForm;

  const onChange = (e) => {
    const { name, value } = e.target;
    const nextForm = {
      ...findForm,
      [name]: value,
    };
    setFindForm(nextForm);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await findPasswordEmail(name, email);
      alert('이메일을 확인후 비밀번호를 재발급 받으세요 !');
    } catch (e) {
      alert('이메일을 다시 확인해주세요.');
    }
  };

  return (
    <>
      <div id="FindPassword">
        <div className="inner-section">
          <div className="find-tit">비밀번호 찾기</div>
          <div className="write-form">
            <form action="" onSubmit={onSubmit}>
              <label>이름</label>
              <input
                type="text"
                value={name}
                name="name"
                onChange={onChange}
                placeholder="이름을 입력해주세요"
              />
              <label>이메일</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="이메일을 입력해주세요"
              />
              <button type="submit">찾기</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FindPassword;
