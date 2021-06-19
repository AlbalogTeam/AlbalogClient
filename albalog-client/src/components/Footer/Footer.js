import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.scss';
import { AiFillHome, AiOutlineMenu, AiOutlineExport } from 'react-icons/ai';

const Footer = () => {
  return (
    <div id="Footer">
      <ul className="menu">
        <NavLink to="">
          <li className="menu-item">
            <AiFillHome size="25" />
            <span>홈</span>
          </li>
        </NavLink>
        <NavLink to="">
          <li className="menu-item">
            <AiOutlineMenu size="25" />
            <span>카테고리</span>
          </li>
        </NavLink>
        <NavLink to="">
          <li className="menu-item">
            <AiOutlineExport size="25" />
            <span>나가기</span>
          </li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Footer;
