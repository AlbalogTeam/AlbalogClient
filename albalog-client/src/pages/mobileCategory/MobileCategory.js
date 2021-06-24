import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import React from 'react';
import { Link } from 'react-router-dom';
import './MobileCategory.scss';
import {
  AiOutlineSchedule,
  AiOutlineNotification,
  AiOutlineSwap,
  AiOutlineSolution,
} from 'react-icons/ai';
import { HiOutlineUsers } from 'react-icons/hi';
import { RiDashboardLine } from 'react-icons/ri';
import { IoSettingsOutline } from 'react-icons/io5';
import { BiDollar } from 'react-icons/bi';
import { useSelector } from 'react-redux';

const MobileCategory = () => {
  const shop = useSelector((state) => state.shop);
  const user = useSelector((state) => state.user);
  return (
    <>
      <Header />
      <div id="MobileCategory">
        <h3>Navigation</h3>
        <ul>
          <li>
            <Link to={`/${shop._id}/notice`}>
              <AiOutlineNotification size="25" />
              <span className="txt">공지사항</span>
            </Link>
          </li>
          <li>
            <Link to={`/${shop._id}/workmanual/`}>
              <AiOutlineSolution size="25" />
              <span className="txt">업무매뉴얼</span>
            </Link>
          </li>
          <li>
            <Link to={`/${shop._id}/transition`}>
              <AiOutlineSwap size="25" />
              <span className="txt">인수인계</span>
            </Link>
          </li>
        </ul>
        {user.role === 'owner' && (
          <>
            <h3>Admin</h3>
            <ul>
              <li>
                <Link to={`/admin/${shop._id}`}>
                  <RiDashboardLine size="25" />
                  <span className="txt">대시보드</span>
                </Link>
              </li>
              <li>
                <Link to={`/admin/${shop._id}/employeelist`}>
                  <HiOutlineUsers size="25" />
                  <span className="txt">직원관리</span>
                </Link>
              </li>
              <li>
                <Link to={`/admin/${shop._id}/schedule`}>
                  <AiOutlineSchedule size="25" />
                  <span className="txt">스케줄관리</span>
                </Link>
              </li>
              <li>
                <Link to={`/admin/${shop._id}/payroll`}>
                  <BiDollar size="25" />
                  <span className="txt">급여관리</span>
                </Link>
              </li>
              <li>
                <Link to={`/admin/${shop._id}/info`}>
                  <IoSettingsOutline size="25" />
                  <span className="txt">계정정보</span>
                </Link>
              </li>
            </ul>
          </>
        )}
        {user.role === 'staff' && (
          <>
            <h3>Parttime</h3>
            <ul>
              <li>
                <Link to={`/parttime/${shop._id}`}>
                  <RiDashboardLine size="25" />
                  <span className="txt">대시보드</span>
                </Link>
              </li>
              <li>
                <Link to={`/parttime/${shop._id}/accountinfo`}>
                  <IoSettingsOutline size="25" />
                  <span className="txt">계정정보</span>
                </Link>
              </li>
              <li>
                <Link to={`/parttime/${shop._id}/scheduler`}>
                  <AiOutlineSchedule size="25" />
                  <span className="txt">스케줄러</span>
                </Link>
              </li>
              <li>
                <Link to={`/parttime/${shop._id}/workingtime`}>
                  <BiDollar size="25" />
                  <span className="txt">일한시간</span>
                </Link>
              </li>
            </ul>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MobileCategory;
