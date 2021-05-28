import React from 'react';
import 'components/partTime/aside/ParttimeAside.scss';
import { NavLink } from 'react-router-dom';

function ParttimeAside() {
  return (
    <aside id="parttime-aside">
      <h2>직원용</h2>
      <h3>NAVIGATION</h3>
      <ul>
        <li>
          <NavLink
            to="/parttimedashboard"
            activeStyle={{ background: '#F1F1F1', color: 'rgb(18, 113, 175)' }}
          >
            대시보드
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/a"
            activeStyle={{ background: '#F1F1F1', color: 'rgb(18, 113, 175)' }}
          >
            업무매뉴얼
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/a"
            activeStyle={{ background: '#F1F1F1', color: 'rgb(18, 113, 175)' }}
          >
            공지사항
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/a"
            activeStyle={{ background: '#F1F1F1', color: 'rgb(18, 113, 175)' }}
          >
            인수인계
          </NavLink>
        </li>
      </ul>
      <h3>Apps</h3>
      <ul>
        <li>
          <NavLink
            to="/accountinfo"
            activeStyle={{ background: '#F1F1F1', color: 'rgb(18, 113, 175)' }}
          >
            계정정보
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/a"
            activeStyle={{ background: '#F1F1F1', color: 'rgb(18, 113, 175)' }}
          >
            스케쥴러
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/workingtime"
            activeStyle={{ background: '#F1F1F1', color: 'rgb(18, 113, 175)' }}
          >
            일한시간
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default ParttimeAside;
