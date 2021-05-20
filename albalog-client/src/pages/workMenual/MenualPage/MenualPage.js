import MenualCategory from 'components/workMenual/MenualCategory/MenualCategory';
import React from 'react';

const MenualPage = ({ match }) => {
  // 카테고리가 선택되지 않았으면 기본값 common 사용
  const category = match.params.category || 'common';
  return (
    <div>
      <MenualCategory />
      MenualList
    </div>
  );
};

export default MenualPage;
