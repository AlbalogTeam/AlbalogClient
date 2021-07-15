import React, { useState } from 'react';
import 'components/partTime/dashboard/DashboardAccount.scss';
import { IoIosArrowForward } from 'react-icons/io';
import { BsPerson } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const DashboardAccount = ({ user, shop, parttime }) => {
  const [account] = useState({
    name: user.name,
    hourly_wage: parttime.hourly_wage,
    status: parttime.status,
  });

  const { name, hourly_wage, status } = account;

  return (
    <div id="frame">
      <h2>Dashboard</h2>
      <div className="accountBox">
        <div className="textLine">
          <span>계정정보</span>
          <Link to={`/parttime/${shop._id}/accountinfo`}>
            <span className="moreBtn">
              더보기
              <IoIosArrowForward />
            </span>
          </Link>
        </div>
        <div className="informBox">
          <div className="imgBox">
            <BsPerson />
          </div>
          <div className="table">
            <div className="tr">
              <p>이름</p>
              <p>{name}</p>
            </div>
            <div className="tr">
              <p>시급</p>
              <p>{hourly_wage}</p>
            </div>
            <div className="tr">
              <p>재직상태</p>
              <p>{status}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return { shop: state.shop, user: state.user, parttime: state.parttime };
}

export default connect(mapStateToProps)(DashboardAccount);
