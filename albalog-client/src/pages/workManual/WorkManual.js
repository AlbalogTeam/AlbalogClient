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

const WorkManual = ({ match }) => {
  // 카테고리가 선택되지 않았으면 기본값 all 사용

  const user = useSelector((state) => state.user);
  const category = match.params.category || 'all';
  const [uploadState, setUploadState] = useState(false);

  const ToggleButton = () => {
    setUploadState(!uploadState);
  };

  return (
    <>
      <Header />
      <AdminAside />
      <div id="WorkManual" className="page-layout">
        <div className="tit">
          <h4 className="tit-corp">업무매뉴얼</h4>
          {user.role === 'owner' && (
            <div className="upload">
              <button onClick={ToggleButton}>추가</button>
            </div>
          )}
        </div>
        <div className="cont">
          <MenualCategory />
          <MenualList category={category} />
        </div>
      </div>
      {uploadState && (
        <ManualUpload uploadState={uploadState} ToggleButton={ToggleButton} />
      )}
      <Footer />
    </>
  );
};

export default withRouter(WorkManual);
