import axios from 'axios';
import AdminAside from 'components/Aside/Aside';
import Header from 'components/Header/Header';
import Loading from 'components/Loading/Loading';
import { APIURL } from 'config';
import useConfirm from 'hooks/useConfirm';

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './NoticeDetail.scss';

const NoticeDetail = ({ match, shop, user }) => {
  const noticeId = match.params.id;

  const [noticeInfo, setNoticeInfo] = useState({
    title: '',
    content: '',
  });

  const { title, content } = noticeInfo;
  const noticeLength = shop.notices.length; // 게시물 길이
  useEffect(() => {
    axios
      .get(`${APIURL}/location/${shop._id}/notice/${noticeId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setNoticeInfo({
          ...noticeInfo,
          title: response.data.notice[0].title,
          content: response.data.notice[0].content,
        });
      });
  }, [shop]);

  const cancelConfirm = () => console.log('취소했습니다.');

  const noticeDelete = () => {
    axios
      .delete(`${APIURL}/location/${shop._id}/notice/${noticeId}/delete`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.deletedNotice) {
          window.location.replace(`/${shop._id}/notice`); // 페이지 이동 후 새로고침
        }
      });
  };

  const confirmDelete = useConfirm(
    '삭제하시겠습니까?',
    noticeDelete, // 확인 버튼 눌렀을 때 일어나는 함수
    cancelConfirm, // 취소 버튼 눌렀을 때 일어나는 함수
  );
  return (
    <>
      <Header />
      <AdminAside />
      <div id="NoticeDetail" className="page-layout">
        {!title && <Loading />}
        <div className="tit">
          <h4 className="tit-corp">
            <a href="/notice">공지사항</a>
          </h4>
        </div>
        <div className="notice-cont">
          <div className="content-tit">
            {title}
            <div className="tit-date">2021-05-19</div>
          </div>
          <div
            className="content-cont"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
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
            <Link
              to={`/${shop._id}/notice/edit/${noticeId}`}
              className="btn-list"
            >
              수정
            </Link>
            <button onClick={confirmDelete} className="btn-list">
              삭제
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return { shop: state.shop, user: state.user };
}

export default connect(mapStateToProps)(NoticeDetail);
