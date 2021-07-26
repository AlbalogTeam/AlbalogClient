import React from 'react';
import { NavLink } from 'react-router-dom';
import './ManualManageNav.scss';
import { AiFillFolderOpen } from 'react-icons/ai';
import { SiCmake } from 'react-icons/si';
import { useDispatch, useSelector } from 'react-redux';
import { resetManual } from 'modules/workManual';

const ManageNav = () => {
  const activeStyle = {
    backgroundColor: '#fff',
    marginLeft: '15px',
    boxShadow: '0px 7px 6px rgba(0, 0, 0, 0.08)',
  };
  const shop = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  return (
    <>
      <div id="ManageNav">
        <div className="nav-tit">Setting</div>
        <div className="nav-tit-des">메뉴얼 관리</div>

        <div className="nav-menu">
          <ul>
            <li>
              <NavLink
                activeStyle={activeStyle}
                to={`/${shop._id}/workmanual/manage/category`}
              >
                <div className="menu-tit">
                  <AiFillFolderOpen size="20" />
                  <span>Category</span>
                </div>
                <span className="menu-des">카테고리 관리</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                activeStyle={activeStyle}
                onClick={() => dispatch(resetManual())}
                to={`/${shop._id}/workmanual/manage/upload`}
              >
                <div className="menu-tit">
                  <SiCmake size="20" />
                  <span>Manual</span>
                </div>
                <span className="menu-des">매뉴얼 등록</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ManageNav;
