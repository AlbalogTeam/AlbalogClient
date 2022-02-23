import React from 'react';
import { BsPerson } from 'react-icons/bs';
import './AccountInfo.scss';
import PayrollList from 'components/partTime/accountinfo/PayrollList';
import ProfileInfo from 'components/partTime/accountinfo/ProfileInfo';
import Header from 'components/Header/Header';
import Aside from 'components/Aside/Aside';
import { useSelector } from 'react-redux';
import Loading from 'components/Loading/Loading';
import Footer from 'components/Footer/Footer';

function AccountInfo() {
  const user = useSelector((state) => state.user);
  return (
    <>
      {!user && <Loading />}
      <Header />
      <Aside />
      <div id="accountinfo">
        <div className="account-container">
          <h2>계정정보</h2>
          <div className="container">
            <div className="accountBox">
              <h3>Profile</h3>
              <div className="profile-box">
                <BsPerson style={{ fontSize: 90, textAlign: 'middle' }} />
              </div>
              <ProfileInfo />
            </div>
            <div className="payroll-box">
              <h3>Payroll</h3>
              <div className="table-head">
                <div className="date">날짜</div>
                <div className="time"></div>
                <div className="pay">급여</div>
              </div>
              <PayrollList />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AccountInfo;
