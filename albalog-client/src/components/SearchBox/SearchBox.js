import React from 'react';
import './SearchBox.scss';

const SearchBox = () => {
  return (
    <div className="searchBox-container">
      <select name="" id="" className="">
        <option>전체</option>
        <option>재직자</option>
        <option>퇴직자</option>
      </select>

      <div className="btn-group">
        <button className="btn-search">조회하기</button>
        <button className="btn-all">전체보기</button>
      </div>
    </div>
  );
};

export default SearchBox;
