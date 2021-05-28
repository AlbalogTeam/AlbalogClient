import React, { useState } from 'react';
import { BsPerson } from 'react-icons/bs';
import { VscAccount } from 'react-icons/vsc';
import './AccountInfo.scss';
import PayrollList from 'components/partTime/accountinfo/PayrollList';

const monthlypay = [
  // {
  //   id: 1,
  //   question: 'Popular Articles',
  //   answer:
  //     'Suspendisse ipsum elit, hendrerit id eleifend at, condimentum et mauris. Curabitur et libero vel arcu dignissim pulvinar ut ac leo. In sit amet orci et erat accumsan interdum.',
  // },
  // {
  //   id: 2,
  //   question: 'Fix problems & request removals',
  //   answer:
  //     'Suspendisse ipsum elit, hendrerit id eleifend at, condimentum et mauris. Curabitur et libero vel arcu dignissim pulvinar ut ac leo. In sit amet orci et erat accumsan interdum.',
  // },
  // {
  //   id: 3,
  //   question: 'Browse the web',
  //   answer:
  //     'Suspendisse ipsum elit, hendrerit id eleifend at, condimentum et mauris. Curabitur et libero vel arcu dignissim pulvinar ut ac leo. In sit amet orci et erat accumsan interdum.',
  // },
  // {
  //   id: 4,
  //   question: 'Search on your phone or tablet',
  //   answer:
  //     'Suspendisse ipsum elit, hendrerit id eleifend at, condimentum et mauris. Curabitur et libero vel arcu dignissim pulvinar ut ac leo. In sit amet orci et erat accumsan interdum.',
  // },
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
    <div id="accountinfo">
      <h2>계정정보</h2>
      <div className="container">
        <div className="accountBox">
          <h3>Profile</h3>
          <div className="profile-box">
            <BsPerson style={{ fontSize: 90, textAlign: 'middle' }} />
          </div>
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
  );
}

export default AccountInfo;
