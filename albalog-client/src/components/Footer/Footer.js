import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.scss';
import { AiFillHome, AiOutlineMenu, AiFillAppstore } from 'react-icons/ai';
import { useSelector } from 'react-redux';

const Footer = () => {
  const activeStyle = {
    color: '#1271af',
  };

  const shop = useSelector((state) => state.shop);

  return (
    <div id="Footer">
      <ul className="menu">
        <NavLink
          to={`/${'admin' || 'parttime'}/${shop._id}`}
          activeStyle={activeStyle}
          exact
        >
          <li className="menu-item">
            <AiFillHome size="25" />
            <span>홈</span>
          </li>
        </NavLink>
        <NavLink
          to={`/${shop._id}/mobile/category`}
          exact
          activeStyle={activeStyle}
        >
          <li className="menu-item">
            <AiOutlineMenu size="25" />
            <span>카테고리</span>
          </li>
        </NavLink>
        <NavLink to={`/`} exact activeStyle={activeStyle}>
          <li className="menu-item">
            <AiFillAppstore size="25" />
            <span>매장 리스트</span>
          </li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Footer;
