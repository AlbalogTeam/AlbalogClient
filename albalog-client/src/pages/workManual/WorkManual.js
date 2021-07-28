import Header from 'components/Header';
import MenualCategory from 'components/workManual/ManualCategory/ManualCategory';
import MenualList from 'components/workManual/ManualList/ManualList';
import React from 'react';
import './WorkManual.scss';
import Aside from 'components/Aside';
import Footer from 'components/Footer';
import { Link, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';

const WorkManual = () => {
  // 카테고리가 선택되지 않았으면 기본값 all 사용
  const shop = useSelector((state) => state.shop);
  const match = useRouteMatch();
  const category = match.params.category || 'all';
  const user = useSelector((state) => state.user);

  return (
    <>
      <Header />
      <Aside />
      <div id="WorkManual" className="page-layout">
        <div className="cont">
          <MenualCategory />
          {user.role === 'owner' && (
            <div className="upload">
              <Link
                className="btn"
                to={`/${shop._id}/workmanual/manage/category`}
              >
                매뉴얼 관리
              </Link>
            </div>
          )}
          <MenualList category={category} />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default React.memo(WorkManual);
