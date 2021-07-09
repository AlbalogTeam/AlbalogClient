import axios from 'axios';
import AdminAside from 'components/Aside/Aside';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import Loading from 'components/Loading/Loading';
import MessageModal from 'components/Modal/MessageModal';
import { APIURL } from 'config';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import './NoticeDetail.scss';

const NoticeDetail = ({ match, shop, user }) => {
  const noticeId = match.params.id;
  const [messageModalState, setMessageModalState] = useState(false);
  const [noticeDate, setNoticeDate] = useState('');

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
        console.log(response.data.notice[0].updatedAt.slice(0, 10));
        setNoticeDate(response.data.notice[0].updatedAt.slice(0, 10));
        setNoticeInfo({
          ...noticeInfo,
          title: response.data.notice[0].title,
          content: response.data.notice[0].content,
        });
      });
  }, [shop]);

  const noticeDelete = () => {
    axios
      .delete(`${APIURL}/location/${shop._id}/notice/${noticeId}/delete`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        if (response.data.deletedNotice) {
          window.location.replace(`/${shop._id}/notice`); // 페이지 이동 후 새로고침
        }
      });
  };

  const messageModalToggle = () => {
    setMessageModalState(!messageModalState);
  };

  return (
    <>
      <Header />
      <AdminAside />
      <div id="NoticeDetail" className="page-layout">
        {shop._id && !title && <Loading />}

        <div className="notice-cont">
          <div className="content-tit">
            {title}
            <div className="tit-date">{noticeDate}</div>
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

            <a href={`/${shop._id}/notice`} className="btn-list">
              목록
            </a>

            {user.role === 'owner' && (
              <>
                <Link
                  to={`/${shop._id}/notice/edit/${noticeId}`}
                  className="btn-list"
                >
                  수정
                </Link>
                <button onClick={messageModalToggle} className="btn-list">
                  삭제
                </button>
              </>
            )}

            {messageModalState && (
              <MessageModal
                messageModalToggle={messageModalToggle}
                deleteCont={noticeDelete}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

function mapStateToProps(state) {
  return { shop: state.shop, user: state.user };
}

export default withRouter(connect(mapStateToProps)(NoticeDetail));
