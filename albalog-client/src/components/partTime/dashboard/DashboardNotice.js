import React from 'react';
import 'components/partTime/dashboard/DashboardNotice.scss';
import { useSelector } from 'react-redux';

function DashboardNotice() {
  const shop = useSelector((state) => state.shop);
  const notices = shop.notices;
  console.log(notices);

  return (
    <div id="DashboardNotice">
      <div className="tr-head">
        <div className="td1-head">날짜</div>
        <div className="td2-head">제목</div>
      </div>
      {notices[0] ? (
        notices.slice(0, 2).map((data) => (
          <div className="tr" key={data.id}>
            <div className="td1">{data.createdAt.slice(0, 10)}</div>
            <div className="td2">{data.title}</div>
          </div>
        ))
      ) : (
        <div className="empty-notice">등록된 공지사항이 없습니다</div>
      )}
    </div>
  );
}

export default DashboardNotice;
