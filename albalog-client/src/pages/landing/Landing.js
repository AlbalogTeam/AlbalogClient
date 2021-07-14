import StoreList from 'components/landing/StoreList';
import StoreRegister from 'components/landing/StoreRegister';
import { SetUser } from 'modules/user';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ownerLogout, parttimeLogout } from 'utils/api/user';
import './Landing.scss';

const Landing = () => {
  const [registerState, setRegisterState] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const ToggleButton = () => {
    setRegisterState(!registerState);
  };

  const logOutHandler = async () => {
    let UserBody = {
      _id: '',
      email: '',
      name: '',
      role: '',
      token: '',
    };
    if (user.role === 'owner') {
      try {
        await ownerLogout();
        sessionStorage.removeItem('user'); // sessionStorage user를 제거
        dispatch(SetUser(UserBody)); // user redux를 초기값으로 설정
      } catch (e) {
        alert('로그아웃에 실패했습니다.');
      }
    } else if (user.role === 'staff') {
      try {
        await parttimeLogout();
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('parttime');
        dispatch(SetUser(UserBody)); // user redux를 초기값으로 설정
      } catch (e) {
        alert('로그아웃에 실패했습니다.');
      }
    }
  };
  return (
    <div id="LandingPage" className="page-layout">
      <div className="landing-header">
        <div className="inner-header">
          <span>
            <b>{user.name}</b>님 안녕하세요
          </span>
          <button type="button" onClick={logOutHandler}>
            로그아웃
          </button>
        </div>
      </div>
      <div className="shop">
        <div className="landing">
          <div className="lp-tit">
            <h3>매장 리스트</h3>
          </div>
          <div className="lp-cont">
            <StoreList />
          </div>
          <div className="lp-regi">
            {user.role === 'owner' && (
              <button className="add-store" onClick={ToggleButton}>
                매장 추가
              </button>
            )}
            {registerState && <StoreRegister ToggleButton={ToggleButton} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
