import React, { useState } from 'react';
import { BsPerson } from 'react-icons/bs';
import { VscAccount } from 'react-icons/vsc';
import './AccountInfo.scss';
import PayrollList from 'components/partTime/accountinfo/PayrollList';
import ProfileInfo from 'components/partTime/accountinfo/ProfileInfo';
import Header from 'components/Header/Header';
import Aside from 'components/Aside/Aside';

const monthlypay = [
  {
    id: 20210415,
    pay: 274880,
  },
  {
    id: 20210515,
    pay: 274880,
  },
];

const detail = [
  {
    id: 202104015,
    date: '0315',
    timeFrom: '0800',
    timeTo: '1200',
    dailypay: 34360,
  },
  {
    id: 202104015,
    date: '0316',
    timeFrom: '0800',
    timeTo: '1200',
    dailypay: 34360,
  },
  {
    id: 202105015,
    date: '0417',
    timeFrom: '0800',
    timeTo: '1200',
    dailypay: 34360,
  },
  {
    id: 202105015,
    date: '0418',
    timeFrom: '0800',
    timeTo: '1200',
    dailypay: 34360,
  },
];

function AccountInfo() {
  return (
    <>
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
              <PayrollList month={monthlypay} detail={detail} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountInfo;
