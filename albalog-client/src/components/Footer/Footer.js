import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.scss';
import { AiFillHome, AiOutlineMenu, AiOutlineExport } from 'react-icons/ai';

const Footer = () => {
  const activeStyle = {
    color: '#1271af',
  };

  return (
    <div id="Footer">
      <ul className="menu">
        <NavLink to="" activeStyle={activeStyle}>
          <li className="menu-item">
            <AiFillHome size="25" />
            <span>홈</span>
          </li>
        </NavLink>
        <NavLink to="" activeStyle={activeStyle}>
          <li className="menu-item">
            <AiOutlineMenu size="25" />
            <span>카테고리</span>
          </li>
        </NavLink>
        <NavLink to="" activeStyle={activeStyle}>
          <li className="menu-item">
            <AiOutlineExport size="25" />
            <span>매장 리스트</span>
          </li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Footer;
