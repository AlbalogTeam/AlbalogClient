import React from 'react';
import { HiOutlineUsers } from 'react-icons/hi';
import {
  AiOutlineSchedule,
  AiOutlineNotification,
  AiOutlineSwap,
  AiOutlineSolution,
} from 'react-icons/ai';
import { IoSettingsOutline } from 'react-icons/io5';
import { BiDollar } from 'react-icons/bi';
import { RiDashboardLine } from 'react-icons/ri';
import './AdminAside.scss';

const AdminAside = () => {
  return (
    <aside className="aside-container">
      <ul className="menu">
        <li className="menu-item">
          <AiOutlineNotification />
          <span>공지사항</span>
        </li>
        <li className="menu-item">
          <AiOutlineSolution />
          <span>업무 메뉴얼</span>
        </li>
        <li className="menu-item">
          <AiOutlineSwap />
          <span>인수 인계 사항</span>
        </li>
      </ul>
      <h3>관리자 메뉴</h3>
      <ul className="menu">
        <a href="/admin/">
          <li className="menu-item">
            <RiDashboardLine />
            <span>대시 보드</span>
          </li>
        </a>
        <a href="/admin/employeelist">
          <li className="menu-item">
            <HiOutlineUsers />
            <span>직원 관리</span>
          </li>
        </a>
        <a href="/admin/schedule">
          <li className="menu-item">
            <AiOutlineSchedule />
            <span>스케줄 관리</span>
          </li>
        </a>
        <a href="/admin/payroll">
          <li className="menu-item">
            <BiDollar />
            <span>급여관리</span>
          </li>
        </a>
        <a href="/admin/info">
          <li className="menu-item">
            <IoSettingsOutline />
            <span>계정 정보</span>
          </li>
        </a>
      </ul>
    </aside>
  );
};

export default AdminAside;
