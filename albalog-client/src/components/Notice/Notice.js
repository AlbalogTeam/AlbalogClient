import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { weekArray } from 'utils/constants';
import './Notice.scss';

const Notice = () => {
  const announce = useSelector(({ shop }) => shop.notices[0]);

  return (
    <div className="notice-container">
      <h3 className="title">📢 최근 공지사항 </h3>
      <div className="notice">
        {!announce && <strong>등록된 공지사항이 없습니다.</strong>}
        {announce && (
          <>
            <Link to={`/notice/${announce._id}`}>
              <p className="date">
                📅{' '}
                {`${announce.updatedAt.substr(0, 10)} ${
                  weekArray[new Date(announce.updatedAt).getDay()]
                }`}
              </p>
              <p className="content">
                <strong>제목: {announce.title}</strong>
              </p>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Notice;
