import Header from 'components/Header';
import MenualCategory from 'components/workManual/ManualCategory/ManualCategory';
import MenualList from 'components/workManual/ManualList/ManualList';
import ManualUpload from 'components/workManual/ManualUpload/ManualUpload';
import React from 'react';
import './WorkManual.scss';
import Aside from 'components/Aside';
import Footer from 'components/Footer';
import CategorySetting from 'components/workManual/CategorySetting/CategorySetting';
import { useRouteMatch } from 'react-router-dom';
import useManualModal from 'hooks/workManual/useManualModal';

const WorkManual = () => {
  // 카테고리가 선택되지 않았으면 기본값 all 사용
  const match = useRouteMatch();
  const category = match.params.category || 'all';

  const {
    user,
    isUploadModal,
    onToggleForManual,
    onToggleForCategory,
    isCategoryModal,
  } = useManualModal();

  return (
    <>
      <Header />
      <Aside />
      <div id="WorkManual" className="page-layout">
        <div className="cont">
          <MenualCategory />
          {user.role === 'owner' && (
            <div className="upload">
              <button className="add-manual btn" onClick={onToggleForManual}>
                매뉴얼 추가
              </button>
              <button
                className="category-set btn"
                onClick={onToggleForCategory}
              >
                카테고리 설정
              </button>
            </div>
          )}
          <MenualList category={category} />
        </div>
      </div>
      {isUploadModal && (
        <ManualUpload
          uploadState={isUploadModal}
          ToggleButton={onToggleForManual}
        />
      )}
      {isCategoryModal && (
        <CategorySetting
          categorySetState={isCategoryModal}
          CategorySetToggle={onToggleForCategory}
        />
      )}
      <Footer />
    </>
  );
};

export default React.memo(WorkManual);
