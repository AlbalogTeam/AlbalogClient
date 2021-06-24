import StoreList from 'components/landing/StoreList/StoreList';
import StoreRegister from 'components/landing/StoreRegister/StoreRegister';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Landing.scss';


const Landing = () => {
  const [registerState, setRegisterState] = useState(false);
  const user = useSelector((state) => state.user);

  const ToggleButton = () => {
    setRegisterState(!registerState);
  };
  return (
    <div id="LandingPage" className="page-layout">
      <div className="shop">
        <div className="landing">
          <div className="lp-tit">
            <h3>매장 리스트</h3>
          </div>
          <div className="lp-cont">
            <StoreList role={user.role} />
          </div>
          <div className="lp-regi">
            {user.role === 'owner' && (
              <button className="add-store" onClick={ToggleButton}>매장 추가</button>
            )}
            {registerState && <StoreRegister ToggleButton={ToggleButton} />}
          </div>
        </div>
      </div>


    </div>
  );
};

export default Landing;
