import MenualCategory from 'components/workMenual/MenualCategory/MenualCategory';
import MenualList from 'components/workMenual/MenualList/MenualList';
import MenualUpload from 'components/workMenual/MenualUpload/MenualUpload';
import React, { useState } from 'react';
import './MenualPage.scss';

const MenualPage = ({ match }) => {
  // 카테고리가 선택되지 않았으면 기본값 common 사용
  const category = match.params.category || 'common';
  const [uploadState, setUploadState] = useState(false);

  const ToggleButton = () => {
    setUploadState(!uploadState);
    console.log(uploadState);
  };

  return (
    <>
      <div id="MenualPage" className="page-layout">
        <div className="tit">
          <h4 className="tit-corp">업무매뉴얼</h4>
          <div className="upload">
            <button onClick={ToggleButton}>추가</button>
          </div>
        </div>
        <div className="cont">
          <MenualCategory />
          <MenualList category={category} />
        </div>
      </div>
      {uploadState && <MenualUpload uploadState={uploadState} ToggleButton={ToggleButton}  />}
    </>
  );
};

export default MenualPage;
