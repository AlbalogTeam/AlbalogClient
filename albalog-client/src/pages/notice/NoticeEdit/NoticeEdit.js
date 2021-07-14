import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import '../NoticeUpload/NoticeUpload.scss';
import Header from 'components/Header';
import { connect } from 'react-redux';
import Loading from 'components/Loading/Loading';
import { withRouter } from 'react-router';
import Footer from 'components/Footer';
import Aside from 'components/Aside';
import { getNoticeDetail, updateNotice } from 'utils/api/notice';

const NoticeEdit = ({ match, shop }) => {
  const noticeId = match.params.id;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [dataState, setDataState] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const notice = await getNoticeDetail(shop._id, noticeId);
      setTitle(notice.title);
      setContent(notice.content);
      setDataState(1);
    };
    if (shop._id) getData();
  }, [shop, noticeId]);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateNotice(title, content, shop._id, noticeId);
      window.location.replace(`/${shop._id}/notice/${noticeId}`);
    } catch (e) {
      alert('공지사항 수정에 실패했습니다.');
    }
  };

  return (
    <>
      <Header />
      <Aside />
      <div id="NoticeEdit">
        {dataState === 0 && shop._id ? (
          <Loading />
        ) : (
          <div className="upload-form">
            <form action="" onSubmit={onSubmit}>
              <input
                type="text"
                value={title}
                autoComplete="off"
                onChange={onChangeTitle}
                placeholder="제목을 입력하세요"
              />
              <div className="write-cont">
                <CKEditor
                  onReady={(editor) => {
                    console.log('Editor is ready to use!', editor);
                    editor.ui
                      .getEditableElement()
                      .parentElement.insertBefore(
                        editor.ui.view.toolbar.element,
                        editor.ui.getEditableElement(),
                      );
                  }}
                  onError={({ willEditorRestart }) => {
                    if (willEditorRestart) {
                      this.editor.ui.view.toolbar.element.remove();
                    }
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setContent(data);
                  }}
                  editor={DecoupledEditor}
                  data={content}
                />
              </div>

              <button type="submit">수정완료</button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

function mapStateToProps(state) {
  return { shop: state.shop, user: state.user };
}

export default withRouter(connect(mapStateToProps)(NoticeEdit));
