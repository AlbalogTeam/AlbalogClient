import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './NoticeDetail.scss';

const NoticeDetail = ({ match }) => {
  const noticeId = Number(match.params.id);
  const [noticeInfo, setNoticeInfo] = useState({
    title: '',
    body: '',
  });

  const { title, body } = noticeInfo;
  const noticeLength = localStorage.getItem('noticeLength'); // 게시물 길이
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
    <div id="NoticeDetail" className="page-layout">
      <div className="notice-tit">
        <h4 className="tit-corp">
          <a href="/notice">공지사항</a>
        </h4>
      </div>
      <div className="notice-cont">
        <div className="content-tit">
          {title}
          <div className="tit-date">2021-05-19</div>
        </div>
        <div className="content-cont">{body}</div>
        <div className="content-btn">
          {noticeId > 1 ? (
            <a href={`/notice/${noticeId - 1}`} className="btn-move">
              이전
            </a>
          ) : (
            ''
          )}

          {noticeId < noticeLength ? (
            <a href={`/notice/${noticeId + 1}`} className="btn-move">
              다음
            </a>
          ) : (
            ''
          )}

          <a href={`/notice`} className="btn-list">
            목록
          </a>
          <a href={`/notice/edit/${noticeId}`} className="btn-list">
            수정
          </a>
          <a href="" className="btn-list">
            삭제
          </a>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail;
