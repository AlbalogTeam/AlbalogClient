import Loading from 'components/Loading/Loading';
import React from 'react';
import './Header.scss';
import logo from 'static/albalog-logo.png';
import { FaStoreAlt } from 'react-icons/fa';
import { AiOutlineExport } from 'react-icons/ai';
import InviteButton from 'components/InviteButton/InviteButton';
import useLogout from 'hooks/user/useLogout';
import useShopInfoEffect from 'hooks/shop/useShopInfoEffect';

const Header = () => {
  const { onLogout } = useLogout();
  const { user, shop } = useShopInfoEffect();
  console.log('헤더 리랜더링');
  return (
    <>
      {!shop._id && <Loading />}
      <header className="header">
        <a href="/">
          <img src={logo} alt="" />
        </a>

        <h3 className="header-middle">
          <FaStoreAlt size="24" />
          <span>{shop.name}</span>
        </h3>
        <div className="header-right">
          <span className="user-name">
            <b>{user.name}</b>님 안녕하세요.
          </span>
          {user.role === 'owner' && <InviteButton />}
          <button className="btn-logout" onClick={onLogout}>
            <span>로그아웃</span>
            <AiOutlineExport size="25" />
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
