import React, { useEffect } from 'react';
import './StoreList.scss';

const StoreList = () => {


  useEffect(() => {

  }, [])


  return (
    <div id="StoreList">
      <ul>
        <li>
          <div className="store-enter">
            <a className="btn" href="/">
              수정
            </a>
            <a className="btn" href="/">
              입장
            </a>
          </div>

          <div className="store-info">
            <span className="name">GS-25 인천 송도점</span>
            <br />
            <span className="detail">인천 광역시 연수구 송도동</span>
          </div>
        </li>

        <li>
          <div className="store-enter">
            <a className="btn" href="/">
              수정
            </a>
            <a className="btn" href="/">
              입장
            </a>
          </div>

          <div className="store-info">
            <span className="name">GS-25 인천 송도점</span>
            <br />
            <span className="detail">인천 광역시 연수구 송도동</span>
          </div>
        </li>

        <li>
          <div className="store-enter">
            <a className="btn" href="/">
              수정
            </a>
            <a className="btn" href="/">
              입장
            </a>
          </div>

          <div className="store-info">
            <span className="name">GS-25 인천 송도점</span>
            <br />
            <span className="detail">인천 광역시 연수구 송도동</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default StoreList;
