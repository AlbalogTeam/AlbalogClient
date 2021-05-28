import React, { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import 'components/partTime/accountinfo/ProfileInfo.scss';

function ProfileInfo({ props }) {
  const [name, setName] = useState();
  const [password, setpassword] = useState();

  return (
    <div id="ProfileInfo">
      <div className="tr">
        <div className="head">이름</div>
        <input className="content name" placeholder="유저이름" />
        <button>
          <MdEdit />
        </button>
      </div>
      <div className="tr">
        <div className="head">아이디</div>
        <div className="content">userid1</div>
      </div>
      <div className="tr">
        <div className="head">비밀번호</div>
        <input
          type="password"
          className="content password"
          placeholder="userid1"
        />
      </div>
      <div className="tr">
        <div className="head">비밀번호 확인</div>
        <input
          type="password"
          className="content password-confirm"
          placeholder="userid1"
        />
        <button>
          <MdEdit />
        </button>
      </div>
      <div className="tr">
        <div className="head">성별</div>
        <div className="content">남자</div>
      </div>
      <div className="tr">
        <div className="head">생년월일</div>
        <div className="content">2021/06/18</div>
      </div>
      <div className="tr">
        <div className="head">직급</div>
        <div className="content">아르바이트</div>
      </div>
    </div>
  );
}

export default ProfileInfo;
