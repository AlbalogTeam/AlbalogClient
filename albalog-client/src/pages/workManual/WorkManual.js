import Header from 'components/Header/Header';
import MenualCategory from 'components/workManual/ManualCategory/ManualCategory';
import MenualList from 'components/workManual/ManualList/ManualList';
import ManualUpload from 'components/workManual/ManualUpload/ManualUpload';
import React, { useState } from 'react';
import './WorkManual.scss';
import AdminAside from '../../components/Aside/Aside';
import { withRouter } from 'react-router';
import { useSelector } from 'react-redux';
import Footer from 'components/Footer/Footer';
import CategorySetting from 'components/workManual/CategorySetting/CategorySetting';

const WorkManual = ({ match }) => {
  // 카테고리가 선택되지 않았으면 기본값 all 사용

  const user = useSelector((state) => state.user);
  const category = match.params.category || 'all';
  const [uploadState, setUploadState] = useState(false);
  const [categorySetState, setCategorySetState] = useState(false);

  const ToggleButton = () => {
    setUploadState(!uploadState);
  };

  const CategorySetToggle = () => {
    setCategorySetState(!categorySetState);
  };

  return (
    <>
      <Header />
      <AdminAside />
      <div id="WorkManual" className="page-layout">
        <div className="cont">
          <MenualCategory />
          {user.role === 'owner' && (
            <div className="upload">
              <button className="add-manual btn" onClick={ToggleButton}>
                매뉴얼 추가
              </button>
              <button className="category-set btn" onClick={CategorySetToggle}>
                카테고리 설정
              </button>
            </div>
          )}
          <MenualList category={category} />
        </div>
      </div>
      {uploadState && (
        <ManualUpload uploadState={uploadState} ToggleButton={ToggleButton} />
      )}
      {categorySetState && (
        <CategorySetting
          categorySetState={categorySetState}
          CategorySetToggle={CategorySetToggle}
        />
      )}
      <Footer />
    </>
  );
};

export default withRouter(WorkManual);
