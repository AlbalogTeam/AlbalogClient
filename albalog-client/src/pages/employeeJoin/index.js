import React, { useEffect, useState } from 'react';
import './styles.scss';
import banner from 'static/banner.png';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { getJoinInfo, Join } from 'utils/api/user';

const EmployeeJoin = () => {
  const match = useRouteMatch();
  const shopId = match.params.shop;
  const invitetoken = match.params.invitetoken;
  const [shopName, setShopName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getJoinInfo(shopId, invitetoken);
        setShopName(response.data.location_name);
        setUserEmail(response.data.user_email);
      } catch (e) {
        alert('유효하지 않은 링크입니다.');
        history.push('/login');
      }
    };
    getData();
  }, [invitetoken, shopId]);

  const onJoin = async () => {
    try {
      await Join(shopId, invitetoken);
      window.location.replace(`/`);
    } catch (e) {
      alert('가입에 실패했습니다.');
    }
  };

  return (
    <>
      <div id="EmployeeJoin">
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

export default EmployeeJoin;
