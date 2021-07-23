import React from 'react';
import './styles.scss';
import banner from 'static/banner.png';

import useExistParttimeSignup from 'hooks/user/useExistParttimeSignup';

const ExistParttimSignup = () => {
  const { onJoin, shopName, userEmail } = useExistParttimeSignup();

  return (
    <>
      <div id="ExistParttimSignup">
        <div className="inner-join">
          <div className="join-tit">
            <img src={banner} alt="" />
          </div>

          <div className="join-content">
            <div className="name">{shopName}</div>
            <div className="text">{userEmail} 으로 가입하시겠습니까?</div>
            <div className="btn">
              <button type="button" onClick={onJoin}>
                바로 가입
              </button>
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

export default ExistParttimSignup;
