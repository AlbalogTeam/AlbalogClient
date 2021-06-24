import React from 'react';
import { HiOutlineUsers } from 'react-icons/hi';
import {
  AiOutlineSchedule,
  AiOutlineNotification,
  AiOutlineSwap,
  AiOutlineSolution,
} from 'react-icons/ai';
import { RiDashboardLine } from 'react-icons/ri';
import { IoSettingsOutline } from 'react-icons/io5';
import { BiDollar } from 'react-icons/bi';
import './Aside.scss';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const Aside = ({ shop, user }) => {
  return (
    <aside className="aside-container">
      <ul className="menu">
        <NavLink to={`/${shop._id}/notice`}>
          <li className="menu-item">
            <AiOutlineNotification size="25" />
            <span>공지사항</span>
          </li>
        </NavLink>
        <NavLink to={`/${shop._id}/workmanual/`}>
          <li className="menu-item">
            <AiOutlineSolution size="25" />
            <span>업무메뉴얼</span>
          </li>
        </NavLink>
        <NavLink to={`/${shop._id}/transition`}>
          <li className="menu-item">
            <AiOutlineSwap size="25" />
            <span>인수인계</span>
          </li>
        </NavLink>
      </ul>
      {user.role === 'owner' && (
        <>
          <h3>관리자 메뉴</h3>
          <ul className="menu">
            <NavLink to={`/admin/${shop._id}`} exact>
              <li className="menu-item">
                <RiDashboardLine size="25" />
                <span>대시보드</span>
              </li>
            </NavLink>
            <NavLink to={`/admin/${shop._id}/employeelist`} exact>
              <li className="menu-item">
                <HiOutlineUsers size="25" />
                <span>직원관리</span>
              </li>
            </NavLink>
            <NavLink to={`/admin/${shop._id}/schedule`} exact>
              <li className="menu-item">
                <AiOutlineSchedule size="25" />
                <span>스케줄관리</span>
              </li>
            </NavLink>
            <NavLink to={`/admin/${shop._id}/payroll`} exact>
              <li className="menu-item">
                <BiDollar size="25" />
                <span>급여관리</span>
              </li>
            </NavLink>
            <NavLink to={`/admin/${shop._id}/info`} exact>
              <li className="menu-item">
                <IoSettingsOutline size="25" />
                <span>계정정보</span>
              </li>
            </NavLink>
          </ul>
        </>
      )}
      {user.role === 'staff' && (
        <>
          <h3>직원 메뉴</h3>
          <ul className="menu">
            <NavLink to={`/parttime/${shop._id}`} exact>
              <li className="menu-item">
                <RiDashboardLine size="25" />
                <span>대시보드</span>
              </li>
            </NavLink>
            <NavLink to={`/parttime/${shop._id}/accountinfo`} exact>
              <li className="menu-item">
                <IoSettingsOutline size="25" />
                <span>계정정보</span>
              </li>
            </NavLink>
            <NavLink to={`/parttime/${shop._id}/scheduler`} exact>
              <li className="menu-item">
                <AiOutlineSchedule size="25" />
                <span>스케줄러</span>
              </li>
            </NavLink>
            <NavLink to={`/parttime/${shop._id}/workingtime`} exact>
              <li className="menu-item">
                <BiDollar size="25" />
                <span>일한시간</span>
              </li>
            </NavLink>
          </ul>
        </>
      )}
    </aside>
  );
};

function mapStateToProps(state) {
  return { shop: state.shop, user: state.user };
}

export default connect(mapStateToProps)(Aside);
