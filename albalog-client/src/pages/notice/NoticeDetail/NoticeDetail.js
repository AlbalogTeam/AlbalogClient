import AdminAside from 'components/Aside';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Loading from 'components/Loading/Loading';
import MessageModal from 'components/Modal/MessageModal';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { deleteNotice, getNoticeDetail } from 'utils/api/notice';
import './NoticeDetail.scss';

const NoticeDetail = ({ match, shop, user }) => {
  const noticeId = match.params.id;
  const [messageModalState, setMessageModalState] = useState(false);
  const [noticeDate, setNoticeDate] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const getData = async () => {
      const notice = await getNoticeDetail(shop._id, noticeId);
      setNoticeDate(notice.updatedAt.slice(0, 10));
      setTitle(notice.title);
      setContent(notice.content);
    };
    if (shop._id) getData();
  }, [shop, noticeId]);

  // 공지 삭제
  const onDelete = useCallback(async () => {
    try {
      await deleteNotice(shop._id, noticeId);
      window.location.replace(`/${shop._id}/notice`);
    } catch (e) {
      alert('공지 삭제에 실패했습니다.');
    }
  }, [noticeId, shop._id]);

  const messageModalToggle = useCallback(() => {
    setMessageModalState(!messageModalState);
  }, [messageModalState]);

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
                deleteCont={onDelete}
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
