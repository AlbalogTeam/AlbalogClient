import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './NoticeDetail.scss';

const NoticeDetail = ({ match }) => {
  const noticeId = match.params.id;
  const [noticeInfo, setNoticeInfo] = useState({
    title: '',
    body: '',
  });

  const { title, body } = noticeInfo;

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${noticeId}`)
      .then((response) => {
        console.log(response.data);
        setNoticeInfo({
          ...noticeInfo,
          title: response.data.title,
          body: response.data.body,
        });
      });
  }, []);
  return (
    <div id="NoticeDetail">
      <div className="notice-tit">
        <h4 className="tit-corp">공지사항</h4>
      </div>
      <div className="notice-cont">
        <div className="content-tit">
          {title}
          <div className="tit-date">
            2021-05-19
          </div>
        </div>
        <div className="content-cont">{body}</div>
        <div className="content-btn">
          <a href="" className="btn-move">
            이전
          </a>
          <a href="" className="btn-move">
            다음
          </a>
          
          <a href="" className="btn-list">
            목록
          </a>
          <a href="" className="btn-list">
            수정
          </a>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail;
