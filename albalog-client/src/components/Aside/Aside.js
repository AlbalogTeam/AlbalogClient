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
            <AiOutlineNotification />
            <span>공지사항</span>
          </li>
        </NavLink>
        <NavLink to={`/${shop._id}/workmanual/`}>
          <li className="menu-item">
            <AiOutlineSolution />
            <span>업무 메뉴얼</span>
          </li>
        </NavLink>
        <NavLink to={`/${shop._id}/transition`}>
          <li className="menu-item">
            <AiOutlineSwap />
            <span>인수 인계 사항</span>
          </li>
        </NavLink>
      </ul>
      {user.role === 'owner' && (
        <>
          <h3>관리자 메뉴</h3>
          <ul className="menu">
            <NavLink to={`/admin/${shop._id}`} exact>
              <li className="menu-item">
                <RiDashboardLine />
                <span>대시 보드</span>
              </li>
            </NavLink>
            <NavLink to={`/admin/${shop._id}/employeelist`} exact>
              <li className="menu-item">
                <HiOutlineUsers />
                <span>직원 관리</span>
              </li>
            </NavLink>
            <NavLink to={`/admin/${shop._id}/schedule`} exact>
              <li className="menu-item">
                <AiOutlineSchedule />
                <span>스케줄 관리</span>
              </li>
            </NavLink>
            <NavLink to={`/admin/${shop._id}/payroll`} exact>
              <li className="menu-item">
                <BiDollar />
                <span>급여 관리</span>
              </li>
            </NavLink>
            <NavLink to={`/admin/${shop._id}/info`} exact>
              <li className="menu-item">
                <IoSettingsOutline />
                <span>계정 정보</span>
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
                <RiDashboardLine />
                <span>대시 보드</span>
              </li>
            </NavLink>
            <NavLink to={`/parttime/${shop._id}/accountinfo`} exact>
              <li className="menu-item">
                <AiOutlineSchedule />
                <span>계정 정보</span>
              </li>
            </NavLink>
            <NavLink to={`/parttime/${shop._id}/scheduler`} exact>
              <li className="menu-item">
                <BiDollar />
                <span>스케줄러</span>
              </li>
            </NavLink>
            <NavLink to={`/parttime/${shop._id}/workingtime`} exact>
              <li className="menu-item">
                <IoSettingsOutline />
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
