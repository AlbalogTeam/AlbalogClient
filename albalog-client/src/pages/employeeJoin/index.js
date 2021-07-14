import React from 'react';
import './styles.scss';
import banner from 'static/banner.png';

const EmployeeJoin = () => {
  return (
    <>
      <div id="EmployeeJoin">
        <div className="inner-join">
          <div className="join-tit">
            <img src={banner} alt="" />
          </div>

          <div className="join-content">
            <div className="name">스타벅스 강남점</div>
            <div className="text">staff@albalog.com 으로 가입하시겠습니까?</div>
            <div className="btn">
              <button>바로 가입</button>
            </div>
            <div className="explain">
              이메일 변경을 원하시면 관리자에게 새로운 이메일 초대를 요청하세요
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeJoin;
