import React from 'react';
import {
  AiOutlineSchedule,
  AiOutlineNotification,
  AiOutlineSwap,
  AiOutlineSolution,
} from 'react-icons/ai';
import { RiDashboardLine } from 'react-icons/ri';
import { IoSettingsOutline } from 'react-icons/io5';
import { BiDollar } from 'react-icons/bi';
import './ParttimeAside.scss';
import { NavLink } from 'react-router-dom';

const ParttimeAside = () => {
  return (
    <aside className="aside-container">
      <ul className="menu">
        <NavLink to={'/notice'} exact>
          <li className="menu-item">
            <AiOutlineNotification />
            <span>공지사항</span>
          </li>
        </NavLink>
        <NavLink to={'/workmanual/'}>
          <li className="menu-item">
            <AiOutlineSolution />
            <span>업무 메뉴얼</span>
          </li>
        </NavLink>
        <NavLink to={'/transition'} exact>
          <li className="menu-item">
            <AiOutlineSwap />
            <span>인수 인계 사항</span>
          </li>
        </NavLink>
      </ul>

      <h3>직원 메뉴</h3>
      <ul className="menu">
        <NavLink to={'/parttimedashboard'} exact>
          <li className="menu-item">
            <RiDashboardLine />
            <span>대시 보드</span>
          </li>
        </NavLink>

        <NavLink to={'/accountinfo'} exact>
          <li className="menu-item">
            <AiOutlineSchedule />
            <span>계정정보</span>
          </li>
        </NavLink>
        <NavLink to={'/payroll'} exact>
          <li className="menu-item">
            <BiDollar />
            <span>스케줄러</span>
          </li>
        </NavLink>
        <NavLink to={'/workingtime'} exact>
          <li className="menu-item">
            <IoSettingsOutline />
            <span>일한시간</span>
          </li>
        </NavLink>
      </ul>
    </aside>
  );
};

export default ParttimeAside;
